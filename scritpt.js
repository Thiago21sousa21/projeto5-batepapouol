axios.defaults.headers.common['Authorization'] = 'DQqHRAxotNHnS6S76x3rXZZE';

const user = {
    name: ''
};

while(user.name == '' || user.name == null){
    user.name = prompt('Escolha um nome de usuario:');
    console.log(user.name);

}


function loopEntrada(){
    function respostaEnvioNome(resposta){
        console.log(resposta);
        console.log('nome cadastrado com sucesso!');
    
    }
    function erroEnvioNome(deuErrado){
        console.log(deuErrado);
        user.name = prompt('Escolha um nome de usuario:');

        loopEntrada();
    }
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
    stopPuxaDados();
}


const listaMensagens = [];
let valorInput;
let renderizarMensagens = document.querySelector('ul');



/*const arrayMomentoEnvio = [];
function pegaHora(){
    let agora = new Date();
    let horas = agora.getHours();
    let minutos = agora.getMinutes();
    let segundos = agora.getSeconds();
    let momentoEnvio = `(${horas}:${minutos}:${segundos})`;
    arrayMomentoEnvio.push(momentoEnvio);
}*/
let dadosServidor;

function funcRenderizarMensagens(){
    renderizarMensagens.innerHTML = '';
    for(let i =0 ; i < dadosServidor.length ; i++){
        if( dadosServidor[i].type == 'status'){
            renderizarMensagens.innerHTML += `
                                                <li data-test="message" class="tipoStatus">
                                                    <strong class="negritoFraco cinza">(${dadosServidor[i].time})</strong> <strong class="negritoForte">${dadosServidor[i].from} </strong> <strong class="negritoFraco preto">${dadosServidor[i].text}</strong>
                                                </li>
                                            `;
        }
        else if( dadosServidor[i].type == 'message'){
            renderizarMensagens.innerHTML += `
                                                <li data-test="message" class="tipoMessage">
                                                    <strong class="negritoFraco cinza">(${dadosServidor[i].time})</strong> <strong class="negritoForte">${dadosServidor[i].from} </strong><span>para </span><strong class="negritoForte">${dadosServidor[i].to}: </strong><strong class="negritoFraco preto">${dadosServidor[i].text}</strong>
                                                </li>
                                            `;
        }
        else if( dadosServidor[i].type == 'private_message'){
            renderizarMensagens.innerHTML += `
                                                <li data-test="message" class="tipoPrivate hidden">
                                                    <strong class="negritoFraco cinza">(${dadosServidor[i].time})</strong> <strong class="negritoForte">${dadosServidor[i].from} </strong> <span>reservadamente para </span><strong class="negritoForte">${dadosServidor[i].to}: </strong> <strong class="negritoFraco preto">${dadosServidor[i].text}</strong>
                                                </li>
                                            `;
            if(dadosServidor[i].to == user.name || dadosServidor[i].from == user.name){
                let cadaEnvio = document.querySelectorAll('li');
                cadaEnvio[i].classList.remove('hidden');
            }
        }
    }
}
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
    /*pegaHora();*/
    tagInput = document.querySelector('input');

    valorInput = tagInput.value;


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
        window.location.reload()
    }
    const promessa0 = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', novaMensagem);
    promessa0.then(repostaPromessa0);
    promessa0.catch(erroResposta0);

    tagInput.value = '';
    
    


}

function enviarEnter(event) {
    if (event.keyCode === 13) {
      clicaEnvia();
    }
  }
  
