
let matrix = {n:24,m:10}, matrixArr = [], positions = [], rotateArr = [], nextPieceArr= [], droppedPositions = [];
let centerOfPosition;
let lines = 0;
let isIorO;
let background, gameArea, nextPieceArea, scoreArea,levelArea, informationArea, topListArea;
let square, squareSize = 25;
let istatus = 0;
let score = 0;
let interValId;
let level = 0, levels = [725,670,620,580,530,490,440,400,370,340,300,280,270,250,220];
let tetris = new Tetris(), nextTetronimo, currentTetronimo;
let dropped = false;
function addToLinesAndLevels(clearedlines){
    lines += clearedlines;
    console.log("lines: " + lines)
    console.log("level: " + level)
    if(lines >= 10){
        lines-=10
        level++;
        clearInterval(interValId)
        interValId = setInterval(moveDown,levels[level])
    }
    refresScoreAndLevel()
}

function hide() {
    for(let i = 0; i < 4; i++ ){
        x = positions[i][0];
        y = positions[i][1];
        matrixArr[x][y][0].removeClass("fullSquare")
        matrixArr[x][y][0].addClass("emptySquare")
        matrixArr[x][y][0].css({
            backgroundColor: '',
            borderColor: ''
        })
        matrixArr[x][y][1] = 0;
    }
}
function hideNextPieceArea() {
    for(let i =0; i < 4; i++ ){
        for(let j = 0; j < 4 ;j++){
            nextPieceArr[i][j].removeClass('fullSquare')
            nextPieceArr[i][j].addClass('nextPSquare')
            nextPieceArr[i][j].css({
                backgroundColor: ''
            })
        }
    }
}
function GameEnd(){
        topListArea = $('<div id="top_list">\n<p id="list"></p>\n</div>')
        topListArea.attr('id','top_list')
        topListArea.appendTo('body')
        var person = prompt("Kérnénk egy nevet:", "tetris");
        // eltaroljuk localStorage-ben az aktualis jatekos klikkeleseinek szamat
        localStorage.setItem(person, Number(score));
        // feltoltjuk a toplistat
        fill_toplist();

        clearInterval(interValId)
        drawGameOver()

        $(window).off("keydown")

        $(window).on("keydown", function (e){
            if(e.key == "ArrowUp" || e.key == "ArrowDown"){
                e.preventDefault();
            }
            if(e.keyCode === 32){
                location.reload();
            }
        })

}
function draw() {
    for(let i = 0; i < 4; i++){
        x = positions[i][0];
        y = positions[i][1];


        matrixArr[x][y][0].removeClass("emptySquare")
        matrixArr[x][y][0].addClass("fullSquare")
        matrixArr[x][y][0].css({
            backgroundColor: currentTetronimo[1],
            borderColor: currentTetronimo[1]
        })
    }
    matrixArr[x][y][1] = 1
    isLanded();
}
function clearAndMoveLine(rows) {
    let rowlength = rows.length
    rows.reverse()
    for (let i = 0; i < rowlength; i++){
        for (let j = rows[0]; j >= 0; j--){
            for (let k = 0; k < 10;k++){
                if(j !== 0){
                    matrixArr[j][k][0].removeClass(matrixArr[j][k][0].attr('class'))
                    matrixArr[j][k][0].addClass(matrixArr[j-1][k][0].attr('class'))
                    matrixArr[j][k][0].css({
                        backgroundColor: matrixArr[j-1][k][0].css( "background-color" ),
                        borderColor: matrixArr[j-1][k][0].css( "border-color" )
                    })
                    matrixArr[j][k][1] = matrixArr[j-1][k][1]
                }else{
                    matrixArr[j][k][0].removeClass(matrixArr[j][k][0].attr('class'))
                    matrixArr[j][k][0].addClass('emptySquare')
                    matrixArr[j][k][0].css({
                        backgroundColor: '',
                        borderColor: ''
                    })
                    matrixArr[j][k][1] = 0
                }
            }
        }
        rows.shift();

    }

}
function clear()  {
    let fullOfTwo = true
    let rows = [];
    for (let i = 23; i >= 0; i--) {
        for (let j = 0; j < 10; j++) {

            if (matrixArr[i][j][1] === 0){
                fullOfTwo = false
                break;
            }
        }
        if (fullOfTwo){
            rows.push(i)
        }
        fullOfTwo = true;
    }
    if(rows.length > 0){

        if(rows.length === 1){
            addToScore(10)
        }else if(rows.length === 2){
            addToScore(30)
        }else if (rows.length === 3){
            addToScore(50)
        }else{
            addToScore(80)
        }
        playClearSound()
        addToLinesAndLevels(rows.length)
        clearAndMoveLine(rows)
    }
}

