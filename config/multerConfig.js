const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../public/images/uploads');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function (err, name) {
      if (err) return cb(err);
      const fn = name.toString('hex') + path.extname(file.originalname);
      cb(null, fn);
    });
  }
});

const upload = multer({ storage: storage })

module.exports = upload;
