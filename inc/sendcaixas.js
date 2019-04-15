const mongoose = require('mongoose')
module.exports = {
    
    render(req, res, error) {
        res.render('sendCaixas', {
            body: req.body,
            error
        })
        
    }
}