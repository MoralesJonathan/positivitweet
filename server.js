const express = require('express'),
  server = express(),
  port = process.env.PORT || 8080,
  environment = server.get('env'),
  path = require('path'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

server
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .use(cookieParser())
  .use(session({ secret: 'SeaShell2020', resave: false }))
  .use(passport.initialize())
  .use(passport.session())
  .use(bodyParser.urlencoded({
    extended: true
  }));

environment == 'development' ? server.use(logger('dev')) : server.use(logger('short'));

passport.use(new LocalStrategy({ 
  usernameField: 'email'
}, function (username, password, done) {
    return done(null, {'firstname':'Admin'});
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.firstname);
});

passport.deserializeUser(function (id, done) {
    done(null, {'firstname': 'Admin'});
});

server.get('/',require('connect-ensure-login').ensureLoggedIn(), function (req, res) {
  res.send('Hello world!')
})

.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/login.html'));
})

.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false
  })
)

.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
})

.get('*', function(req, res){
  res.redirect('/');
})

.listen(port, () => {
  console.log(`Server is running on port ${port} and is running with a ${environment} environment.`);
});