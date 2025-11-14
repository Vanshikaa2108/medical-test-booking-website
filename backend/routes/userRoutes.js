import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/userModel.js";
import multer from "multer";
import verifyToken from "../middleware/auth.js";

const saltRounds = 10;
const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-fallback-secret-key';
const EMAIL_USER = "vanshikapanwar493@gmail.com";
const EMAIL_PASS = "qzvj bhti xgit wpak";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Temporary OTP storage (primary solution)
const otpStore = new Map();

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
};

// Test email connection
router.post('/test-email', async (req, res) => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    res.json({ success: true, message: 'Email configuration is correct' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Email error: ' + error.message });
  }
});

// FIXED: Send OTP Route - Using temporary storage instead of database
router.post('/send-otp', async (req, res) => {
  const { email, purpose = 'registration' } = req.body;
  
  console.log('📧 OTP Request for:', email);

  try {
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    // For password reset, check if user exists
    if (purpose === 'password-reset') {
      const userExists = await User.findOne({ email });
      if (!userExists) {
        return res.status(404).json({ 
          success: false, 
          message: 'User with this email not found' 
        });
      }
    }

    const otp = generateOtp();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store OTP in temporary storage (avoiding database validation issues)
    otpStore.set(email, {
      otp: otp,
      expires: expiresAt,
      purpose: purpose
    });

    console.log('🔢 OTP stored:', otp);

    // Send email
    try {
      const transporter = createTransporter();
      
      const mailOptions = {
        from: EMAIL_USER,
        to: email,
        subject: purpose === 'password-reset' ? 'Password Reset OTP' : 'Registration OTP',
        text: `Your OTP code is: ${otp}. This OTP will expire in 10 minutes.`,
        html: `
          <div>
            <h3>${purpose === 'password-reset' ? 'Password Reset' : 'Registration'} OTP</h3>
            <p>Your OTP code is: <strong>${otp}</strong></p>
            <p>This OTP will expire in 10 minutes.</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log('📨 Email sent successfully');
      
      res.json({ 
        success: true, 
        message: `OTP sent to ${email}`,
        debug: process.env.NODE_ENV === 'development' ? `OTP: ${otp}` : undefined
      });
      
    } catch (emailError) {
      console.error('📧 Email sending failed:', emailError);
      
      // Fallback: Return OTP in response for development
      res.json({ 
        success: true, 
        message: `Email service issue. Use OTP: ${otp}`,
        otp: otp, // For development only
        debug: 'Email failed but OTP generated'
      });
    }
    
  } catch (error) {
    console.error('💥 Error in send-otp:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send OTP', 
      error: error.message 
    });
  }
});

// FIXED: Verify OTP Route - Using temporary storage
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!email || !otp) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and OTP are required' 
      });
    }

    const storedData = otpStore.get(email);
    
    if (!storedData) {
      return res.status(400).json({ 
        success: false, 
        message: 'OTP not found or expired' 
      });
    }

    if (Date.now() > storedData.expires) {
      otpStore.delete(email); // Clean up expired OTP
      return res.status(400).json({ 
        success: false, 
        message: 'OTP has expired' 
      });
    }

    if (storedData.otp !== otp) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid OTP' 
      });
    }

    // OTP is valid
    otpStore.delete(email); // Remove used OTP
    
    res.json({ 
      success: true, 
      message: 'OTP verified successfully',
      purpose: storedData.purpose
    });
    
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during OTP verification' 
    });
  }
});

// Register User (Updated)
router.post('/register', async (req, res) => {
  const { name, email, mobile, password } = req.body;
  
  try {
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { mobile }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email or mobile already exists' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ 
      name, 
      email, 
      mobile, 
      password: hashedPassword 
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ 
      success: true,
      message: 'User registered successfully', 
      token, 
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        mobile: newUser.mobile
      }
    });
    
  } catch (error) {
    console.error("Registration error:", error);
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists' 
      });
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false,
        message: 'Validation error: ' + Object.values(error.errors).map(e => e.message).join(', ')
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Error registering user' 
    });
  }
});

// Forgot Password - Reset (Updated)
router.post('/forgot-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;
  
  try {
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Verify OTP from temporary storage first
    const storedData = otpStore.get(email);
    
    if (!storedData || storedData.otp !== otp || Date.now() > storedData.expires) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid or expired OTP' 
      });
    }

    if (storedData.purpose !== 'password-reset') {
      return res.status(400).json({ 
        success: false, 
        message: 'OTP was not sent for password reset' 
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Update password
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;
    await user.save();

    // Clean up OTP
    otpStore.delete(email);

    res.json({ 
      success: true, 
      message: 'Password updated successfully' 
    });
    
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to reset password' 
    });
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { mobile, password } = req.body;
  
  try {
    if (!mobile || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Mobile and password are required' 
      });
    }

    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    const expiresIn = 3600; // 1 hour
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn });

    res.json({ 
      success: true,
      message: 'Login successful', 
      token, 
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile
      }, 
      expiresIn 
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to login' 
    });
  }
});

// Profile Route
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password -otp -otpExpires');
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Profile fetched successfully',
      user 
    });
    
  } catch (error) {
    res.status(401).json({ 
      success: false,
      message: 'Invalid token' 
    });
  }
});

// Book Test
router.post("/book-test", verifyToken, async (req, res) => {
  try {
    const { testType, date, time } = req.body;

    if (!testType || !date || !time) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required." 
      });
    }

    const userId = req.user.userId;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found." 
      });
    }

    user.tests.push({ testType, date, time });
    await user.save();

    res.status(201).json({ 
      success: true,
      message: "Test booked successfully!" 
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Server error. Try again later." 
    });
  }
});

// Get Users (Admin function)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("name email mobile tests");
    
    const formattedUsers = users.map(user => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      tests: user.tests
    }));

    res.json({ 
      success: true,
      users: formattedUsers 
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Error fetching users", 
      error: error.message 
    });
  }
});

// Add Report Image
router.post("/add-report", upload.single("reportImage"), async (req, res) => {
  try {
    const { userId, testIndex } = req.body;

    if (!userId || testIndex === undefined || !req.file) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required." 
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found." 
      });
    }

    if (!user.tests[testIndex]) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid test index." 
      });
    }

    const reportImageBase64 = req.file.buffer.toString("base64");
    const reportUrl = `data:${req.file.mimetype};base64,${reportImageBase64}`;

    user.tests[testIndex].report = reportUrl;
    await user.save();

    res.json({ 
      success: true,
      message: "Report added successfully!" 
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Server error.", 
      error: error.message 
    });
  }
});

// Test email configuration endpoint
router.post('/test-email', async (req, res) => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    
    res.json({ 
      success: true, 
      message: 'Email configuration is correct' 
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Email configuration error', 
      error: error.message 
    });
  }
});

export default router;