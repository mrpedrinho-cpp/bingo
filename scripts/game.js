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

// Função para gerar cores aleatórias para a bola dos números sorteados
function gerarCorAleatoria() {
    return `hsl(${Math.random() * 360}, 80%, 50%)`;
}


// Função para sortear os números
let numerosDisponiveis = [];
let numerosSorteados = [];
let coresNumeros = {}

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
        coresNumeros[numero] = gerarCorAleatoria();
        console.log("Número sorteado:", numero);
        //console.log("Números restantes:", numerosDisponiveis.length);
        console.log("Números sorteados:", numerosSorteados);
        //console.log("Cores dos números:", coresNumeros);
        atualizarUltimosNumeros();

    }, tempo);
}

// Atualizar ultimos números sorteados
function atualizarUltimosNumeros() {
    const ultimoNumero = document.getElementById("ultimo-numero");
    const numerosRestantes = document.getElementById("numeros-restante");
    const numero1 = document.getElementById("numero-bola-1");
    const numero2 = document.getElementById("numero-bola-2");
    const numero3 = document.getElementById("numero-bola-3");
    const numero4 = document.getElementById("numero-bola-4");
    const numero5 = document.getElementById("numero-bola-5");
    const numero6 = document.getElementById("numero-bola-6");

    ultimoNumero.textContent = numerosSorteados[numerosSorteados.length - 1] || '00';
    if(numerosSorteados[numerosSorteados.length - 1] < 10) {
        ultimoNumero.textContent = "0" + numerosSorteados[numerosSorteados.length - 1];
    }
    ultimoNumero.style.borderColor = coresNumeros[numerosSorteados[numerosSorteados.length - 1]] || 'black';

    for(let i = 1; i <= 6; i++) {
        const bola = document.getElementById(`numero-bola-${i}`);
        const numero = numerosSorteados[numerosSorteados.length - i];
        if(numero) {
            bola.style.borderColor = coresNumeros[numero];
        }

        // Atualiza o número dentro da bola
        bola.textContent = numero || '00';
        if(numero<10) {
            bola.textContent = "0" + numero;
        }
    }

    numerosRestantes.textContent = numerosDisponiveis.length;
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