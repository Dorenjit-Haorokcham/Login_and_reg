const express = require('express');
const { registerUser, loginUser } = require('../controllers/usercontroller');
const {check}= require('express-validator');
const router = express.Router();

router.post('/register',[
    check('username').not().isEmpty().isAlpha(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({min: 6}).isStrongPassword()

    ], registerUser);
router.post('/login', loginUser);

module.exports = router;
