
console.log("Player Ship class")

export class PlayerShip {
    constructor() {
        this.playerShip = document.getElementById("playerShip")
        this.playerShipImg = this.playerShip.querySelector("img")

        const shipWidthInVw = Math.round((this.playerShipImg.offsetWidth / window.innerWidth) * 100)
        this.width = shipWidthInVw
        
        this.height = 10
        this.positionX = 50 - this.width / 2
        this.positionY = 5

        this.updateUI()
    }

    updateUI() {
        this.playerShip.style.left = this.positionX + "vw"
        this.playerShip.style.bottom = this.positionY + "vh"
        this.playerShip.style.width = this.width + "vw"
        this.playerShip.style.height = this.height + "vh"
    }

    moveLeft() {
        if (this.positionX > 0) {
            this.positionX--
            this.updateUI()
        }
    }

    moveRight() {
        if (this.positionX < 100 - this.width) {
            this.positionX++
            this.updateUI()
        }
    }

    deleteShip() {
        this.playerShip.remove()
    }

    isCollidingWith(object) {
        const shipLeft = this.positionX
        const shipRight = this.positionX + this.width
        const shipBottom = this.positionY
        const shipTop = this.positionY + this.height

        const objectLeft = object.positionX
        const objectRight = object.positionX + object.width
        const objectBottom = object.positionY
        const objectTop = object.positionY + object.height

        return (
            shipLeft < objectRight &&
            shipRight > objectLeft &&
            shipBottom < objectTop &&
            shipTop > objectBottom
        )
    }
}