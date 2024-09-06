const form = document.getElementById("form-atividade");
const BotaoLimpar = document.getElementById('limpar-tudo');
const nomes = [];
const telefones = [];

let linhas= '';

BotaoLimpar.addEventListener('click', function(){
    LimparLista();
});

form.addEventListener('submit', function(e){
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
});

function adicionaLinha (){
    const inputNome = document.getElementById('nome');
    const inputTelefone = document.getElementById('telefone');

    if(telefones.includes(inputTelefone.value)){
        alert(`O telefone ${inputTelefone.value} já foi inserido`);
    } else {
        nomes.push(inputNome.value);
        telefones.push(inputTelefone.value);
    
        const index = nomes.length - 1;

        const linha = `
        <tr data-index="${index}">
            <td>${inputNome.value}</td>
            <td>${inputTelefone.value}</td>
            <td><button class="delete-btn" data-index="${index}">X</button></td>
        </tr>`;
        
        linhas += linha;
    }
}

function atualizaTabela(){
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;

    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', removeLinha);
    });
}

function removeLinha(event){
    const index = event.target.getAttribute('data-index');

    nomes.splice(index, 1);
    telefones.splice(index, 1);

    linhas = '';
    nomes.forEach((nome, i) => {
        const telefone = telefones[i];
        linhas += `
        <tr data-index="${i}">
            <td>${nome}</td>
            <td>${telefone}</td>
            <td><button class="delete-btn" data-index="${i}">X</button></td>
        </tr>`;
    });

    atualizaTabela();
}

function LimparLista() {

    nomes.length = 0;
    telefones.length = 0;
    linhas = '';
    atualizaTabela();
}
