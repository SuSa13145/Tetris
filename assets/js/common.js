let matrixArr = [], positions = [], rotateArr = [], nextPieceArr= [], droppedPositions = [];
let centerOfPosition;
let lines = 0;
let isIorO;
let background, gameArea, nextPieceArea, scoreArea,levelArea, informationArea, topListArea;
let square, squareSize = 25;
let istatus = 0;
let score = 0;
let interValId;
let level = 0, levels = [725,670,620,580,530,490,440,400,370,340,300,280,270,250,220];
let tetris, nextTetronimo, currentTetronimo ;
let dropped = false;