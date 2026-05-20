//Recupera a configuração do jogo
let config = localStorage.getItem('config-bingo');

if(config) {
    config = JSON.parse(config);
}else{
    location.href = 'index.html';
}

console.log(config);

//localStorage.removeItem('config-bingo');

// Função para gerar as suas cartelas
let cartelasJogador = [];

function gerarCartelas(quantidadeCartelas) {
    for(let i = 0; i < quantidadeCartelas; i++) {

        let cartela = {};
        cartela.numerosAcertos = 0;

        cartela.numeros = [];
        for(let j = 0; j < 24; j++) {
            let numero = Math.floor(Math.random() * 98) + 1;
            cartela.numeros.push(numero);
        }
        cartela.numeros.sort((a, b) => a - b);


        cartela.cartela= [];
            for(let j = 0; j < 5; j++) {
                cartela.cartela[j] = [];
                for(let k = 0; k < 5; k++) {
                    if(j === 2 && k === 2) {
                        cartela.cartela[j][k] = '⭐';
                    } else {
                        cartela.cartela[j][k] = cartela.numeros.shift();
                    }
                }
            }

        cartelasJogador.push(cartela);
    }
}

// Função para gerar os bots e suas cartelas
function gerarBots(quantidadeBots, quantidadeCartelas) {
    
}

// Função para sortear um número
function sortearNumero() {
    
}

function iniciarJogo() {
    gerarCartelas(config.cartelas);
    gerarBots(config.bots, config.cartelas);
    console.log(cartelasJogador);
}

iniciarJogo();