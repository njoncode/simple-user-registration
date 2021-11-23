const passport = require('passport');

const User = require('../models/User');
const utils = require('../lib/utils');

const validateRegister = async (req, res, next) => {
    const {name, email, password, confirmPassword} = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({ message: 'Name, Email and password are required.'});
    }

    const doesExist = await User.findOne({email: email});
    if(doesExist) {
       return res.status(400).json({ message: `${email} is already registered.`});
    }

    if(password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match'});
    }

    next();
}


const validateLogin = (req, res, next) => {
    if(!req.body.email){
        res.json({success: false, message: "Email is not given"})
      } else {
        if(!req.body.password){
          res.json({success: false, message: "Password is not given"})
        }
    };
    next();
};


/**
 Authenticating requests
    By default, if authentication fails, Passport will respond with a 401 Unauthorized status, and any additional route handlers will not be invoked.
    If authentication succeeds, the next handler will be invoked and the req.user property will be set to the authenticated user.

 */
// Force all requests to api route to look for token, if token is present in header the user will be logged in with that token
const login = (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
    // passport.authenticate('local', (err, user, info) => {
        console.log('err: ', err);
        console.log('info: ', info);
        if (err) {
            console.log('login err: ', err);
            return next(err);
        }
        if (!user) {
            console.log('Login Failed: No user found!');
            return res.status(400).json({
                success: false,
                message: info ? info.message : 'Login failed',
                msg: 'No user found with these credentials.'
            });
        }
        /**
         Note, that we pass {session: false} in passport options, so that it wont save the user in the session.
         Also, we create and return a signed JSON web token based on the user object to the client.
         We can, of course, choose any object to create a token with, as long as it will help you identify your user.
         The idea is, to store the minimum info that you can use without having to retrieve the user from the database in all the authenticated requests.
         */

        req.login(user, {session: false}, (err) => {
            console.log('login user: ', user);
            // req.login(user, (err) => {
            if (err) {
                return res.status(400).json({ success: false, message: 'Error encountered.', err, data: {} });
            }

        // generate a signed json web token with the contents of user object and return it in the response
        const token = utils.issueJwt(user);
        // const token =  jwt.sign({user_id : user._id, email: req.body.email}, secretKey, {expiresIn: '24h'});
        res.status(200).json({success:true, message: 'Successfully Logged In!', data: {user, token} });
    });
}) (req, res, next);
};


// Validate an existing user and issue a JWT
// Force all requests to api route to look for token, if token is present in header the user will be logged in with that token

/**
  Now, we’ll create a middleware, that allows only requests with valid tokens to access some special routes needing authentication, eg. /user/profile.
  For this, we will use the passport-jwt strategy. We’ll add it in our passport.js file.

  Note, that we assume that the client will send the JWT token in Authorization Header as a Bearer Token. The Passport JWT Strategy supports many other ways of getting the token from requests. Choose whichever suits your needs.
 */

  // Plug in the JWT strategy as a middleware so only verified users can access this route.
const requireJWT = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, function(err, user, info) {
        console.error('requireJWT User: ', user);
        // if (err) { return next(err); }
        if (err) {
            console.error('err: ', err);
            res.status(400).json({ msg: 'Error encountered', message: err });
            return;
        }
        if (!user) {
            console.error('No user found, You are not authenticated');
            return res.status(400).json({message: 'You are not authenticated'});
        }
        if(user) {
            // passport-jwt automatically add user to the request, when user gets authenticated.
            req.user = user;
            next();
        }
      })(req, res, next)
}


const logout = async (req, res, next) => {
    console.log('Before logout req.user: ', req.user)
    const log = req.logout();
    console.log('After logout req.user: ', req.user)
    console.log('req.user: ', req.user);
    console.log('You are now logged out 👋');
    res.json({ success: true, message: 'You are now logged out 👋' })
};




const isLoggedIn = (req, res, next) => {
    // first check if the user is logged in
    if(req.isAuthenticated()) {
        console.log('Yay! You are authenticated!');
        next();
         // carry on! They are logged in.
        // return isAuthenticated;
    }
    res.status(400).json({ success: false,message: 'Not Authenticated! You need to login first.', data: {} })
};


module.exports = {
    validateLogin,
    validateRegister,
    login,
    requireJWT,
    logout,
    isLoggedIn,
};








/**
 * Note: You set { session: false } because you do not want to store the user details in a session. You expect the user to send the token on each request to the secure routes.
 */