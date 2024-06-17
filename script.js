let quadro = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let jogador = '';
let aviso = '';
let playing = false;
reset()
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick)
})

function itemClick(event){
    let item = event.target.getAttribute('data-item')
    if(playing && quadro[item] === ''){
        quadro[item] = jogador
        renderQuadro()
        trocarJogador()
    }
}

function trocarJogador(){
    jogador = jogador === 'x' ? 'o' : 'x'
    renderInfo()
}

function reset(){
    aviso = '';
    let random = Math.floor(Math.random() * 2);
    jogador = random === 0 ? 'x' : 'o';
    for(let i in quadro){
        quadro[i] = ''
    }
    playing = true

    renderQuadro()
    renderInfo()
}

function renderQuadro(){
    for(let i in quadro){
        let item = document.querySelector(`div[data-item=${i}`)
        item.innerHTML = quadro[i];
    }
    checkGame()
}

function renderInfo(){
    document.querySelector(`.vez`).innerHTML = jogador
    document.querySelector(`.resultado`).innerHTML = aviso
}
function checkGame(){
    if(checkwinnerFor('x')){
        aviso = 'X'
        playing = false
    } else if(checkwinnerFor('o')){
        aviso = 'O'
        playing = false
    } else if(isFull()){
        aviso = 'Empate'
        playing = false
    }
}
function checkwinnerFor(player){
    let possibilidades = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',
        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',
        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let i in possibilidades){
        let pArray = possibilidades[i].split(',');
        let hasWon = pArray.every((option) => quadro[option] === player)
        if(hasWon){
            return true
        }
    }
    return false
}

function isFull(){
    for(let i in quadro){
        if(quadro[i] === ''){
            return false
        }
    }
    return true
}