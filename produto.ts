class Produto{

    id: number;
    nome: string;
    codigo: string;
    descricao: string;
    preco: number;

    constructor(id, nome, codigo, descricao, preco){
        this.id = id;
        this.nome = nome;
        this.codigo = codigo;
        this.descricao = descricao;
        this.preco = preco;
    }

    //--------------------

    public getId(){
        return this.id;
    }

    public getNome(){
        return this.nome;
    }

    public getCodigo(){
        return this.codigo
    }

    public getDescricao(){
        return this.descricao;
    }

    public getPreco(){
        return this.preco;
    }

    //--------------------

    public setId(id){
        this.id = id;
    }

    public setNome(nome){
        this.nome = nome;
    }

    public setCodigo(codigo){
        this.codigo = codigo
    }

    public setDescricao(descricao){
        this.descricao = descricao;
    }

    public setPreco(preco){
        this.preco = preco;
    }

    //--------------------

}

module.exports = Produto;