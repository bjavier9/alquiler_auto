
const passport = require('passport');
const passportJWT = require('passport-jwt');
const CONFIG = require('../config/config');

let ExtractJwt = passportJWT.ExtractJwt;

let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest =  ExtractJwt.fromUrlQueryParameter('secret_token')
jwtOptions.secretOrKey = CONFIG.jwt_encryption

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let usuario = [{ rol: jwt_payload.rol }];
    if (usuario) {
      next(null, usuario);
    } else {
      next(null, false);
    }
  });
  passport.use(strategy);
  app.use(passport.initialize());
