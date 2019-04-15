const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SendValues = new Schema({
    name: {
        type: String,
        required: true
    },
    copy: {
        type: Number,
        required: true
    },
    print: {
        type: Number,
        required: true
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: "stores",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})
mongoose.model("values", SendValues)