

import { PlayerShip } from "./Ship.js"
import { Asteroid } from "./Asteroid.js"
import { Bullet } from "./Bullet.js"
import { PirateShip } from "./pirateShip.js"

class GameManager {
    constructor() {
        console.log("Gamemaneger created.")
        this.player = new PlayerShip()
        this.asteroids = []
        this.bullets = []
        this.pirates = []
        this.pirateBullets = []
        this.spawnPirateCtr = 0
        this.shipShooting = false
        this.pirateIsShooting = false
        this.shootSoundPath = new URL("../sounds/bullet-shot.wav", import.meta.url).href
        this.exploPath = new URL("../sounds/roid-explode.mp3", import.meta.url).href
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
                this.goToGameOver("won")
            }
        }, 800)
    }

    goToGameOver(gameStatus) {

        const percentage = (this.score.destroyedRoids/this.score.totalRoids)*100

        this.playExploSound()
        this.playExploSound()

        setTimeout(() => {
            localStorage.setItem("gameStatus", gameStatus);
            localStorage.setItem("totalRoids", this.score.totalRoids);
            localStorage.setItem("shotRoids", this.score.destroyedRoids);

            console.log("Game over. Game over. Game over. Game over.")
            location.href = "../html/gameover.html"  
        }, 8500);        
    }

    spawObjects() {
        // spawn new asteroids        

        let testLimit = 0
        let timerId = setInterval(() => {

            // create a new asteroid, position it randomly
            const newAsteroid = new Asteroid()
            this.asteroids.push(newAsteroid)    
            this.score.totalRoids++

            // every x time a pirate ship shall spawn
            this.spawnPirateCtr++
            if (this.spawnPirateCtr%3 === 0){
                const newPirate = new PirateShip()
                this.pirates.push(newPirate)
            }

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
            } else {
                // if pirate is shooting
                if (this.pirates.length > 0) {
                    this.pirateIsShooting = true

                    // here the pirate bullets
                }
                else {
                    this.pirateIsShooting = false
                }
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
                        this.goToGameOver("destroyed")
                    }
                }
            });        
            
            // handle the pirates: move and shoot
            this.pirates.forEach( (pirate) => {
                // let the asteroid fall down

                if (pirate != null) {
                    pirate.moveDown()
                    pirate.shoot()
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
    } else if (e.code === "Space") {
        console.log("Ship is shooting.")
        gameManager.setShooting()
    }
})

// if page left, stop the game
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        location.href = "../html/gameover.html"
    }
})
