const sendToken = (user, statusCode, res) => {
    // Create JWT token
    const token = user.getJwtToken();
    
    // Options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    // Filter out sensitive fields from user object
    const filteredUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role
    };
    
    // Set cookie and send response
    res.status(statusCode)
       .cookie('token', token, options)
       .json({
            success: true,
            token,
            user: filteredUser
       });
};

module.exports = sendToken;