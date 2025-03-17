const multer = require("multer");
const path = require("path");

// Create uploads directory if it doesn't exist
const fs = require("fs");
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

module.exports = multer({
  limits: { fieldSize: 10 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    }
  }),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("Unsupported file type!"), false);
      return;
    }
    cb(null, true);
  },
});