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


// Função para sortear os números
let numerosDisponiveis = [];
let numerosSorteados = [];

// Cria os números de 1 a 98
for(let i = 1; i <= 98; i++) {
    numerosDisponiveis.push(i);
}

// Embaralha os números (Fisher-Yates)
for(let i = numerosDisponiveis.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    [numerosDisponiveis[i], numerosDisponiveis[j]] =
    [numerosDisponiveis[j], numerosDisponiveis[i]];
}

function sortearNumeros(tempo) {
    const interval = setInterval(() => {

        if(numerosDisponiveis.length === 0) {
            clearInterval(interval);
            console.log("Todos os números foram sorteados!");
            return;
        }

        // Remove e retorna o primeiro número da lista
        let numero = numerosDisponiveis.shift();

        numerosSorteados.push(numero);

        console.log("Número sorteado:", numero);
        console.log("Números restantes:", numerosDisponiveis.length);
        console.log("Números sorteados:", numerosSorteados);

    }, tempo);
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
    sortearNumeros(config.tempo);
}

function bingo() {
    
}

iniciarJogo();