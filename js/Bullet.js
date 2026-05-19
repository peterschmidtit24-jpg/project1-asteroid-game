console.log("Bullet Class")

export class Bullet {
    constructor(playerShip) {
        this.playerShip = playerShip

        this.width = 0.5
        this.height = 0.9
        this.positionX = this.playerShip.positionX // 20 // position of the bullet x
        this.positionY = this.playerShip.positionY //20 // position of the bullet y

        this.bulletElm = null

        this.createDomElement()
        this.updateUI()
    }

    createDomElement() {
        // step1: create the element with document.createElement()
        this.bulletElm = document.createElement("div")

        // step2: add content or modify (ex. innerText, innerHTML, src...)
        this.bulletElm.className = "bullet"

        const bulletImg = document.createElement("img")
        bulletImg.setAttribute("src", "../images/Bullet.png")
        bulletImg.setAttribute("alt", "bullet object")

        this.bulletElm.appendChild(bulletImg)
        
        //step3: append to the dom: `parentElm.appendChild()`
        document.body.appendChild(this.bulletElm)
    }

    updateUI() {
        this.bulletElm.style.left = this.positionX + "vw"
        this.bulletElm.style.bottom = this.positionY + "vh"
        this.bulletElm.style.width = this.width + "vw"
        this.bulletElm.style.height = this.height + "vh"    
    }

    moveUp() {
        //const asteroidHeight = parseInt(this.asteroidElm.style.height)

        this.positionY++
        this.updateUI()
    }

    isCollidingWith(objects) {
        const bulletLeft = this.positionX
        const bulletRight = this.positionX + 2 // + this.width
        const bulletBottom = this.positionY
        const bulletTop = this.positionY + 2// + this.height


        let colliderRoid = -1
        objects.forEach((roid, i) => {
            const objectLeft = roid.positionX
            const objectRight = roid.positionX + roid.width
            const objectBottom = roid.positionY
            const objectTop = roid.positionY + roid.height

            if (
                bulletLeft < objectRight &&
                bulletRight > objectLeft &&
                bulletBottom < objectTop &&
                bulletTop > objectBottom
            ) {
                colliderRoid = i // objects[0]
            }
        })

        return colliderRoid
    }     

}