const Image = require('../models/image'); // Import your Image schema/model
const path = require('path');

const addImageToDatabase = async (file) =>{
    try {
        // Construct the filename
        const filename = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
        // const imagePath = `http://localhost:4000/images/${filename}`;
        const imagePath = `https://shop-dep.vercel.app/images/${filename}`;
        // Create a new image document using the Mongoose model
        const newImage = new Image({
            filename: filename,
            data: file.buffer, // Store the buffer data
            contentType: file.mimetype,// Store the content type
            path:imagePath
        });

        // Save the image document to the database
        const savedImage = await newImage.save();

        return savedImage;
    } catch (error) {
        console.error("Error adding image to database:", error);
        throw error; // Re-throw the error for handling in the calling code
    }
}

exports.imageUpload = async (req, res) => {
    try {
        const savedImage = await addImageToDatabase(req.file);
        console.log("saving image to database ", savedImage);
        res.json({
            success: true,
            message: 'Image uploaded successfully',
            image: savedImage
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

exports.displayImage = async (req, res) => {
    try {
        const filename = req.params.filename;
        // Find the image in the database based on the filename
        const image = await Image.findOne({ filename });
        if (!image) {
            return res.status(404).send(`not found, ${filename}`);
        }
        // Set the appropriate content type
        res.set('Content-Type', image.contentType);
        // Send the image data
        res.send(image.data);
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).send('Internal server error');
    }
}
