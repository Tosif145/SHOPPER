// require modules
const express = require('express');
require('dotenv').config({ path: './config/.env' });
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


// Crete app
const app = express();
app.use(express.json());  //request we get from response passed through json
app.use(cors()); // react project will connect to express app on port




// Import routes
const uploadRoute = require('./routes/uploadRoute');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');




//  Database connection with MongoDB
mongoose.connect(process.env.MONGODB_URI);


// Seed all products
// const { seedProducts } = require('./utils/seeder'); // Adjust the path if necessary
// seedProducts();

// Serve static files (images)
// app.use('/images', express.static(path.join(__dirname, './upload/images')));

// All routes here
app.get('/', (req,res) => {
    res.send("Server is running");
})
app.use('/',productRoute)
app.use('/',uploadRoute)
app.use('/',userRoute)



// Connecting app to the server at a port
// app.listen(process.env.PORT, (err) => {
//     if (err) {
//         console.log("Err : ",err);
//     } else {
//         console.log(`Server is running on port ${process.env.PORT}`);
//     }
// })


module.exports = app;