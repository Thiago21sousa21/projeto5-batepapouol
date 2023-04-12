const user = prompt('Escolha um nome de usuario:');
const tdsMensagens = [];
let valorInput;
let mostrarTdsMensagens = document.querySelector('ul');

function pegaImput(){
    valorInput = document.querySelector('input').value;
    console.log(valorInput);
}
const arrayMomentoEnvio = [];
function pegaHora(){
    let agora = new Date();
    let horas = agora.getHours();
    let minutos = agora.getMinutes();
    let segundos = agora.getSeconds();
    let momentoEnvio = `(${horas}:${minutos}:${segundos})`;
    arrayMomentoEnvio.push(momentoEnvio);
}

function clicaEnvia(){
    pegaImput();
    pegaHora();

    let novaMensagem = {remetente: '', destinatario: '', conteudo:''};
    novaMensagem.conteudo = valorInput;
    tdsMensagens.push(novaMensagem);

    mostrarTdsMensagens.innerHTML = '';
    for(let i =0 ; i < tdsMensagens.length ; i++){
        mostrarTdsMensagens.innerHTML += 
            `<li>
                <strong class="negritoFraco cinza">${arrayMomentoEnvio[i]}</strong> <strong class="negritoForte">${user}:</strong> <strong class="negritoFraco preto">${tdsMensagens[i].conteudo}</strong>
            </li>
            `;
    }
}
