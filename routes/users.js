const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Store')
require('../models/SendValues')
const Store = mongoose.model("stores")
const SendValues = mongoose.model("values")
const User = mongoose.model("users")
const bcryptjs = require('bcryptjs')
const sendcaixas = require('./../inc/sendcaixas')






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

        
     const newCaixa = {  
        name: req.body.name,
        store: req.body.store,
        copyP: req.body.copyP,
        copyL: req.body.copyL,
        printP: req.body.printP,
        printL: req.body.printL,
        laserC: req.body.laserC,
        jetC: req.body.jetC,
        plotter: req.body.plotter,
        products: req.body.products,
        internet: req.body.internet,
        obs: req.body.obs
     }    
    new SendValues(newCaixa)
        .save()
        .then(()=> { console.log('Novo Caixa salvo com sucesso') })
        .catch((err)=> {console.log('Erro ao salvar o Caixa ' + err)})
     
  
        res.redirect("success")
    
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