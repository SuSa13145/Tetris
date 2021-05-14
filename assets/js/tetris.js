class Tetris {
    constructor() {
        this._tetrominos = [
            [[1], [1],[1],[1]], //I [[1,0], [1,0],[1,0],[1,0]]
            [[1,0,0], [1,1,1],[0,0,0]], //J
            [[0,0,1], [1,1,1],[0,0,0]], //L
            [[1,1], [1,1]], //O
            [[0,1,1], [1,1,0],[0,0,0]], //S
            [[0,1,0], [1,1,1],[0,0,0]], //T
            [[1,1,0], [0,1,1],[0,0,0]] //Z
        ]
        this._colors = [
            "#f45b5b","#90ed7d","#3634cf","#8a2be2","#fdf06d", "#cfd2d1", "#DE6709"
        ]
    };
    getTetronimo(index){
        return this._tetrominos[index];
    }
    getTetrominosName(index){
        switch(index) {
            case 0:
                return 'I';
            case 1:
                return 'J'
            case 2:
                return 'L'
            case 3:
                return 'O'
            case 4:
                return 'S'
            case 5:
                return 'T'
            case 6:
                return 'Z'
            default:
                return "something went wron in getTetrominosName()";
        }
    }
    nextPiece(){
        var rand = Math.floor(Math.random() * 7)
        return [this.getTetronimo(rand),this._colors[rand]];
    }
}