const Product = require('../models/product');
const user = require('../models/user');
const User = require('../models/user');


// controller function to create new product/ to add new product
exports.newProduct = async(req, res) => {
    let products = await Product.find({});
    let id;

    if(products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }else{
        id = 1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price       
    });

    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success: true,
        name:req.body.name
    })
}


// controller to delete product
exports.removeProduct = async(req, res) => {
    await Product.findOneAndDelete({id:req.body.id})
    .then((res) => {if(res) {
        console.log("Produt removed successfully.")
    }})
    .catch((err) => console.log(err));

    // console.log("Produt removed successfully.");

    res.json({
        success: true,
        name:req.body.name
    })
}

// Get all product

exports.getProducts = async(req, res) => {
    let products = await Product.find({});
    console.log("All products fetched.");
    res.send(products);
}


// createing end point for new collection data

exports.newCollection = async(req, res) =>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("Fetched new collection.");

    res.send(newcollection);
}

// createing end point for popular in women
exports.popularInWomen = async(req, res) =>{
    let products = await Product.find({category: 'women'});
    let popular = products.slice(0,4);
    console.log("Fetched popular in women.");

    res.send(popular);
}




// createing end point to add cart products in database

exports.addTo_Cart = async(req, res) =>{
    console.log("Added ", req.body.itemId);
    let userData = await User.findOne({_id:req.user.id});

    userData.cartData[req.body.itemId] += 1;

    await User.findOneAndUpdate({_id:req.user.id},{cartData: userData.cartData});

    res.send("Added");
}


// creating end point to remove product from cart data


exports.removeFrom_Cart = async(req, res) =>{
    console.log("Removed ", req.body.itemId);

    let userData = await User.findOne({_id:req.user.id});


    if(userData.cartData[req.body.itemId] > 0){
        userData.cartData[req.body.itemId] -= 1;
    }

    await User.findOneAndUpdate({_id:req.user.id},{cartData: userData.cartData});

    res.send("Removed");
}


// createing end point to get cart data

exports.getCart = async(req, res) =>{
    console.log("GetCart");
    let userData = await User.findOne({_id:req.user.id});
    res.send(userData.cartData);
}