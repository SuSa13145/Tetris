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
    if(isLanded()){
        for(i in positions){
            x = positions[i][0];
            y = positions[i][1];

            matrixArr[x][y][1] = 2
        }
        landTetronimo()
    }
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

                GameEnd()
                return
            }
            if(currentTetronimo[0][i][j] === 1){
                matrixArr[i][4 + j][0].removeClass("emptySquare")
                matrixArr[i][4 + j][0].addClass("fullSquare")
                matrixArr[i][4 + j][0].css({
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
function drawNextPiece(){
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
            addToScore(50)
        }else if(rows.length === 2){
            addToScore(150)
        }else if (rows.length === 3){
            addToScore(250)
        }else{
            addToScore(400)
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
            ijarr = [i,j]
            if(matrixArr[i][j][1] === 2){
                ret +=matrixArr[i][j][1] ;
            }else{
                ret += "0";
            }


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
function moveTetronimo(e){
    let key = e.key;
    if(key === "ArrowUp" || key === "ArrowDown" || key === "ArrowRight" || key === "ArrowLeft" || e.keyCode === 32){
        e.preventDefault();

        hide()
        if(e.keyCode === 32){
            positions = []
            for(let i in droppedPositions){
                positions.push(droppedPositions[i])
            }
            playDropSound()
        }
        if (key === "ArrowUp"){
            if(isIorO !== 'O'){
                rotate();
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
            if(rightBool) {
                for (var i = 3; i > -1; i--) {
                    positions[i][1]++
                }
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
            if(leftBool) {
                for (var i = 0; i < 4; i++) {
                    positions[i][1]--
                }
            }
        }
        if(key === "ArrowDown"){
            moveDown()
        }
        if(key !== "ArrowDown" && e.keyCode !== 32){
            drawFuturePlaceOfTetronimo()
        }
    draw();
    }
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
function isLanded(){
    let bottomOnes = mostBottoms(positions);
    if(bottomOnes[0][0] === 23){
        for(i in positions){
            matrixArr[positions[i][0]][positions[i][1]][1] = 2
        }
        return true
    }
    for (i in positions){
        if(matrixArr[positions[i][0]+1][positions[i][1]][1] === 2){
            return true;

        }
    }
    return false;
}
function rotate(){
    let x,y
    if(isIorO === 'I') {//tudom, szebben is meglehetett volna csinálni.
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
        }//checkeljük hogy elforgatható-e az I tetronimó hogy ne forogjon ki a pályából
        for (let i in positions){
            x = positions[i][0]
            y = positions[i][1]

            if (matrixArr[x][y-1][1] === 2 || matrixArr[x][y+1][1] === 2){
                return
            }
        }//checkeljük hogy ne forogjon bele már lévő tetronimoba
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
        return
    }

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
    }//megkeressük hogy melyik az a középső elem aminek a helye nem fog változni
    x = positions[centerOfPosition][0]
    y = positions[centerOfPosition][1]

    if (y === 0 || matrixArr[x][y-1][1] === 2){
        for (let i = 0; i < 4 ;i++){
            positions[i][1]++
        }
    }else if(y === 9 || matrixArr[x][y+1][1] === 2){
        for (let i = 0; i < 4 ;i++){
            positions[i][1]--
        }
    } //check hogy ne forogjon ki a pályából vagy ne forogjanak egymásba

    let n = rotateArr.length; //https://code.likeagirl.io/rotate-an-2d-matrix-90-degree-clockwise-without-create-another-array-49209ea8b6e6
    x = Math.floor(n / 2);
    y = n - 1;
    for (let i = 0; i < x; i++) {
        for (let j = i; j < y - i; j++) {
            k = rotateArr[i][j];
            rotateArr[i][j] = rotateArr[y - j][i];
            rotateArr[y - j][i] = rotateArr[y - i][y - j];
            rotateArr[y - i][y - j] = rotateArr[j][y - i]
            rotateArr[j][y - i] = k
        }
    }

    for (let i = 0; i <24; i++) {
        for (let j = 0; j < 10; j++) {
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
                i = 24 - 1;
                j = 10 - 1;
            }

        }
    }
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
function addToScore(points){
    score += points* (level+1);
}
function refresScoreAndLevel(){
    scoreArea.html(score);
    levelArea.html("Level: <br>" + level)
}
function addToLinesAndLevels(clearedlines){
    lines += clearedlines;

    if(lines >= 10){
        lines-=10
        level++;
        clearInterval(interValId)
        interValId = setInterval(moveDown,levels[level])
    }
    refresScoreAndLevel()
}
function startGame(){
    dropNewTetronimo()
    $(window).on("keydown",moveTetronimo)
    interValId = setInterval(moveDown,levels[0])
}
function GameEnd(){
    gameArea.hide(); nextPieceArea.hide(); informationArea.hide();
    stopGameSound()
    playGameOverSound()
    topListArea = $('<div id="top_list">\n<p id="list"></p>\n</div>')
    topListArea.attr('id','top_list')
    topListArea.appendTo('body')
    var person = prompt("Kérnénk egy nevet:", "tetris");
    localStorage.setItem(person, Number(score));
    toplist();
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
function dropNewTetronimo() { // Körnek az elindítása (Tetronimo elhelyezése elindítása)
    currentTetronimo = nextTetronimo;
    nextTetronimo = tetris.nextPiece();
    drawNextPiece();
    drawTetronimo()
    isCurrentIorO()
}
function landTetronimo(){
    positions = [];
    isIorO = ""
    istatus = 0
    clear()
    if (dropped){
        playDropSound()
        dropped = false
    }else{
        playHitSound()
    }
    hideNextPieceArea()
    dropNewTetronimo()
}

$(function () {
    initStartScreen()
    tetris = new Tetris()
    currentTetronimo = tetris.nextPiece();
    nextTetronimo = tetris.nextPiece();
    $(window).on("keydown",function (){
        $(window).off("keydown");
        initGame();
        startArea.hide();
        initSounds()
        gameThemeMusic();
        startGame();
    })
})
function toplist() {
    var data = [];
    for (var i = 1; i < localStorage.length; i++) {
        if(!isNaN(localStorage.getItem(localStorage.key(i)))){
            data[i] = [localStorage.key(i), parseInt(localStorage.getItem(localStorage.key(i)))];
        }
    }
    data.sort(function (a, b) {
        return b[1] - a[1];
    });
    for (let act_data of data.keys()) {
        if (act_data < 10) {
            $('#list').append(data[act_data][0] + ' - ' + data[act_data][1] + '<br><hr>');
        }
    }
}