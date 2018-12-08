const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
//const genericCrud = require('./src/routes/genericCrud')
const club = require('./src/routes/club');
const sponsor = require('./src/routes/sponsor');
const project = require('./src/routes/project')
const user = require('./src/routes/user')
const signin = require('./src/routes/signin')

const jwt = require('jsonwebtoken');
const jwtSecret = require('./jwtSecret');

app.use(morgan("dev"));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const getToken = req => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        return req.headers.authorization.split(" ")[1]
    }
    return '';
}

const authorize = function (req, res, next) {
    const token = getToken(req);
    console.log(token);
    if(token === ''){
        res.sendStatus(401);
    } else {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            
            if (err) {
                console.log(err);
                return res.status(401);
            } else {
                console.log("ok");
                next();
            }
        })
    }
  
}

//app.use("/api",genericCrud)

app.use('/signin', signin)
app.use("/user", authorize, user);
app.use("/club", authorize, club);
app.use("/sponsor", authorize, sponsor);
app.use("/project", authorize, project);





app.get('/', (req, res) => {
    res.send('Start allsponsored')
})




app.listen(3030, (err) => {
    if (err) {
        throw new Error('Something bad happened...');
    }
    console.log(`Server is listening on 3030`);
});
