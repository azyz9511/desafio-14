const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const connectMongo = require('connect-mongo');
const Usuario = require('../js/usuarios');
const usuario = new Usuario();
require('dotenv').config({ path: '../.env' });

// const mongoUrl = `mongodb+srv://${process.env.USERNAMEDB}:${process.env.PASSWORDDB}@cluster0.33nzl.mongodb.net/${process.env.SESSIONSDB}?retryWrites=true&w=majority`;
// console.log(mongoUrl);
// console.log(typeof(mongoUrl));
// console.log(`mongodb+srv://${process.env.USERNAMEDB}:${process.env.PASSWORDDB}@cluster0.33nzl.mongodb.net/${process.env.SESSIONSDB}?retryWrites=true&w=majority`);

// EN ESTA VARIABLE "mongoUrl" ME TRAE LA MISMA INFORMACION QUE EL STRING DONDE ESTA LA CREDENCIAL DE MONGO ATLAS, PERO NO FUNCIONA CON LA VARIABLE O CON LAGUNA DE LAS OTRAS FORMAS QUE TENGO COMENTADAS
// COLOCANDO EL STRING DIRECTAMENTE COMO ESTA AHORA, ME FUNCIONA PERFECTO

app.use(session({
  store: connectMongo.create({
    mongoUrl: `mongodb+srv://juandavid:azyz9510@cluster0.33nzl.mongodb.net/sessions?retryWrites=true&w=majority`,
    mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
    ttl: 600
  }),
  secret: `${process.env.SECRETDB}`,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use('registro',new localStrategy(
    {passReqToCallback: true},
    async (req, username, password, done) => {
        try{
            const existe = await usuario.findUser(username);
            if(existe){
                return done(null, false)
            }else{
                await usuario.addUser(username,password);
                return done(null, {email: username})
            }
        }catch(e){
            console.log(`Ha ocurrido el siguiente error: ${e}`);
        }
    }
))

passport.use('login',new localStrategy(
    async (username, password, done) => {
        try{
            const existe = await usuario.findUserLogin(username,password);
            if(!existe){
                return done(null, false);
            }else{
                return done(null, existe);
            }
        }catch(e){
            console.log(`Ha ocurrido el siguiente error: ${e}`);
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user.email)
});

passport.deserializeUser(async (email, done) => {
    try{
        const userDZ = await usuario.findUser(email);
        done(null, userDZ)
    }catch(e){
        console.log(`Ha ocurrido el siguiente error: ${e}`);
    }
})

module.exports = passport