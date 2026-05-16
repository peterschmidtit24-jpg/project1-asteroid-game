

import { PlayerShip } from "./Ship.js"
import { Asteroid } from "./Asteroid.js"

class GameManager {
    constructor() {
        console.log("Gamemaneger created.")
        this.player = new PlayerShip()
        this.asteroids = []
    }

    startGameLoop() {
        console.log("Start the game loop")
        //this.newAsteroid = new Asteroid()

        // spawn new asteroids
        let testLimit = 0
        let timerId = setInterval(() => {
            // create a new asteroid, position it randomly
            const newAsteroid = new Asteroid()
            this.asteroids.push(newAsteroid)    
            
            testLimit++
            console.log("testLimit = ", testLimit)
            if (testLimit > 20) {
                clearInterval(timerId)
            }
        }, 3000);

        // let the asteroid fall down
        setInterval(() => {
            this.asteroids.forEach( (roid) => {
                roid.moveDown()
            });    
        }, 50);


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
        // gameManager.newAsteroid.moveDown()
    }
})