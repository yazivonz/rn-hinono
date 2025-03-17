// cloudinaryConfig.js
const cloudinary = require('cloudinary');
const crypto = require('crypto');

// Function to generate a secret key
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dah5hrzpp',
  api_key: '956449799982761',
  api_secret: 'qXlO74DuBFFeY3_I642YIk8ay5w',
});

const secretKey = generateSecretKey();

module.exports = { cloudinary, secretKey };

