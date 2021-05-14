function drawStartArea(){
    startArea = $('<div></div>')
    startArea.addClass('infromationTable')

    startArea.html("Játék elindításához kérem nyomja le az <br> (Entert) <br> (vagy bármit)")
    startArea.appendTo('body')
}
function drawBackGround(){
    background = $('<div></div>');
    background.attr('id','gameContainer');
    background.css({
        height : matrix.n * squareSize * 1.5,
        width : matrix.m * squareSize * 2.25
    })
    background.appendTo('body');
}
function drawGameAndInformationsArea() {
    gameArea = $('<div></div>')
    gameArea.attr('id','gameArea')
    gameArea.css({
        top: ( matrix.n * squareSize * 1.5)* 0.075,
        right: squareSize * 7,
        height: matrix.n * squareSize,
        width: matrix.m * squareSize
    })
    gameArea.appendTo(background);

    informationArea = $('<div></div>')
    informationArea.attr('id','informationArea')
    informationArea.css({
        top: ( matrix.n * squareSize * 1.5)* 0.075,
        right: 0,
        height: matrix.n * squareSize,
        width: squareSize * 6
    })
    informationArea.appendTo(background);


}
function drawNextPieceArea() {
    nextPieceArea = $('<div></div>')
    nextPieceArea.attr('id', 'nextPieceArea')

    nextPieceArea.css({

        height: squareSize* 4,
        width: squareSize* 4
    })
    nextPieceArea.appendTo(informationArea);
}
function drawScoreAndLevelArea() {
    scoreArea = $('<div></div>')
    scoreArea.attr('id', 'scoreArea')
    scoreArea.css({

        height: 60,
        width: 120
    })
    scoreArea.html(score)
    scoreArea.appendTo(informationArea)

    levelArea = $('<div></div>')
    levelArea.attr('id', 'levelArea')
    levelArea.css({

        height: 70,
        width: 120
    })
    levelArea.html("Level: <br>" + level)
    levelArea.appendTo(informationArea)
}
function drawMatrixes(){
    for(let i = 0; i < matrix.n; i++){
        let array = [];
        for(let j = 0; j < matrix.m;j++) {

            square = $('<div></div>')
            square.addClass('emptySquare');
            square.appendTo(gameArea);
            square.css({
                width: squareSize,
                height: squareSize,
                top: i * squareSize ,
                left: j * squareSize,
            })
            array.push([square,0])

        }
        matrixArr.push(array)

    }

    for(let i = 0; i < 4; i++){
        let array = [];
        for (let j = 1; j < 5; j++){
            square = $('<div></div>')
            square.addClass("nextPSquare")
            square.css({
                width: squareSize,
                height: squareSize,
                top: i * squareSize +5,
                left: j * squareSize,

            })
            array.push(square)
            square.appendTo(nextPieceArea);
        }
        nextPieceArr.push(array)
    }
}
function drawGameOver() {
    gameOver = $('<div></div>')
    gameOver.addClass('infromationTable')
    gameOver.html("<br> A játék végetért. <br> Folytatáshoz nyomjon (szóköz/space)-t <br> Pontszáma: " + score)
    gameOver.appendTo(background)

}
function initGame(){
    drawBackGround()
    drawStartArea()
    drawGameAndInformationsArea()
    drawNextPieceArea()
    drawScoreAndLevelArea();
    drawMatrixes();
} //minden draw itt van meghívva.(kivéve a draw();)