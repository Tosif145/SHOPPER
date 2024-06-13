const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer();

const {imageUpload,displayImage} = require('../Controllers/imageController')

router.post('/upload', upload.single('product'),imageUpload);
router.get('/images/:filename',displayImage)


module.exports = router;