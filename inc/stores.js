const mongoose = require('mongoose')
module.exports = {
    
    render(req, res, error) {
        res.render('editLojas' , {
            body: req.body,
            error 
        })
        
    }
}