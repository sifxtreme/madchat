require('newrelic');

// dependencies
var coffee = require('coffee-script');
var express = require('express');
var hbs = require('hbs');
var device = require('express-device');

var app = express(); 
app.configure(function(){
  app.set('view engine', 'html');
  hbs.registerPartials(__dirname + '/views/partials');
  var hbs_helpers = require('./handlebars_helpers.js');
  hbs.registerHelper('strip_name', hbs_helpers.strip_name);
  hbs.registerHelper('compare', hbs_helpers.compare);
  app.engine('html', hbs.__express);
  app.use(express.static('public'));
  app.use(express.favicon(__dirname + '/public/favicons/favicon.ico'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  app.use(device.capture());
  device.enableDeviceHelpers(app);
  app.use(app.router);
});

var server = require('http').Server(app);

// socket.io
var io = require('socket.io').listen(server, {log:false});
require('./socket-functions')(io);

/* ***************************************************************************** */

// ROUTES
require('./routes/routes')(app);

// handle 404
app.use(function(req, res, next) {
  if(req.url.indexOf('channel') !== -1) return next();
  res.status(404);
  res.render('error', {errorType: '404'});
});

// handle 500
app.use(function(error, req, res, next) {
  if(req.url.indexOf('channel') !== -1) return next();
  res.status(500);
  console.log(error);
  res.render('error', {errorType: '500'});
});

// port number
server.listen(5001);

module.exports = app
