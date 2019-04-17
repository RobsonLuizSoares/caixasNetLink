const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


require('../models/User')
const User = mongoose.model('users')

module.exports = function(passport) {

    passport.use(new LocalStrategy({usernameField: 'user', passwordField: 'password'}, (user, password, done) => {
        User.findOne({user: user, password: password}).then((user) => {
            if(!user) {
                return done(null, false, {message: "essa conta não existe"})
            }

            bcrypt.compare(password, user.password, (err, success) => {
                if (success) {
                    return done(null, user)
                }else {
                    return done(null, false, { message: 'credenciais não batem'})
                }
            })

        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })


}




 
