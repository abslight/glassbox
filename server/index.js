//--------------Requirements-------------//

require('dotenv').config();
const express = require('express')
    , session = require('express-session')
    , massive = require('massive')
    , bodyParser = require('body-parser')
    , checkUserSession = require('./middleware/checkUserSession')
    , ctrl = require('./controller')
    , unirest = require('unirest')
    , cors = require('cors');
const app = express();

//--------------DotEnv----------//

const {
    CONNECTION_STRING,
    SERVER_PORT,
    SESSION_SECRET
} = process.env;

//--------------Middleware-------------//

app.use(express.static(`${__dirname}/../build`));

app.use(cors());

app.use(bodyParser.json());

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
});

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(checkUserSession)

//--------------Endpoints-------------//
app.post('/login', ctrl.loginUser)
app.post('/register', ctrl.registerUser)
app.post('/logout', ctrl.logout)
app.get('/checkuser', ctrl.checkUser)
//--------------Listening-------------//

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: ${SERVER_PORT}`)
});




