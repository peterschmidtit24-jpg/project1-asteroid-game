

import { PlayerShip } from "./Ship.js"
import { Asteroid } from "./Asteroid.js"
import { Bullet } from "./Bullet.js"

class GameManager {
    constructor() {
        console.log("Gamemaneger created.")
        this.player = new PlayerShip()
        this.asteroids = []
        this.bullets = []
        this.shipShooting = false
        this.shootSoundPath = "./sounds/bullet-shot.wav"
        this.exploPath = "./sounds/roid-explode.mp3"
        this.score = {
            totalRoids: 0, 
            destroyedRoids: 0
        }
    }

    setShooting() {
        this.shipShooting = true
    }
    
    playShootSound() {
        const shootSound = new Audio(this.shootSoundPath)
        shootSound.volume = 0.45
        shootSound.play()
    }

    playExploSound() {
        const shootSound = new Audio(this.exploPath)
        shootSound.volume = 0.45
        shootSound.play()
    }

    startNextLevel() {
        console.log("Now starting the next level.")

        let testLimit2 = 0
        let timerId = setInterval(() => {
            const newAsteroid = new Asteroid()
            this.asteroids.push(newAsteroid)

            this.score.totalRoids++
            testLimit2++
            console.log("testLimit2 = ", testLimit2)

            if (testLimit2 > 10) {
                console.log("Total asteroids = ", this.score.totalRoids)

                clearInterval(timerId)
                this.goToGameOver()
            }
        }, 800)
    }

    goToGameOver() {
        console.log("Total asteroids over = ", this.score.totalRoids)
        console.log("Total destroyed roids over = ", this.score.destroyedRoids)

        const percentage = (this.score.destroyedRoids/this.score.totalRoids)*100
        console.log("Total destroyed roids % = ", percentage.toFixed(1))

        this.playExploSound()
        this.playExploSound()

        setTimeout(() => {
            console.log("Game over. Game over. Game over. Game over.")
            location.href = "./html/gameover.html"  
        }, 10500);        
    }

    spawObjects() {
        // spawn new asteroids

        let testLimit = 0
        let timerId = setInterval(() => {

            // create a new asteroid, position it randomly
            const newAsteroid = new Asteroid()
            this.asteroids.push(newAsteroid)    
            this.score.totalRoids++

            testLimit++
            console.log("testLimit = ", testLimit)
            // limit the number of asteroids (for testting for now)
            if (testLimit > 5) {
                console.log("Switching to next level")
                this.startNextLevel()

                clearInterval(timerId)
            }
        }, 2000);

        // spawn bullets if space pressed
        let timerId2 = setInterval(() => {

            if (this.shipShooting) {
                // create a new bullet
                const newBullet = new Bullet(this.player)
                this.bullets.push(newBullet)   
                this.playShootSound() 

                this.shipShooting = false
            }
            
            // clearInterval(timerId)
        }, 600);       

    }

    moveAndCheckCollisions() {
        setInterval(() => {
            this.asteroids.forEach( (roid) => {
                // let the asteroid fall down

                if (roid != null) {
                    roid.moveDown()

                    // check if the ship collides with other object
                    if (this.player.isCollidingWith(roid)) {
                        this.player.deleteShip()
                        this.goToGameOver()
                    }
                }
            });         
            
            // let the bullets shoot up
            this.bullets.forEach((bullet) => {
                bullet.moveUp()

                // if it's colliding with any asteroid
                // preselect all the astroids which are on it's trajectory

                // collider numer returned: -1 = none, asteroid index number else
                const roidCollider = bullet.isCollidingWith(this.asteroids)

                // if number >= 0 destroy the colliding asteroid
                if (roidCollider > -1) {
                    if (this.asteroids[roidCollider].asteroidElm != null) {                        
                        this.score.destroyedRoids++

                        this.asteroids[roidCollider].deleteRoid()
                        // remove the roid from the list too
                        this.asteroids.splice(roidCollider, 1)
                        this.playExploSound()
                    }   
                }
            });
            
        }, 50);
    }

    startGameLoop() {
        console.log("Start the game loop")

        this.spawObjects()
        this.moveAndCheckCollisions()
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
    } else if (e.code === "Space") {
        console.log("Ship is shooting.")
        gameManager.setShooting()
    }
})

// if page left, stop the game
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        location.href = "./html/gameover.html"
    }
})