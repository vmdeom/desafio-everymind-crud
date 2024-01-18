import { openDB } from './configDB.js'
import { createTable, selectProduto, selectProdutos, insertProduto, updateProduto, deleteProduto } from './controller/Produto.js';

import express from 'express';
import dotenv from 'dotenv';
import pkg from 'body-parser';
const { urlencoded } = pkg;

const app = express();

//openDB();

createTable();

app.set('view engine', 'ejs');
app.use(urlencoded({extended: false}))
app.use(express.json());

dotenv.config({ path: './.env'});

app.get('/', (req, res) =>{
    res.send('working')
    //res.render('home.ejs')
})

app.get('/produto', async(req, res) => {
    let produtos = await selectProdutos();
    if(req.query.id){
        let produto = await selectProduto(req.query.id);
        res.render('home.ejs', {action: '/produto/edit', data1: produtos, data2: produto});
        return
    }
    else{
        res.render('home.ejs', {action: '/produto', data1: produtos, data2: {"id": "", "nome": "", "descricao": "", "preco": ""}});
        return
    }
})

app.post('/produto', (req, res) => {
    const {nome, descricao, preco} = req.body;
    insertProduto(req.body).then(res.redirect('/produto'))
})

app.post('/produto/edit', (req, res) => {
    if(req.body && !req.body.id)
    {
        res.json({
            "statusCode": 400,
            "msg": "Você precisa informar um ID"
        })
    }
    else
    {
        const {nome, descricao, preco} = req.body;
        updateProduto(req.body).then(res.redirect('/produto'))
    }
})

app.delete('/produto', async (req, res) => {
    let produto = await deleteProduto(req.body.id);
    res.json(produto)
})

app.listen(process.env.PORT, process.env.ADDRESS, () => console.log(`Listening at ${process.env.ADDRESS}:${process.env.PORT}`))