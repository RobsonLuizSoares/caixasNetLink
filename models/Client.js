
const mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment')


connection = mongoose.createConnection('mongodb+srv://robsonptrainer:250916@clusterrobson-bpumc.gcp.mongodb.net/test?retryWrites=true|| mongodb://localhost/dbCaixas')

autoIncrement.initialize(connection)

var Client = new Schema({ 
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        unique: true 
    },
    birthday: {
        type: String,
    },
    phone: {
        type: String,
    },
    socialMedia: {
        type: String,
    }, 
    date: {
        type: Date,
        default: new Date()
    } 
    
})
Client.plugin(autoIncrement.plugin, { model:'Client', field: 'number'})
 connection.model('clients', Client )
//mongoose.model("clients", Client)