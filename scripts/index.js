//Botões de mais e menos para os inputs de bots
const inputMaisBots = document.querySelector('#mais-bots');
const inputMenosBots = document.querySelector('#menos-bots');
const inputBots = document.querySelector('#input-bots');
const inputTempo = document.querySelector('#input-tempo');

inputMaisBots.addEventListener('click', () => {
    let valor = parseInt(inputBots.value);
    if (valor < 10) {
        inputBots.value = valor + 1;
    }
});

inputMenosBots.addEventListener('click', () => {
    let valor = parseInt(inputBots.value);
    if (valor > 1) {
        inputBots.value = valor - 1;
    }
});

//Botões de mais e menos para os inputs de cartelas
const inputMaisCartelas = document.querySelector('#mais-cartelas');
const inputMenosCartelas = document.querySelector('#menos-cartelas');
const inputCartelas = document.querySelector('#input-cartelas');

inputMaisCartelas.addEventListener('click', () => {
    let valor = parseInt(inputCartelas.value);
    if (valor < 6) {
        inputCartelas.value = valor + 1;
    }
});

inputMenosCartelas.addEventListener('click', () => {
    let valor = parseInt(inputCartelas.value);
    if (valor > 1) {
        inputCartelas.value = valor - 1;
    }
});

//Botão de iniciar jogo
const iniciarBtn = document.querySelector('.iniciar');
let config = [];

iniciarBtn.addEventListener('click', () => {
    console.log('Iniciar jogo');

    config = {
        bots: parseInt(inputBots.value),
        cartelas: parseInt(inputCartelas.value),
        tempo: parseFloat(inputTempo.value)
    };
    
    localStorage.setItem('config-bingo', JSON.stringify(config));

    location.href = 'game.html';
});