const multer = require("multer")

const upload = multer({
  storage: multer.memoryStorage(),
  size:{
    fileSize: 5 * 1024 * 1024 //5MB
  }
})

module.exports = upload