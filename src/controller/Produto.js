import { openDB } from "../configDB.js";

export async function createTable(){
    openDB().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS Produto ( id INTEGER PRIMARY KEY, nome TEXT, codigo TEXT, descricao TEXT, preco REAL)')
    })
}

export async function selectProdutos(Produto){
    return openDB().then(db=>{
        return db.all("SELECT * FROM Produto").then(res=>res)
    })
}

export async function insertProduto(produto){
    openDB().then(db=>{
        db.run('INSERT INTO Produto (nome, codigo, descricao, preco) VALUES(?,?,?,?)', [produto.nome, produto.codigo, produto.descricao, produto.preco]);
    });
}

export async function updateProduto(produto){
    openDB().then(db=>{
        db.run('UPDATE Produto SET nome=?, codigo=?, descricao=?, preco=? WHERE id=?', [produto.nome, produto.codigo, produto.descricao, produto.preco, produto.id])
    })
}

export async function deleteProduto(id){
    return openDB().then(db=>{
        return db.get('DELETE FROM Produto WHERE id=?', [id]).then(res=>res)
    })
}
