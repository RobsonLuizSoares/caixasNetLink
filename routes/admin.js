const express = require('express')
const router = express.Router()
const session = require('express-session')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const moment = require('moment')
require('../models/Store')
require('../models/SendValues')
require('./../models/User')
const Store = mongoose.model('stores')
const SendValues = mongoose.model('values')
const User = mongoose.model('users')

moment.locale("pt-br")

// Home Admin
router.get('/', (req, res) => {
    res.render('homeAdmin')
}) 


// Rota para filtrar por Loja
/* router.get('/caixasloja', (req, res) => {
    Store.find().then((stores) => {
        res.render('resultsStore', { stores: stores })
    }).catch((err) => {
        if (err) {
            console.log('Erro ao listar Resultados por Loja')
        }
    }) 
}) */
//Rota por nome da loja
router.get('/caixasloja/:name', (req, res) => {

    Store.findOne({ name: req.params.name }).then((stores) => {
        if (stores) {

            SendValues.find({ store: stores._id }).sort({date: -1}).then((values) => {
              
                res.render("results", {values: values, stores: stores, moment})
                
            }).catch(()=> { 
                console.log('Erro ao listar os caixas da loja específica')
            })

        }else {
            console.log('Essa loja não existe')
        }
    }).catch((err) => {
        if (err) {
            console.log('Deu um erro ao listar os caixas pela loja ', err)
    }
})
})

//Rota para consulta dos valores enviados. 
router.get('/caixas', (req, res) => {
    
    SendValues.find().populate("store").sort({date: -1}).then((values) => { 
        
        if (values){ 

            Store.find().then((stores) => { 

            res.render("caixasAdmin", {values: values , stores: stores, moment} )
            
                   
            }).catch((err) => {
            
                console.log('Erro rude: ' + err)
            })
        }else{
            console.log('não existem valores a serem lançados')
        }
    })

})
// Rota Add Loja
router.get('/novaloja',(req, res) => {
    res.render('createStore')
})
// Rota para Cadastro de Lojas
router.post('/loja/nova', (req, res) => {

    if (!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
        sendcaixas.render(req, res, "Favor inserir o nome")             
    }else {
     
        const newStore = {
            name: req.body.name
        }
        new Store(newStore)
            .save()
            .then(()=> {
                req.flash('success_msg', 'Loja Cadastrada com Sucesso!')
                console.log('Nova loja cadastrada com sucesso') })
            .catch((err)=> {
                req.flash("error_msg", "Houve um erro ao cadastrar a Loja")
                console.log('Erro ao cadastrar Loja ' + err)})
     
    } 
    res.redirect('/admin')
})

router.get('/lojas/nada', (req, res) => {
    res.render('stores')
})
// Outra Rota
router.get('/lojas', (req, res) => {
    Store.find().sort({date: -1 }).then((stores) => {
        res.render("stores", {stores: stores} )
    }).catch((err) => {
        if(err) {
            console.log('Erro: ' + err)
        }
    }) 
})
// Rota para Editar Loja - Ver a Tela
router.get('/lojas/edit/:id', (req, res) => {
   
     let id = req.params.id
   Store.findOne({ _id: id}).then((stores) => {
       res.render('editLojas', {stores: stores})
   }).catch((err) => {
       if (err) {
           console.log('Deu erro ' + err )
       }
   })  
   
})
// Rota para Efetivar a Edição da Loja
router.post('/lojas/edit', (req, res) => {
   
   if (!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
       stores.render(req, res, "Favor inserir o nome")             
   }else {

   Store.findOne({ _id: req.body.id}).then((values) => {
       
       values.name = req.body.name
       
       values.save().then(()=>{
           res.redirect("/admin/lojas")
       }).catch((err) => {
           console.log('Deu um erro ao Editar o Caixa ', + err)
       }).catch((err) ={
           if (err) {es.send('Deu ruim' , err)}
       }) 
       
   })  
   }
})

// Rota para Editar Caixa - Ver a Tela
router.get('/edit/:id', (req, res) => {
   
    let id = req.params.id

  SendValues.findOne({ _id: id}).then((values) => {

    Store.find().then((stores) => {

        res.render('editCaixas', { stores: stores, values: values })
    })
   
  }).catch((err) => {
      if (err) {
          console.log('Deu erro ' + err )
      }
  })  
  
})

//Efetivar a Edição de um Caixa
router.post('/caixas/edit', (req, res) => {
    
    SendValues.findOne({ _id: req.body.id }).then((values) => {

        values.name = req.body.name
        values.copy = req.body.copy
        values.print = req.body.print
        values.store = req.body.store

    values.save().then(() => {
        console.log('Postagem editada com sucesso')
        res.redirect('/admin/caixas')
    }).catch((err) => {
        console.log('Problema ao editar Caixa')
    })

    }).catch((err) => {
        console.log('Erro ao tratar a Edição de Caixa ', err)
    })
})

//Rota para deletar um Caixa
router.post('/caixas/excluir', (req, res) => {
    
    SendValues.deleteOne({ _id: req.body.id })
    .then(() => {
        res.redirect('/admin/caixas')
        console.log('Registro de Caixa deletado com sucesso')
    }).catch((err) => {
        if (err) {
            console.log('Erro ao deletar caixa ' + err)
            }
    })
 })



//Rota para deletar a loja
router.post('/lojas/excluir', (req, res) => {
    
   Store.deleteOne({ _id: req.body.id })
   .then(() => {
       res.redirect('/admin/lojas')
       console.log('Registro deletado com sucesso')
   }).catch((err) => {
       if (err) {
           console.log('Erro ao deletar caixa ' + err)
           }
   })
})

//Rotas para Cadastro

router.get('/register', (req, res) => {
    res.render('createUser')

})

router.post('/register', (req, res) => {
   
    if (!req.body.user ) {
                createUsers.render(req, res, "Digite um Nome")             
    } else if (!req.body.password) {
                createUsers.render(req, res, "Escolha uma senha ")                
    } else {
     

        
      const newUser = {
        user: req.body.user,
        password: req.body.password
    }
    new User(newUser)
    .save()
    .then(()=> { console.log('Novo usuário cadastrado com sucesso') })
    .catch((err)=> {console.log('Erro ao criar o usuário ' + err)})
 
   res.render('createUser')
    
} 

})

//Rota para OS em desenvolvimento

router.get('/os', (req, res) => {
    res.render("osAdmin")
})


module.exports = router