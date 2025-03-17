const User = require("../model/user");
const crypto = require("crypto");
const sendToken = require("../utils/jwtToken");
const { cloudinary, secretKey } = require('../config/cloudinaryConfig')

exports.registerUser = async (req, res, next) => {
  // console.log(req.file);
  // console.log(req.body);
  const result = await cloudinary.v2.uploader.upload(
    req.file.path,
    {
      folder: "avatars",
      width: 200,
      crop: "scale",
    },
    (err, res) => {
      console.log(err, res);
    }
  );

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.url,
    },
    role: 'user',
    isDeleted: false,
  });

  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Failed to create an account",
    });
  }

  sendToken(user, 200, res);
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please enter email & password" });
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    if (user.isDeleted) {
      return res.status(401).json({
        message: "Your account has been deactivated. Please contact support.",
      });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      console.log("Password does not match");
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // console.log("Login successful");
    sendToken(user, 200, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.getUserProfile = async (req, res, next) => {
  try {
    // The user ID is available from the authentication middleware
    const userId = req.user.id;
    
    // Find user by ID, but don't include password
    const user = await User.findById(userId).select("-password");
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching profile"
    });
  }
};

exports.updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;
    
    // Find the current user to check for avatar
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    // Prepare update data
    const updateData = {
      name,
      email
    };
    
    // If a new avatar is uploaded
    if (req.file) {
      // Upload new image to Cloudinary
      const result = await cloudinary.v2.uploader.upload(
        req.file.path,
        {
          folder: "avatars",
          width: 200,
          crop: "scale",
        }
      );
      
      // If user already has an avatar, delete the old one
      if (currentUser.avatar && currentUser.avatar.public_id) {
        await cloudinary.v2.uploader.destroy(currentUser.avatar.public_id);
      }
      
      updateData.avatar = {
        public_id: result.public_id,
        url: result.url,
      };
    }
    
    // Update the user
    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      {
        new: true,
        runValidators: true
      }
    ).select("-password");
    
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating profile: " + error.message
    });
  }
};