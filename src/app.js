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
app.use(urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));

dotenv.config({ path: './.env'});

app.get('/', (req, res) =>{
    res.send('working')
})

app.get('/produto', async(req, res) => {
    let produtos = await selectProdutos();
    res.render('home.ejs', {data: produtos});
})

app.post('/produto', async(req, res) => {
    insertProduto(req.body).then(res.json(req.body));
})

app.put('/produto', async(req, res) => {
    if(req.body && !req.body.id)
    {
        res.json({
            "statusCode": 400,
            "msg": "Você precisa informar um ID"
        })
    }
    else
    {
        updateProduto(req.body).then(res.json(req.body))
    }
})

app.delete('/produto', async(req, res) => {
    deleteProduto(req.body.id).then(res.json(req.body.id))
})

app.listen(process.env.PORT, process.env.ADDRESS, () => console.log(`Listening at ${process.env.ADDRESS}:${process.env.PORT}`))