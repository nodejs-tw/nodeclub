/*!
 * nodeclub - app.js
 */

/**
 * Module dependencies.
 */

var path = require('path');
var connect = require('connect');
var urlrouter = require('urlrouter');
var render = require('connect-render');
var onehost = require('onehost');

var config = require('./conf');
var routes = require('./routes');

var app = connect(
  connect.cookieParser(),
  connect.session({
    secret: config.session_secret
  }),
  connect.csrf(),
  render({
    root: path.join(__dirname, 'views'),
    layout: 'layout.html',
    cache: config.debug, // `false` for debug
    helpers: {
      config: config,
      sitename: 'connect-render demo site',
      starttime: new Date(),
      _csrf: function (req, res) {
        return req.session._csrf;
      },
      now: function (req, res) {
        return new Date();
      }
    }
  })
);

/**
 * Static files
 */

app.use('/public', connect.static(path.join(__dirname, 'public')));

/**
 * URL Routing
 */
app.use(urlrouter(routes));

/**
 * One host binding
 */

if (config.onehost) {
  onehost({
    host: config.hostname
  });
}

if (process.env.NODE_ENV !== 'test') {
  // plugins
  var plugins = config.plugins || [];
  for (var i = 0, l = plugins.length; i < l; i++) {
    var p = plugins[i];
    app.use(require('./plugins/' + p.name)(p.options));
  }
}

var maxAge = 3600000 * 24 * 30;
// app.use('/upload/', express.static(config.upload_dir, { maxAge: maxAge }));
// // old image url: http://host/user_data/images/xxxx
// app.use('/user_data/', express.static(path.join(__dirname, 'public', 'user_data'), { maxAge: maxAge }));

// var staticDir = path.join(__dirname, 'public');
// app.configure('development', function () {
//   app.use(express.static(staticDir));
//   app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
// });

// app.configure('production', function () {
//   app.use(express.static(staticDir, { maxAge: maxAge }));
//   app.use(express.errorHandler()); 
//   app.set('view cache', true);
// });


if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port);

  console.log("NodeClub listening on port %d", config.port);
  console.log("God bless love....");
  console.log("You can debug your app with http://" + config.hostname + ':' + config.port);
}

module.exports = app;
