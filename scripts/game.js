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
            
            if(!cartela.numeros.includes(numero)) {
                cartela.numeros.push(numero);
            }else{
                j--;
            }
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

function mostrarCartelas(cartelas) {
    const container = document.getElementById("cartelas");

    // limpa antes de mostrar
    container.innerHTML = "";

    for(let i = 0; i < cartelas.length; i++) {

        const cartelaDiv = document.createElement("div");
        cartelaDiv.classList.add("cartela");

        let html = `<h3>Cartela ${i + 1}</h3>`;

        for(let j = 0; j < 5; j++) {
            html += `<div class="linha">`;

            for(let k = 0; k < 5; k++) {
                html += `<span class="numero">${cartelas[i].cartela[j][k]}</span>`;
            }

            html += `</div>`;
        }

        cartelaDiv.innerHTML = html;
        container.appendChild(cartelaDiv);
    }
}

function iniciarJogo() {
    gerarCartelas(config.cartelas);
    gerarBots(config.bots, config.cartelas);
    console.log(cartelasJogador);
    mostrarCartelas(cartelasJogador);
}

function bingo() {
    
}

iniciarJogo();