const mongoose = require('mongoose')
module.exports = {
    
    render(req, res, error) {
        
        res.render('createUser', {
            body: req.body,
            error
    
        })
        
    }
}