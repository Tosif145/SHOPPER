const express = require('express');

const router = express.Router();

const { newUser,userLogin} = require('../Controllers/userContoller');


router.post('/signup',newUser);
router.post('/login',userLogin);

module.exports = router;