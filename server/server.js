var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
require('dotenv').config();

var passport = require('./strategies/sql.localstrategy');
var sessionConfig = require('./modules/session.config');

// Route includes
var indexRouter = require('./routes/index.router');
var userRouter = require('./routes/user.router');
var registerRouter = require('./routes/register.router');
var officeRouter = require('./routes/office.router.js');
var emailRouter = require('./routes/email.router.js');
var dataRouter = require('./routes/data.router');
var subscribeRouter = require('./routes/subscribe.router')

var port = process.env.PORT || 5000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// File upload
app.use(fileUpload());

// Serve back static files
app.use(express.static('./server/public'));

// Passport Session Configuration
app.use(sessionConfig);



// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/office', officeRouter);
app.use('/email', emailRouter);
app.use('/data', dataRouter);
app.use('/subscribe', subscribeRouter);

// Catch all bucket, must be last!
app.use('/', indexRouter);

// Listen //
app.listen(port, function () {
    console.log('Listening on port:', port);
});
