const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');


// Route to register page:  http://localhost:3000/api/signup
router
    .route('/api/signup')
    .post(authController.validateRegister, userController.register );


// Route to login page:  http://localhost:3000/api/signin
// router
//     .route('/api/signin')
//     .post(authController.validateLogin, authController.login, userController.signJwtForUser)

router
    .route('/api/signin')
    .post(authController.validateLogin, authController.login)



http://localhost:3000/auth/signout
router
    .route('/api/signout')
    .get(authController.requireJWT, authController.logout );


module.exports = router;





