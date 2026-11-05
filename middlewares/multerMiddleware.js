const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Adjust '..' so this points at the same uploads folder as in index.js
const uploadDir = path.join(__dirname, '..', 'uploads')
fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        // Strip spaces and odd characters so URLs and file paths stay safe
        const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')
        cb(null, `Image-${Date.now()}-${safeName}`)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const multerMiddleware = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB per image
})

module.exports = multerMiddleware