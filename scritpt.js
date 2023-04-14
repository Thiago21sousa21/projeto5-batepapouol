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
puxaDados();
const keyPuxaDados = setInterval(puxaDados, 3000);
function stopPuxaDados() {
    clearInterval(keyPuxaDados);
}    

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
const keyVerificarOnline = setInterval(verificarOnline, 5000);
function stopVerificarOnline(){
    clearInterval(keyVerificarOnline);
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
                <strong class="negritoFraco cinza">(${dadosServidor[i].time})</strong> <strong class="negritoForte">${dadosServidor[i].from}:</strong> <strong class="negritoFraco preto">${dadosServidor[i].text}</strong>
            </li>
            `;
    }
}
let dadosServidor;
function resPromsssaServidor(resposta){
    dadosServidor = resposta.data;
    funcRenderizarMensagens();
}

function resErroServidor(deuErrado){
    alert('deuErrado');
}

function puxaDados(){
    let promessaServidor = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    promessaServidor.then(resPromsssaServidor);
    promessaServidor.catch(resErroServidor); 
}

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

    function repostaPromessa0(){
        puxaDados();
    }
    function erroResposta0(erro){
        alert('erro');
        console.log(erro);
    }
    const promessa0 = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', novaMensagem);
    promessa0.then(repostaPromessa0);
    promessa0.catch(erroResposta0);
    


}
