const User = require('../models/user');
const jwt = require('jsonwebtoken');


// createing new user if user doesn't exit with the given emaili
exports.newUser = async(req,res) => {
     let check = await User.findOne({email: req.body.email});

     if(check){
        return res.status(400)
         .json({success :false,errors: "Existing user found with same email address!"})
     }

     let cart = {};
     for(let i = 0; i<300;i++){
        cart[i] =0;
     }


     const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cartData: cart
     })

     await user.save();

     const data = {
        user: {
            id: user.id
        }
     }

     const token = jwt.sign(data,'secret_ecom');

     res.json({
        success:true,
        token
     })
}

// User login if the email exist in the database
exports.userLogin = async(req, res) => {
    let user = await User.findOne({email: req.body.email});
    // if user exist in database with email
    if(user){

        // comparing given password with existing user password
        const passCompare = req.body.password === user.password;


        // if the password is correct create data to creaet jwt token
        if(passCompare){
            const data = {
                user: {
                    id: user.id
                }
            }

            const token = jwt.sign(data, 'secret_ecom');

            res.json({
                success:true,
                token
            })
        }else{
            //  if password is incorrect 
            res.json({
                success:false,
                errors: "Invalid password!"
            })

        }
    }else{
        // if user doesn't exist
        res.status(401).json({
            success: false,
            errors: "The email doesn't exist or is incorrect. Please sign up.",
            redirectToSignup: "/signup" // Relative URL
        });
    }
}