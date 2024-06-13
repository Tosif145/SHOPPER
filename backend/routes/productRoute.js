const express = require('express');
const router = express.Router();
const {fetchUser} = require('../middleware/authentication')

const {
        newProduct,
        removeProduct,
        getProducts,
        newCollection,
        popularInWomen,
        addTo_Cart,
        removeFrom_Cart,
        getCart
    } = require('../Controllers/productController');

router.post('/addproduct',newProduct);
router.delete('/removeproduct',removeProduct);
router.get('/allproducts',getProducts);
router.get('/newcollection',newCollection);
router.get('/popularinwomen',popularInWomen);
router.post('/addtocart',fetchUser,addTo_Cart);
router.post('/removefromcart',fetchUser,removeFrom_Cart);
router.post('/getcart',fetchUser,getCart);

module.exports = router; 