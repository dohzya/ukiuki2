
/**
 * Module dependencies.
 */
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var errorHandler = require('errorhandler');
var path = require('path');
var prismic = require('express-prismic').Prismic;
var configuration = require('./prismic-configuration').Configuration;
var blog = require('./blog');
var app = express();

app.locals.general = require('./includes/general');

// Prismic.io configuration

prismic.init(configuration);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(favicon("public/images/favicon.png"));
app.use(logger('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(cookieParser('1234'));
app.use(session({secret: '1234', saveUninitialized: true, resave: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(errorHandler());

// Routes

app.route('/').get(blog.bloghome);

app.route('/article/:uid').get(blog.post);

app.route('/preview').get(prismic.preview);

app.route('/robots.txt').get(function (req, res) {
  res.send("User-agent: *\nDisallow: /");
});

var PORT = app.get('port');

app.listen(PORT, function() {
  console.log('Express server listening on http://localhost:' + PORT);
});
