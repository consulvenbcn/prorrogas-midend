var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var helmet = require('helmet');
var passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;
var nodemailer = require('nodemailer');
var models = require('./models');
// Validator
//PDFKit

var index = require('./routes/index');
var usuario = require('./routes/usuario');
var tramites = require('./routes/tramites');
var buscarTramites = require('./routes/buscarTramites');
var tipo = require('./routes/tipo');
var usuarioExterno = require('./routes/usuarioExterno');
var usuarioInterno = require('./routes/usuarioInterno');
var log = require('./routes/log');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(helmet());

passport.use(new Strategy(
  function(username, password, done) {
    models.Usuarios_Cuentas.findOne({
      where:{
        nombre_usuario:username
      },
      attributes:['contrasena','nivel_acceso','id']
    }).then(function(result) {
      if(!result){
        return done(null,result);
      }else if (result.contrasena!=password) {
        return done(null,result);
      }else{
        return done(null,result);
      }

    });
  }
));

app.use('/', index);
app.use('/usuario', usuario);
app.use('/tipo', tipo);
app.use('/usuarioExterno', usuarioExterno);
app.use('/usuarioInterno', usuarioInterno);
app.use('/tramites', tramites);
app.use('/buscarTramites', buscarTramites);
app.use('/log', log);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
