// File: ./lib/utils.js

const jwt = require('jsonwebtoken');
// const fs = require('fs');
// const path = require('path');
const crypto = require('crypto');

// const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
// const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET


/**
 * -------------- HELPER FUNCTIONS ----------------
 */


/**
 *
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 *
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
function validPassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

/**
 *
 * @param {*} password - The password string that the user inputs to the password field in the register form
 *
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 *
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
 */


// function genPassword(password) {
//     var salt = crypto.randomBytes(32).toString('hex');
//     var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

//     return {
//       salt: salt,
//       hash: genHash
//     };
// };


//  A utility function that will generate a JWT for our user

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
function issueJwt(user) {

  const _id = user._id;
  // const expiresIn = '1d';
  const expiresIn = '1d';

  const payload = {
    sub: _id,
    // iat: Date.now(),
  };

  console.log('SECRET_KEY: ', SECRET_KEY)

// const signedToken = jwt.sign(payload, SECRET_KEY, { expiresIn: expiresIn });
const signedToken = jwt.sign(payload, SECRET_KEY, { expiresIn: expiresIn });

  return {
    jwtToken: "Bearer " + signedToken,
    expires: expiresIn
  }
};


module.exports = {
  validPassword,
  issueJwt
};


// module.exports.issueJwt = issueJwt;
// module.exports.validPassword = issueJwt;
// module.exports.genPassword = genPassword;



/** Issues:    Token Does Not Expire At All
 * token doesn't seem to expire at all. I'm setting the expiresIn property to 5 seconds when signing the token for experimental purposes.
 *
   was manually setting the "iat" as Date.now() in the payload.
  But apparently the token will generate iat property itself.
  Commenting that out and it works fine.
 */