function loggingMatrixArrNumeric() {
    let ret = "";
    for(let i = 0; i < 24;i++){
        for (let j = 0; j < 10;j++){
            if(matrixArr[i][j][1] == 2){
                ret += matrixArr[i][j][1] + " ";
            }else
                ret += "  ";

        }
        ret += "\n"
    }
    console.log(ret)
}
function isCurrentIorO() {

    let isO = false;
    if(currentTetronimo[0].length === 4){
        isI = true;
        for(let i = 0; i < 4;i++){
            if(currentTetronimo[0][i].length !== 1){
                isI = false
            }
        }
        if(isI){
            isIorO = 'I';
        }
    }
    if(currentTetronimo[0].length === 2){
        isO = true
        for(let i = 0; i < 2;i++){
                if(currentTetronimo[0][i].length !== 2){
                    isO = false
                }
        }
        if(isO){
            isIorO = "O"
        }
    }
}

function rotate(){

    let counter = 0;
    if(isIorO === 'I') {
        istatus++

        if( istatus === 1) {
            if(positions[0][1] === 0){
                for (let i = 0; i < 4 ;i++){
                    positions[i][1]++
                }
            }else if(positions[0][1] >= 8){
                for (let i = 0; i < 4 ;i++){
                    positions[i][1]-=2
                }
            }
        }else if(istatus === 3){
            if(positions[0][1] <= 1){
                for (let i = 0; i < 4 ;i++){
                    positions[i][1]+=2
                }
            }else if(positions[0][1] === 9){
                for (let i = 0; i < 4 ;i++){
                    positions[i][1]--
                }
            }
        }

        if (istatus === 1) {
            positions[0][1] += 2;
            positions[0][0] += 1;
            positions[1][1] += 1;
            positions[2][0] -= 1;
            positions[3][1] -= 1;
            positions[3][0] -= 2;
        } else if (istatus === 2) {
            positions[0][0] += 2;
            positions[0][1] -= 1;
            positions[1][0] += 1;
            positions[2][1] += 1;
            positions[3][0] -= 1;
            positions[3][1] += 2;
        } else if (istatus === 3) {
            positions[0][0] -= 1;
            positions[0][1] -= 2;
            positions[1][1] -= 1;
            positions[2][0] += 1;
            positions[3][0] += 2;
            positions[3][1] += 1;
        } else if (istatus === 4) {
            positions[0][0] -= 2;
            positions[0][1] += 1;
            positions[1][0] -= 1;
            positions[2][1] -= 1;
            positions[3][0] += 1;
            positions[3][1] -= 2;
            istatus = 0
        }


    }else {

        counter = 0;

        rotateArr = currentTetronimo[0]

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (i === 1 && j === 1) {
                    centerOfPosition = counter;
                }
                if (rotateArr[i][j] === 1) {
                    counter++
                }
            }
        }
        //console.log(positions[centerOfPosition][0] + " " + positions[centerOfPosition][1])

        if (positions[centerOfPosition][1] === 0){

            for (let i = 0; i < 4 ;i++){
                positions[i][1]++
            }

        }else if(positions[centerOfPosition][1] === 9){

            for (let i = 0; i < 4 ;i++){
                positions[i][1]--
            }

        }

        let n = rotateArr.length; //https://code.likeagirl.io/rotate-an-2d-matrix-90-degree-clockwise-without-create-another-array-49209ea8b6e6
        let x = Math.floor(n / 2);
        let y = n - 1;
        for (let i = 0; i < x; i++) {
            for (let j = i; j < y - i; j++) {
                k = rotateArr[i][j];
                rotateArr[i][j] = rotateArr[y - j][i];
                rotateArr[y - j][i] = rotateArr[y - i][y - j];
                rotateArr[y - i][y - j] = rotateArr[j][y - i]
                rotateArr[j][y - i] = k
            }
        }

        for (let i = 0; i < matrix.n; i++) {
            for (let j = 0; j < matrix.m; j++) {
                if (positions[centerOfPosition][0] === i + 1 && positions[centerOfPosition][1] === j + 1) {
                    let pp = 0;

                    for (let k = 0; k < 3; k++) {
                        let matx = i + k;
                        for (let l = 0; l < 3; l++) {
                            if (rotateArr[k][l] === 1) {


                                matrixArr[matx][j + l][1] = 1;
                                positions[pp][0] = i + k;
                                positions[pp][1] = j + l;
                                pp++;
                            }
                        }

                    }
                    i = matrix.n - 1;
                    j = matrix.j - 1;
                }

            }
        }

    }
}
function initNextPiece(){
    let add = 0;
    let anotheradd = 0;
    if(nextTetronimo[0][0].length === 2){
        add++
    }
    if(nextTetronimo[0][0].length === 4){
        anotheradd+=2
    }

    for (let i = 0; i < nextTetronimo[0].length;i++){
        for (let j = 0; j < nextTetronimo[0][0].length;j++) {

                if(nextTetronimo[0][i][j] === 1){
                    nextPieceArr[i+add+anotheradd][j+add].addClass('fullSquare').css({
                        backgroundColor: nextTetronimo[1],
                        borderColor: nextTetronimo[1]
                    })
                }
        }
    }
    /*let counter = 0;
    nextPieceArea.find('div').each(function () {
        //console.log(nextTetronimo)
        //console.log("length: " + nextTetronimo[0].length)
                for(let i = 1; i < nextTetronimo[0].length; i++){
                    for (let j = 0; j < nextTetronimo[0][i].length; j++){
                        if(Math.floor(i+1%counter) === j){

                        }
                        if( nextTetronimo[0][i][j] === 1) {
                            $(this).addClass('nextPSquare')
                            $(this).css({
                                backgroundColor: nextTetronimo[1],
                            });
                            break;
                        }
                    }
                }
                counter++
    })*/
}
function hideFuturePlaceofTetronino(){
    for(let i = 0; i < 4; i++){
        x = droppedPositions[i][0];
        y = droppedPositions[i][1];
        matrixArr[x][y][0].css({
            boxShadow: "inset 0px 0px 0px"
        })
    }
    droppedPositions = [];
}
function drawFuturePlaceOfTetronimo(){
    if (droppedPositions.length !== 0){
        hideFuturePlaceofTetronino()
    }

    for (let i = 0; i < 4; i++){
        let helpArr = []
        helpArr.push(positions[i][0])
        helpArr.push(positions[i][1])
        droppedPositions.push(helpArr)
    }
    let canMoveDown = true
    let bottomOnes = mostBottoms(droppedPositions);



    while(canMoveDown){
        for (let i = 0; i < 4;i++){
            droppedPositions[i][0]++
        }
        let bottomOnes = mostBottoms(droppedPositions)
        if (bottomOnes[0][0] === 23){

            canMoveDown = false
            break;
        }
        for (i in droppedPositions){
            if(matrixArr[droppedPositions[i][0]+1][droppedPositions[i][1]][1] === 2){
                canMoveDown = false;
                break;
            }
        }

    }

    for(let i = 0; i < 4; i++){
        x = droppedPositions[i][0];
        y = droppedPositions[i][1];

        matrixArr[x][y][0].css({
            boxShadow: "inset 0px 0px 10px " + currentTetronimo[1]
        })
    }

}
function drawTetronimo(){
    for(let i = 0; i < currentTetronimo[0].length;i++){
        for(let j = 0; j < currentTetronimo[0][0].length; j++ ){
            if(matrixArr[i][j+4][1] === 2){
                gameArea.hide(); nextPieceArea.hide(); informationArea.hide();
                stopGameSound()
                playGameOverSound()
                GameEnd()
                return
            }
            if(currentTetronimo[0][i][j] === 1){

                matrixArr[i][4 + j][0].removeClass("emptySquare")
                matrixArr[i][4 + j][0].addClass("fullSquare")

                //let boxShadow = "inset 0px 0px 5px"
                matrixArr[i][4 + j][0].css({
                    //boxShadow: boxShadow ,
                    backgroundColor: currentTetronimo[1],
                    borderColor: currentTetronimo[1]
                })
                matrixArr[i][4+j][1] = 1
                positions.push([i,4+j])
            }
        }
    }
    drawFuturePlaceOfTetronimo()

}

