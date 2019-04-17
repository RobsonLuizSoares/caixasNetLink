const mongoose = require('mongoose')
module.exports = {
    
    render(req, res, error) {
        
        res.render('caixasAdmin', {
            body: req.body,
            error
         
        })
        
    }
}