const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Store = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
    
})

mongoose.model("stores", Store)