const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Store')
require('../models/SendValues')
require('../models/Client')
const moment = require('moment')
const Store = mongoose.model("stores")
const SendValues = mongoose.model("values")
const User = mongoose.model("users")
const bcryptjs = require('bcryptjs')
const sendcaixas = require('./../inc/sendcaixas')
const Client = mongoose.model('clients')
autoIncrement = require('mongoose-auto-increment')

moment.locale("pt-br")






router.get('/', (req, res) => {
    res.render('home')
})
//Rota visualizar o formulário de fechar o caixa
router.get('/caixas', (req, res) => {
    
    res.render('caixas')
})
//Rota adicionar caixa
router.get('/caixas/nova', (req, res) => {
    Store.find().then((stores) => {
        res.render("sendCaixas", {stores: stores})
       
    }).catch((err)=> {
        if (err){
            console.log('Erro ao carregar formulário ', err)
        }
        
    })
})

router.get('/admin/caixas/success', (req, res) => {
    res.render("success")
})
//Rota para Editar - Ainda não usada
router.get('/caixas/confirm', (req, res) => {
    res.render("confirm")
})
//Rota para enviar caixa
router.post('/admin/caixas/nova', (req, res) => {

    const { name, store, copyP, copyL, printP, printL, laserC, jetC, plotter, products, internet, obs } = req.body
        
    const newCaixa = {  

            name,
            store,
            copyP,
            copyL,
            printP,
            printL,
            laserC,
            jetC,
            plotter,
            products,
            internet,
            obs
        }    
    new SendValues(newCaixa)
        .save()
        .then(()=> { console.log('Novo Caixa salvo com sucesso') })
        .catch((err)=> {console.log('Erro ao salvar o Caixa ' + err)})
   
        res.redirect("success")
})

//Rota para Cadastrar Cliente

router.get('/clientes/add', (req, res) => {

    res.render('createClient')
})

router.post('/clients/new', (req, res) =>{

    const { name, number, birthday, phone, socialMedia } = req.body

    const newClient = {
         name,
         number, 
         birthday,
         phone,
        socialMedia
    }

    new Client(newClient).save().then(() => {
        console.log('Cliente cadastrado com sucesso')
    }).catch((err) => {
        console.log('Erro ao cadastrar Cliente :', err)
    })

    res.render('success-client')
})

//Rota Listar Clientes

router.get('/clientes/buscar', (req, res, err) => {

    Client.find().sort({number: -1}).then((clients) => {
        if(clients.length > 0){
            res.render('clients', { clients: clients , moment })
        }else{
           res.render('msgError')  
        }
     })
})
//Rota Listar Clientes JSON

router.get('/clientes', (req, res, err) => {

    Client.find({}, (err, data) => {
        if(err)return res.send({ err: 'Erro ao consultar clientesJSON'})
        return res.send(data)
    })
})

//Rota para Editar Clientes

router.get('/clientes/edit/:number', (req, res) => {

    let number = req.params.number

    Client.findOne({ number: number }).then((clients) => {
        res.render('editClients', {clients: clients})
    }).catch((err) => {
        if (err) {
            console.log('Deu erro ' + err )
        }
    })
})

// Rota para Efetivar a Edição de Cadastro
router.post('/clientes/edit', (req, res) => {
    
    Client.findOne({ number: req.body.number }).then((clients) => {

        clients.number = req.body.number
        clients.name = req.body.name
        clients.socialMedia = req.body.socialMedia
        clients.phone = req.body.phone
        
        
        clients.save().then(() => {
            console.log('Cadastro alterado com sucesso')
            res.render('success-editClient')
        }).catch((err) => {
            console.log('Problema ao editar Cadastro de Cliente')
        })

        }).catch((err) => {
            console.log('Erro ao tratar a Edição de Cadastro ', err)
        })
})

//Rota para Excluir Cadastro

router.post('/clientes/excluir', (req, res) => {
    
    Client.deleteOne({ number: req.body.number })
        .then(() => {
            console.log(req.body)
            res.redirect('/clientes/buscar')
            console.log('Registro deletado com sucesso')
        }).catch((err) => {
            if (err) {
                console.log('Erro ao deletar cadastro ' + err)
                }
        })
 })


// Rota para login


  


 /*
//esses abaixo ainda não passei para o admin
router.get('/sendcaixas', (req, res) => {
    res.render('sendcaixas')
})
 */
router.get('/os', (req, res) => {
    res.render("os")
})

module.exports = router