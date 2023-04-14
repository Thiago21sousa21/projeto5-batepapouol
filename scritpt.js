axios.defaults.headers.common['Authorization'] = 'DQqHRAxotNHnS6S76x3rXZZE';

const user = {
    name: ''
};



function loopEntrada(){

    function respostaEnvioNome(resposta){
        console.log(resposta);
    
    }
    function erroEnvioNome(deuErrado){
        console.log(deuErrado);
        loopEntrada();
    }

    user.name = prompt('Escolha um nome de usuario:');
    let promessa1 = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants ', user);
    promessa1.then(respostaEnvioNome);
    promessa1.catch(erroEnvioNome);



}

loopEntrada();

function verificarOnline(){

    function respostaOciosidade(reposta){
        /*console.log(reposta);*/
    }
    function erroOciosidade(erro){
        console.log(erro);
    }

    let promessa2 = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', user);
    promessa2.then(respostaOciosidade)
    promessa2.catch(erroOciosidade)

}
const stopKey = setInterval(verificarOnline, 5000);
function pararVerificar(){
    clearInterval(stopKey);
}


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

function funcRenderizarMensagens(){
    renderizarMensagens.innerHTML = '';
    for(let i =0 ; i < dadosServidor.length ; i++){
        renderizarMensagens.innerHTML += 
            `<li>
                <strong class="negritoFraco cinza">${dadosServidor.time[i]}</strong> <strong class="negritoForte">${dadosServidor.from[i]}:</strong> <strong class="negritoFraco preto">${dadosServidor.text[i]}</strong>
            </li>
            `;
    }
}
let dadosServidor;
function resPromsssaServidor(resposta){
    dadosServidor = resposta.data;
    console.log(dadosServidor);

    funcRenderizarMensagens();

}
function resErroServidor(deuErrado){
    alert('deuErrado');
}

let promessaServidor = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
promessaServidor.then(resPromsssaServidor);
promessaServidor.catch(resErroServidor); 

function clicaEnvia(){
    pegaImput();
    pegaHora();

    let novaMensagem = {
        from: '', 
        to: 'Todos', 
        text:'',
        type: 'message'
        };
    novaMensagem.text = valorInput;
    novaMensagem.from = user.name;
    listaMensagens.push(novaMensagem);

    
    const promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', novaMensagem);
    promessa.then(respostaEnvio);
    promessa.catch(erroEnvio);
    

    renderizarMensagens.innerHTML = '';
    for(let i =0 ; i < dadosServidor.length ; i++){
        renderizarMensagens.innerHTML += 
            `<li>
                <strong class="negritoFraco cinza">${dadosServidor.time[i]}</strong> <strong class="negritoForte">${dadosServidor.from[i]}:</strong> <strong class="negritoFraco preto">${dadosServidor.text[i]}</strong>
            </li>
            `;
    }
}
