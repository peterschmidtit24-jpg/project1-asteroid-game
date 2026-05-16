

import { PlayerShip } from "./Ship.js"
import { Asteroid } from "./Asteroid.js"

class GameManager {
    constructor() {
        console.log("Gamemaneger created.")
        this.player = new PlayerShip()
    }

    startGameLoop() {
        console.log("Start the game loop")
        this.newAsteroid = new Asteroid()
    }
}


const gameManager = new GameManager()
gameManager.startGameLoop()

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
        gameManager.player.moveLeft()
    } else if (e.code === "ArrowRight") {
        gameManager.player.moveRight()
        // test test
        gameManager.newAsteroid.moveDown()
    }
})