axios.defaults.headers.common['Authorization'] = 'DQqHRAxotNHnS6S76x3rXZZE';

const user = {
    name: ''
};
function respostaEnvioNome(resposta){
    console.log(resposta);

}
function erroEnvioNome(deuErrado){
    console.log(deuErrado);
    loopEntrada();
}

function loopEntrada(){
    user.name = prompt('Escolha um nome de usuario:');
    let promessa1 = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants ', user);
    promessa1.then(respostaEnvioNome);
    promessa1.catch(erroEnvioNome);
}

loopEntrada();

const listaMensagens = [];
let valorInput;
let renderizarMensagens = document.querySelector('ul');

function pegaImput(){
    valorInput = document.querySelector('input').value;
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

function respostaEnvio(resposta){
    console.log(resposta);

}
function erroEnvio(deuErrado){
    console.log(deuErrado);
}



function clicaEnvia(){
    pegaImput();
    pegaHora();

    let novaMensagem = {
        from: '', 
        to: '', 
        text:'',
        type: ''
        };
    novaMensagem.text = valorInput;
    novaMensagem.from = user.name;
    listaMensagens.push(novaMensagem);

    
    const promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages',novaMensagem);
    promessa.then(respostaEnvio);
    promessa.catch(erroEnvio);
    

    renderizarMensagens.innerHTML = '';
    for(let i =0 ; i < listaMensagens.length ; i++){
        renderizarMensagens.innerHTML += 
            `<li>
                <strong class="negritoFraco cinza">${arrayMomentoEnvio[i]}</strong> <strong class="negritoForte">${user}:</strong> <strong class="negritoFraco preto">${listaMensagens[i].text}</strong>
            </li>
            `;
    }
}
