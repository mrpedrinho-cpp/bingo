//Botão de iniciar jogo
const iniciarBtn = document.querySelector('.iniciar');

iniciarBtn.addEventListener('click', () => {
    console.log('Iniciar jogo');
});

//Botões de mais e menos para os inputs de bots
const inputMaisBots = document.querySelector('#mais-bots');
const inputMenosBots = document.querySelector('#menos-bots');
const inputBots = document.querySelector('#input-bots');

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