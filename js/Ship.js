
console.log("Player Ship class")

export class PlayerShip {
    constructor() {
        this.playerShip = document.getElementById("playerShip")
        this.playerShipImg = this.playerShip.querySelector("img")

        const shipWidthInVw = Math.round((this.playerShipImg.offsetWidth / window.innerWidth) * 100)
        this.width = shipWidthInVw
        
        this.height = 10
        this.positionX = 0
        this.positionY = 5

        this.updateUI()
    }

        updateUI() {
        playerShip.style.left = this.positionX + "vw"
        playerShip.style.bottom = this.positionY + "vh"
        playerShip.style.width = this.width + "vw"
        playerShip.style.height = this.height + "vh"
    }
    moveLeft() {
        if (this.positionX > 0) {
            this.positionX--
            this.updateUI()
        }
    }
    moveRight() {
        console.log("this.width", this.width)
        
        if (this.positionX < 100 - this.width) {
            this.positionX++
            this.updateUI()
        }
    }
}