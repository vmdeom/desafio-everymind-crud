
var dataInput = {
    id: window.document.getElementById('id-reg'),
    nome: window.document.getElementById('nome-reg'),
    desc: window.document.getElementById('descricao-reg'),
    preco: window.document.getElementById('preco-reg')
}

var dataOutput = {
    id: '',
    nome: '',
    desc: '',
    preco: ''
}

const createBtn = window.document.getElementById('create-button');
const updateBtn = window.document.getElementById('update-button');
const editButtons = window.document.getElementsByName('edit-btn');
const deleteButtons = window.document.getElementsByName('delete-btn');

var ids = document.getElementsByName('td-id')
var nomes = document.getElementsByName('td-nome')
var descs = document.getElementsByName('td-desc')
var precos = document.getElementsByName('td-preco')

function updateData(){

    dataOutput.id = dataInput.id.value,
    dataOutput.nome = dataInput.nome.value
    dataOutput.desc = dataInput.desc.value
    dataOutput.preco = dataInput.preco.value

}

function updateRow(id, nome, desc, preco){

    ids[id].value = id
    nomes[id].innerHTML = nome
    descs[id].innerHTML = desc
    precos[id].innerHTML = preco

}

function editButton(bid){

    data = {
        id: ids[bid.split('-')[2]].id.split('-')[2],
        nome: nomes[bid.split('-')[2]].innerHTML,
        desc: descs[bid.split('-')[2]].innerHTML,
        preco: precos[bid.split('-')[2]].innerHTML
    }

    dataInput.id.value = data.id
    dataInput.nome.value = data.nome
    dataInput.desc.value = data.desc
    dataInput.preco.value = data.preco

    createBtn.style.visibility = 'hidden'
    updateBtn.style.visibility = 'visible'
}

function createProduto(d){

    updateData();

    let url = '/produto'

    let options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: d.nome,
            descricao: d.desc,
            preco: d.preco
        })
     }

    fetch(url ,options)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));

}

function updateProduto(d){

    let url = '/produto'

    let options = {
        method: 'PUT',
        headers:{
            'Content-type': 'application/json'
           },
           body: JSON.stringify({
                nome: d.nome.value,
                descricao: d.desc.value,
                preco: d.preco.value,
                id: d.id.value
            })
        }
        
    console.log(options.body)

    fetch(url ,options)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));

    updateRow(d.id.value, d.nome.value, d.desc.value, d.preco.value)

}

function deleteProduto(d){

    let ids = document.getElementsByName('td-id')
    let id = ids[d.split('-')[2]].innerHTML
    let row = document.getElementById(`tr-id-${id - 1}`)

    let url = '/produto'

    let options = {
        method: 'DELETE',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    }

    fetch(url, options)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
    .then(row.remove())
}

createBtn.addEventListener('click', () => createProduto(dataOutput));

for(i = 0; i < editButtons.length; i++){
    editButtons[i].addEventListener('click', (e) => editButton(e.target.id));
}

updateBtn.addEventListener('click', () => updateProduto(dataInput));
updateBtn.style.visibility = 'hidden'

for(i = 0; i < deleteButtons.length; i++){
    deleteButtons[i].addEventListener('click', (e) => deleteProduto(e.target.id))
}