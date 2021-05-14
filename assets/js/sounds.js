var music,gameOver,clearSound,dropSound,hitSound;

function initSounds(){
    music = document.createElement("audio")
    document.body.appendChild(audio);
    music.src = "assets/sounds/theme.mp3"
    music.volume = 0.05

    gameOverSound = document.createElement("audio")
    document.body.appendChild(gameOverSound);
    gameOverSound.src = "assets/sounds/gameOver.mp3"
    gameOverSound.volume = 0.3

    clearSound = document.createElement("audio")
    document.body.appendChild(clearSound);
    clearSound.src = "assets/sounds/clear.wav"
    clearSound.volume = 0.5

    dropSound = document.createElement("audio")
    document.body.appendChild(dropSound);
    dropSound.src = "assets/sounds/drop.wav"
    dropSound.volume = 1

    hitSound = document.createElement("audio")
    document.body.appendChild(hitSound);
    hitSound.src = "assets/sounds/hit.wav"
    hitSound.volume = 0.5
}
function gameThemeMusic() {
    music.play()
}
function stopGameSound(){
    music.pause();
}
function playGameOverSound(){
    gameOverSound.play();
    music.pause();
}
function playClearSound(){

    clearSound.play();
}
function playDropSound(){

    dropSound.play();
}
function playHitSound(){

    hitSound.play();
}
