const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Services = new Schema({
    order: {
        type: Number,
        required: true,
        unique: true
    },
    register: {
        type: Date,
        default: new Date(),
        required: true
    },
    delivery: {
        type: Date
    },
    number: {
        type: Schema.Types.Number,
        ref: 'clients.number'
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: "clients",
        required: true,
    },
    copy: {
        type: Boolean,      
    },
    copyLarge: {
        type: String
    },
    copySmall: {
        type: String
    },
    spiral: {
        type: Boolean,
        
    },
   color: {
        type: String
    },
    desc: {
        type: String,
        required: true
    },
    plotter: {
        type: String,
        required: true
    },
    valueJobInit: {
        type: Number
    },
    valueJobTotal: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    worker: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    box: {
        type: Number
    }
})
mongoose.model("services", Services)