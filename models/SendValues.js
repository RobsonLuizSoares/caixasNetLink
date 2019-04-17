const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SendValues = new Schema({
    name: {
        type: String,
        required: true
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: "stores",
        required: true,
    },
    copyP: {
        type: Number,
        required: true
    },
    copyL: {
        type: Number,
        required: true
    },
    printP: {
        type: Number,
        required: true
    },
    printL: {
        type: Number,
        required: true
    },
    laserC: {
        type: Number,
        required: true
    },
    jetC: {
        type: Number,
        required: true
    },
    plotter: {
        type: Number,
        required: false
    },
    products: {
        type: Number,
        required: true
    },
    internet: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    obs: {
        type: String
    }
})
mongoose.model("values", SendValues)