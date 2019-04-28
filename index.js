const express = require('express')
const ejs = require('ejs')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/users')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
require('./models/SendValues')
require('./models/User')
const Caixa = mongoose.model('values')
const db = require('./config/db')
const bcrypt = require('bcryptjs')
const User = mongoose.model('users')
autoIncrement = require('mongoose-auto-increment')



//Session

app.use(session({
    secret: '123456',
    resave: true,
    saveUninitialized: true
}))

app.use(flash())
// Middleware

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})
 

mongoose.Promise = global.Promise

const conn = mongoose.connect(db.mongoURI).then(()=> {
console.log('Conectado ao banco MongoDB dbCaixas')
}).catch((err)=> {
    console.log('Houve um erro ao se conectar ao MongoDB, '+ err)
})

//Body Parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
// view engine setup
app.set('views', path.join(__dirname, 'views/'))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')


app.use('/admin', adminRouter)
app.use('/', userRouter)




const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> {
    console.log(`Server running in port ${PORT}`)
}) 

module.exports = conn 