function moveTetronimo(e){
    let key = e.key;
    if(key === "ArrowUp" || key === "ArrowDown" || key === "ArrowRight" || key === "ArrowLeft" || e.keyCode === 32){
        e.preventDefault();
        hide()
        if(e.keyCode === 32){
            dropped = true;
            let can = true
            while(can) {
                for (var i = 0; i < 4; i++) {
                    positions[i][0]++
                }
                let bottomOnes = mostBottoms(positions);
                let isUnder = false;
                if(bottomOnes[0][0] === 23){
                    for(i in positions){
                        matrixArr[positions[i][0]][positions[i][1]][1] = 2
                    }
                    can = false
                }
                for (i in positions){
                    if(matrixArr[positions[i][0]+1][positions[i][1]][1] === 2){
                        isUnder = true;
                        break;
                    }
                }
                if(isUnder){
                    for(i in positions){
                        matrixArr[positions[i][0]][positions[i][1]][1] = 2
                    }
                    can = false
                }
            }
            playDropSound()
        }
        if (key === "ArrowUp"){
            if(isIorO !== 'O'){
                rotate();
                drawFuturePlaceOfTetronimo()
            }
        }
        if(key === "ArrowRight"){
            let right = mostRights()

            let rightBool = true;
            for(i in right){
                if(right[i][1] === 9){
                    rightBool = false
                    break;
                }
                if(matrixArr[right[i][0]][right[i][1]+1][1] === 2)
                    rightBool = false
                if(positions[i][1] === 9)
                    rightBool = false
            }
            //let canMove = positions[0][1] < 9 && positions[1][1] < 9 && positions[2][1] < 9 && positions[3][1] < 9 && rightBool
            if(rightBool) {
                for (var i = 3; i > -1; i--) {
                    positions[i][1]++
                }
                drawFuturePlaceOfTetronimo()
            }
        }
        if(key === "ArrowLeft"){
            let left = mostLefts()
            let leftBool = true;
            for(i in left){
                if(left[i][1] === 0){
                    leftBool = false
                    break;
                }

                if(matrixArr[left[i][0]][left[i][1]-1][1] === 2)
                    leftBool = false

            }
            //let canMove = positions[0][1] > 0 && positions[1][1] > 0 && positions[2][1] > 0 && positions[3][1] > 0 && leftBool;
            if(leftBool) {
                for (var i = 0; i < 4; i++) {
                    positions[i][1]--
                }
                drawFuturePlaceOfTetronimo()
            }
        }
        if(key === "ArrowDown"){
            moveDown()
        }
    draw();
    }


    //loggingMatrixArrNumeric()


}

