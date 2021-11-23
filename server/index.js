// const session = require('express-session');   // session middleware
// Package documentation - https://www.npmjs.com/package/connect-mongo
// const MongoStore = require('connect-mongo')(session);
const express = require('express');  // server software


/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
const app = express();

// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const morgan = require('morgan');
const connect = require('./connect');
const cors = require('cors');
const passport = require('passport');  // authentication
const path = require('path');

const routes = require('./routes');


require('./config/passport');

app.use(passport.initialize());  // Middleware to use Passport with Express

app.use(cors());

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/**
 * -------------- ROUTES ----------------
 */

// Serve static assets if in production
if(process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));
}


app.use('/', routes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            status: error.status || 500,
            message: error.message
        }
    })
});

const PORT = process.env.PORT || 4000;


connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app')
    .then(() => app.listen(PORT, () => {   // Server listens on http://localhost:4000
        console.log(`Server is running on port ${PORT}`)
    }))
    .catch(e => console.error(e))

