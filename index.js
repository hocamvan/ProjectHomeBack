const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
const genericCrud = require('./src/routes/genericCrud')
const clubs = require('./src/routes/clubs')


require('./src/config/passport')(passport); // pass passport for configuration



app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// required for passport
app.use(session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

const authorize = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.send(401);
    }
};

//app.use("/users", users);
clubs(app, passport);

app.use('/api', authorize , genericCrud);




app.get('/', (req, res) => {
    res.send('Start allsponsored')
})


app.listen(3030, (err) => {
    if (err) {
        throw new Error('Something bad happened...');
    }
    console.log(`Server is listening on 3030`);
});
