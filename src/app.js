import { openDB } from './configDB.js'
import { createTable, selectProdutos, insertProduto, updateProduto, deleteProduto } from './controller/Produto.js';

import express from 'express';
import dotenv from 'dotenv'

const app = express();

//openDB();

createTable();

app.set('view engine', 'ejs');
app.use(express.json());

dotenv.config({ path: './.env'});

app.get('/', (req, res) =>{
    //res.send('working')
    res.render('home.ejs')
})

app.post('/produto', (req, res) => {
    insertProduto(req.body)
    res.json({
        "statusCode": 200
    })
})

app.get('/produto', async (req, res) => {
    let produto = await selectProdutos();
    res.json(produto)
})

app.put('/produto', (req, res) => {
    if(req.body && !req.body.id)
    {
        res.json({
            "statusCode": 400,
            "msg": "Você precisa informar um ID"
        })
    }
    else
    {
        updateProduto(req.body)
        res.json({
                "statusCode": 200
            })
    }
})

app.delete('/produto', async (req, res) => {
    let produto = await deleteProduto(req.body.id);
    res.json(produto)
})

app.listen(process.env.PORT, process.env.ADDRESS, () => console.log(`Listening at ${process.env.ADDRESS}:${process.env.PORT}`))