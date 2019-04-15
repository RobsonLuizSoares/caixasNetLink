if (process.env.NODE_ENV == 'production') {
    module.exports = { mongoURI: "mongodb://robsonptrainer:250916@clusterrobson-bpumc.gcp.mongodb.net/test?retryWrites=true"}
}else {
    module.exports = { mongoURI: 'mongodb://localhost/dbCaixas' }
}