function mostBottoms(position){

    let res = []
    let max = position[0][0];
    for(i in position){
        if(position[i][0] === max){
            res.push(position[i])
        }
        if(max < position[i][0]){
            max = position[i][0];
            res = [];
            res.push(position[i]);
        }

    }
    return res;
}
function mostRights(){
    let res = []
    let max = positions[0][1];

    for(i in positions){

        if(positions[i][1] === max){
            res.push(positions[i])
        }
        if(max < positions[i][1]){
            max = positions[i][1];
            res = [];
            res.push(positions[i]);
        }

    }
    return res;
}
function mostLefts() {

    let res = []
    let min = positions[0][1];
    for(i in positions){
        if(positions[i][1] === min){
            res.push(positions[i])
        }
        if(positions[i][1] < min ){
            min = positions[i][1];
            res = [];
            res.push(positions[i]);
        }

    }
    return res;
}
function isLanded(){
    let bottomOnes = mostBottoms(positions);
    let isUnder = false;
    if(bottomOnes[0][0] === 23){
        for(i in positions){
            matrixArr[positions[i][0]][positions[i][1]][1] = 2
        }
        positions = [];
        if (dropped){
            playDropSound()
            dropped = false
        }else{playHitSound()}
        isIorO = ""
        istatus = 0
        clear();
        currentTetronimo = nextTetronimo;
        nextTetronimo = tetris.nextPiece();
        hideNextPieceArea()
        initNextPiece(nextTetronimo);

        drawTetronimo();
        isCurrentIorO()
        return
    }
    for (i in positions){
        if(matrixArr[positions[i][0]+1][positions[i][1]][1] === 2){
            isUnder = true;
            break;
        }
    }
    if(isUnder){
        for(i in positions){
            matrixArr[positions[i][0]][positions[i][1]][1] = 2
        }
        positions = [];
        isIorO = ""
        istatus = 0
        clear()
        if (dropped){
            playDropSound()
            dropped = false
        }else{playHitSound()}
        currentTetronimo = nextTetronimo;
        nextTetronimo = tetris.nextPiece();
        hideNextPieceArea()
        initNextPiece(nextTetronimo);
        drawTetronimo();
        isCurrentIorO()
    }
}

