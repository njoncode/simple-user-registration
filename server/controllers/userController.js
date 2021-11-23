const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/User');
const utils = require('../lib/utils');


const register = async (req, res) => {
    try {
        const user = new User({ name: req.body.name, email: req.body.email });
        // register is gonna store the name, email and hashed password.
        const registeredUser = await User.register(user, req.body.password);
        console.info('registeredUser: ', registeredUser);
        if (registeredUser) {
        // generate a signed json web token with the contents of user object and return it in the response
        // const token = utils.issueJwt(user);
        // const token =  jwt.sign({user_id : user._id, email: req.body.email}, secretKey, {expiresIn: '24h'});
        // res.status(200).json({success:true, message: 'Successfully Registered!', data: {user, token} });
        res.status(200).json({ success: true, user: user, message: 'Successfully Registered!' });
        } else {
            res.status(400).json({ success: false, user: {}, message:'Your account could not be saved.' })
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};


module.exports = {
    register,
};
