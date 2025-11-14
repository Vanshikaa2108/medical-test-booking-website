import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // Remove required: true or make it conditional
    required: function() {
      return this.otp ? false : true; // Only require if not an OTP user
    }
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: String,
    // Remove required: true or make it conditional
    required: function() {
      return this.otp ? false : true; // Only require if not an OTP user
    }
  },
  password: {
    type: String,
    // Remove required: true or make it conditional
    required: function() {
      return this.otp ? false : true; // Only require if not an OTP user
    }
  },
  otp: {
    type: String,
    default: null
  },
  otpExpires: {
    type: Date,
    default: null
  },
  tests: [{
    testType: String,
    date: String,
    time: String,
    report: String
  }]
}, {
  timestamps: true
});

// Alternative: Make fields not required
// name: { type: String, required: false },
// mobile: { type: String, required: false },
// password: { type: String, required: false },

export default mongoose.model('User', userSchema);