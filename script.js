
var bgSound = new Audio("intro.mp3") ;
bgSound.loop = true;

var homeSound = new Audio("home.mp3");
homeSound.loop = true;

    var runStart = 0;
function keycheck(event){
    
    //Enter Key
    if (event.which == 13){
        if (runWorkerId == 0){
            runWorkerId = setInterval(run, 100);
            document.getElementById("enter").style.display ="none";
            runSound.play();
            bgSound.play();
            homeSound.pause();
            runStart = 1;
            backgroundWorkerId =setInterval(moveBackground, 100);
            scoreWorkerId = setInterval(updateScore, 100);
            createBlockId = setInterval(createBlock, 100);
            moveBlockId = setInterval(moveBlocks, 100);
            
        }
    }
    //Space Key
    if (event.which == 32){

        if (runStart == 1){
            if (jumpWorkerId == 0){
                clearInterval(runWorkerId);
                runSound.pause();
                jumpWorkerId = setInterval(jump, 100);
                jumpSound.play();
            }
        }
    }
}

var runSound = new Audio("run.mp3");
runSound.loop = true;
//Run Function
var player = document.getElementById("player");
var runImageNumber = 1;
var runWorkerId = 0;
function run(){
    runImageNumber++;

    if (runImageNumber == 9){
        runImageNumber = 1;
    }
    
    player.src = "Run ("+runImageNumber+").png";
}

var jumpSound = new Audio("jump.mp3");
//Jump Function
var jumpImageNumber = 1;
var jumpWorkerId = 0;
var playerMarginTop = 410;
function jump(){
    jumpImageNumber++;
    if (jumpImageNumber<=7){
        playerMarginTop = playerMarginTop-40;
        player.style.marginTop = playerMarginTop+"px";
    }
    if (jumpImageNumber>=8){
        playerMarginTop = playerMarginTop+40;
        player.style.marginTop = playerMarginTop+"px";
    }

    if (jumpImageNumber == 13){
        jumpImageNumber = 1;
        clearInterval(jumpWorkerId)
        jumpWorkerId = 0;

        runWorkerId = setInterval(run, 100);
        runSound.play();
    }

    player.src = "Jump ("+jumpImageNumber+").png";
}

//Move Background

var background = document.getElementById("background");
var backgroundX = 0;
var backgroundWorkerId = 0;
function moveBackground(){
    backgroundX = backgroundX -20;
    background.style.backgroundPositionX =backgroundX+"px";
    
}

//Update Score
var scoreWorkerId = 0;
var score = document.getElementById("score");
var newScore =0;
function updateScore(){
    newScore++;
    score.innerHTML = newScore;
}

//Create Block
var createBlockId = 0;
var blockMarginLeft = 600;
var blockId = 1;
function createBlock (){
    var block = document.createElement("div");
    block.className = "block";
    block.id = "block"+ blockId;
    blockId++;

    var gap = Math.random()*(1000-400)+400;
    blockMarginLeft = blockMarginLeft +gap;
    block.style.marginLeft =blockMarginLeft+"px";

    background.appendChild(block);
}

//move block
var moveBlockId = 0;
function moveBlocks(){
    for(var i =1; i<=blockId; i++){
        var currentBlock = document.getElementById("block"+i);
        var currentMarginLeft = currentBlock.style.marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft)-20;
        currentBlock.style.marginLeft = newMarginLeft+"px";

        if (newMarginLeft<=129){
            if (newMarginLeft>=49){
                if (playerMarginTop<=410){
                    if (playerMarginTop>=380){
                        clearInterval(runWorkerId);
                        runSound.pause();
                        clearInterval(jumpWorkerId)
                        jumpWorkerId =-1;
                        clearInterval(backgroundWorkerId)
                        clearInterval(scoreWorkerId)
                        clearInterval(createBlockId)
                        clearInterval(moveBlockId)

                        deadWorkerId = setInterval(dead, 100);
                        deadSound.play();
                        
                    }
                }
            }
        }
    }
}

var deadSound = new Audio("dead.mp3");

//Dead Function

var deadImageNumber = 1;
var deadWorkerId =0;
function dead(){
    deadImageNumber++;
    if (deadImageNumber == 9){
        deadImageNumber=8;

        player.style.marginTop ="410px";
        document.getElementById("endScore").innerHTML = newScore;
        document.getElementById("gameover").style.visibility = "visible"
    }

    player.src = "Dead ("+deadImageNumber+").png";
    bgSound.pause();
    homeSound.play();
    
}

//restart

function re(){
    location.reload();
}
homeSound.play()
function mod1(){
    document.getElementById("gameStart").style.display ="none"
   
}

function home(){
    location.reload();
}

