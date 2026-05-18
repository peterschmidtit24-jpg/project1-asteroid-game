console.log("Asteroid class")

export class Asteroid {
    constructor() {
        this.width = 10
        this.height = 10
        this.positionX = Math.floor(Math.random() * (100 - this.width + 1)) // random number between 0 and (100 - width)
        this.positionY = 90

        this.asteroidElm = null

        this.createDomElement()
        this.updateUI()
    }

    createDomElement() {
        // step1: create the element with document.createElement()
        this.asteroidElm = document.createElement("div")

        // step2: add content or modify (ex. innerText, innerHTML, src...)
        this.asteroidElm.className = "asteroid"

        const asteroidImg = document.createElement("img")
        asteroidImg.setAttribute("src", "./images/asteroid.png")
        asteroidImg.setAttribute("alt", "asteroid 1")

        this.asteroidElm.appendChild(asteroidImg)
        
        //step3: append to the dom: `parentElm.appendChild()`
        document.body.appendChild(this.asteroidElm)

    }


    deleteRoid() {
        this.asteroidElm.remove()
    }

    updateUI() {
        this.asteroidElm.style.left = this.positionX + "vw"
        this.asteroidElm.style.bottom = this.positionY + "vh"
        this.asteroidElm.style.width = this.width + "vw"
        this.asteroidElm.style.height = this.height + "vh"
    }

    moveDown() {
        const asteroidHeight = parseInt(this.asteroidElm.style.height)

        if (this.positionY >= -asteroidHeight) {
            this.positionY--
            // asteroid should dissapear here
            this.updateUI()
        } else {
            // this.asteroidElm.remove()
            this.deleteRoid()
        }        
    }

}