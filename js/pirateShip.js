
console.log("Pirate ship shooting.")

// create and handle pirate ships like done with asteroids
export class PirateShip {
    constructor() {
        this.width = 10
        this.height = 10
        this.positionX = Math.floor(Math.random() * (100 - this.width + 1)) // random number between 0 and (100 - width)
        this.positionY = 90

        this.pirateElm = null

        this.createDomElement()
        this.updateUI()
    }

    createDomElement() {
        // step1: create the element with document.createElement()
        this.pirateElm = document.createElement("div")

        // step2: add content or modify (ex. innerText, innerHTML, src...)
        this.pirateElm.className = "pirateShip"

        const pirateImg = document.createElement("img")
        pirateImg.setAttribute("src", "../images/pirateShip.png")
        pirateImg.setAttribute("alt", "pirateship 1")

        this.pirateElm.appendChild(pirateImg)
        
        //step3: append to the dom: `parentElm.appendChild()`
        document.body.appendChild(this.pirateElm)

    }    

    updateUI() {
        this.pirateElm.style.left = this.positionX + "vw"
        this.pirateElm.style.bottom = this.positionY + "vh"
        this.pirateElm.style.width = this.width + "vw"
        this.pirateElm.style.height = this.height + "vh"
    }

    moveLeft() {
        if (this.positionX > 0) {
            this.positionX--
            // off for now
            // this.updateUI()
        }
    }

    moveRight() {
        if (this.positionX < 100 - this.width) {
            this.positionX++
            // off for now
            // this.updateUI()
        }
    }

    moveDown() {
        const pirateHeight = parseInt(this.pirateElm.style.height)

        if (this.positionY >= -pirateHeight) {
            this.positionY--
            // asteroid should dissapear here
            this.updateUI()
        } else {
            // this.asteroidElm.remove()
            this.deleteShip()
        }    
    }

    shoot() {
        console.log("Pirate ship shall shoot!")
    }

    deleteShip() {
        this.pirateElm.remove()
    }

}