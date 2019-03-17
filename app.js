var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('C:\MongoDB\data\db\loginapp');
var db = mongoose.connection;

var routes = require('./routes/index.js');
var users = require('./routes/users.js');

//App initialization
var app = express();

//view Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

//body PArser midleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

// set up public folder (style sheets, images)
app.use(express.static(path.join(__dirname, 'public')));

//middleware for express session

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator({
        errorFormatter: function(param, msg, value){
        var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

        while(namespace.length){
            formParam == '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg : msg,
            value : value
        };
    }
}));

// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));

//Connect flash Middleware
app.use(flash());

app.use(function(req,res,next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('success_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', routes);
app.use('/users', users);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
    console.log('Server started on port ' +app.get ('port'));
});
