const Product = require('../models/product');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const products = require('../config/data/allProducts');

dotenv.config({
    path: './config/.env'
})

// console.log('Process ',process.env.PORT);

const seedProducts = async () => {
    try {
        // Connect to the MongoDB database
        await mongoose.connect(process.env.MONGODB_URI);

        // Disable validation temporarily
        Product.schema.validateBeforeSave = false;

        // Delete all existing products
        await Product.deleteMany();
        console.log('Products are deleted.');

        // Create instances without saving to bypass validation
        const productInstances = products.map(productData => new Product(productData));

        // Save the products to the database
        await Product.insertMany(productInstances);
        console.log('All products are added.');

        // Disconnect from the MongoDB database
        await mongoose.disconnect();

        process.exit();
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    } finally {
        // Enable validation again
        Product.schema.validateBeforeSave = true;
    }
};

seedProducts();
