//canvas
let canvas;
let canvasWidth = 750;
let canvasHeight= 250;
let context;

//dino
let dinoX = 50;
let dinoHeight = 94;
let dinoWidth = 88;
let dinoY = canvasHeight - dinoHeight;
let dinoImg;


//cactus
let cactusArray = [];

let cactusHeight = 70

let cactus1Width = 34
let cactus2Width = 69 
let cactus3Width = 102

let cactusY = canvasHeight - cactusHeight
let cactusX = 700

let cactus1Img;
let cactus2Img;
let cactus3Img;


//Game Physics
let velocityX = -8
let velocityY = 0
let gravity = 1.1

let score = 0
let gameOver = false


//dino object
let dino = {
    x: dinoX,
    y: dinoY,
    height: dinoHeight,
    width: dinoWidth,
}

window.onload = function() {
    canvas = document.getElementById("canvas")
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;

    context = canvas.getContext('2d')

    //intial Dino
    dinoImg = new Image()
    dinoImg.src = './img/dino.png'
    dinoImg.onload = function () {
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height)
    }

    cactus1Img = new Image()
    cactus1Img.src = './img/cactus1.png'

    cactus2Img = new Image()
    cactus2Img.src = './img/cactus2.png'

    cactus3Img = new Image()
    cactus3Img.src = './img/cactus3.png'

    requestAnimationFrame(update);
    setInterval(placeCactus, 1000)
    document.addEventListener('keydown', moveDino)

}

function update(){
    if(gameOver){
        alert('Game Over')
        return;
    }
    requestAnimationFrame(update);

    context.clearRect(0, 0, canvasWidth, canvasHeight)

    velocityY += gravity
    dino.y = Math.min(dino.y + velocityY, dinoY);

    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height)

    for(let i = 0; i < cactusArray.length; i++){
        let cactus = cactusArray[i];
        cactus.x += velocityX
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height)

        if(detectCollision(dino, cactus)){
            gameOver = true;
            dinoImg.src = './img/dino-dead.png'
            dinoImg.onload = function() {
                context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height)
            }
        }
    }
    //score
    context.fillStyle='black'
    context.font='20px courier';
    score++;
    context.fillText(score, 5, 20)  
}

function moveDino(e){
    if(gameOver){
        alert('Game Over')
        return;
    }

    if((e.code === 'Space')&& dino.y === dinoY){
        velocityY = -16
    }
}

function placeCactus() {

    if(gameOver){
        alert('Game Over')
        return;
    }

    let cactus = {
        img: null,
        x: cactusX,
        y: cactusY,
        height: cactusHeight,
        width: null,
    }

    let placeCactusChance = Math.random()
    
    if(placeCactusChance > .90) {
        cactus.img = cactus3Img;
        cactus.width = cactus3Width;
        cactusArray.push(cactus)

    } else if (placeCactusChance > .70){
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
        cactusArray.push(cactus)

    } else if (placeCactusChance > .50){
        cactus.img = cactus1Img;
        cactus.width = cactus1Width;
        cactusArray.push(cactus)
    }
    if(cactusArray.length > 5){
        cactusArray.shift(); //remove cacti to save memory
    }
}

function detectCollision (a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y 
}