function addToScore(points){
    score += points* (level+1);
}
function refresScoreAndLevel(){
    scoreArea.html(score);
    levelArea.html("Level: <br>" + level)
}
function moveDown(){
    hide()
    if(positions[0][0] < 23 && positions[1][0] < 24 && positions[2][0] < 23 && positions[3][0] < 23) {
        for (var i = 0; i < 4; i++) {
            positions[i][0]++
        }
    }
    draw();

}
function startGame(){
    $(window).off("keydown")
    initGame()
    gameThemeMusic();

    currentTetronimo = tetris.nextPiece();
    nextTetronimo = tetris.nextPiece();

    initNextPiece(nextTetronimo);

    drawTetronimo()
    isCurrentIorO()
    interValId = setInterval(moveDown,levels[0])

    $(window).on("keydown",moveTetronimo)
}
$(function () {

    initSounds()
    $(window).on("keydown",function (){
        startArea.hide();

        startGame()
    })



})

function fill_toplist() {
    // vegigmegyunk a localStorage mentett elemein es egy uj tombbe pakoljuk. asszociativ tomb
    var data = [];
    for (var i = 1; i < localStorage.length; i++) {
        if(!isNaN(localStorage.getItem(localStorage.key(i)))){
            data[i] = [localStorage.key(i), parseInt(localStorage.getItem(localStorage.key(i)))];
        }

    }
    // csokkeno sorrendbe rendezzuk az elemeket az elert pontszam alapjan
    data.sort(function (a, b) {
        return b[1] - a[1];
    });
    // a 10 legtobb pontot elert jatekost jelezzuk ki a listan
    for (let act_data of data.keys()) {
        if (act_data < 10) {
            $('#list').append(data[act_data][0] + ' - ' + data[act_data][1] + '<br><hr>');
        }
    }
}

//  HARD DROP DONE
// TODO: Drawing where tetronimo is gonna drop
// TODO: difficults
// TODO: find a clever way to save score's and let the user give names to the scoreBoard
// TODO: MUSIC (MAYBE A COLLECTION OF MUSIC)