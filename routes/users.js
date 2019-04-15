const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Store')
require('../models/SendValues')
const Store = mongoose.model("stores")
const SendValues = mongoose.model("values")
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

    if (!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
        sendcaixas.render(req, res, "Favor inserir o nome")             
    } else if (!req.body.copy || typeof req.body.copy == undefined || req.body.copy == null) {
        sendcaixas.render(req, res, "Favor informar o valor das cópias")       
    }else if (!req.body.print || typeof req.body.print == undefined || req.body.print == null) {
        sendcaixas.render(req, res, "Favor informar  o valor das impressões")                
    }else if (!req.body.store || typeof req.body.store == undefined || req.body.store == null) {
        sendcaixas.render(req, res, "Selecione sua loja")                
    }else {
     
     const newCaixa = {
        name: req.body.name,
        copy: req.body.copy,
        print: req.body.print,
        store: req.body.store
    }

    new SendValues(newCaixa)
        .save()
        .then(()=> { console.log('Novo Caixa salvo com sucesso') })
        .catch((err)=> {console.log('Erro ao salvar o Caixa ' + err)})
     
       
        res.redirect("success")
    } 
})
 /*
//esses abaixo ainda não passei para o admin
router.get('/sendcaixas', (req, res) => {
    res.render('sendcaixas')
})

router.get('/os', (req, res) => {
    res.render("os")
})
 */
module.exports = router