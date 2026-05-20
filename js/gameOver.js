
console.log("Gameover screen.")

let shotAsteroids = 0
let totalAsteroids = 0

function setScores() {

    // adjust the html elements to the data    
    const gameStatus = document.getElementById("game-status")
    const shutRoids  = document.getElementById("shut-roids")
    const totalRoids  = document.getElementById("total-roids")
    const percentage  = document.getElementById("percentage")

    // get the transmitted data from the main page
    const savedStatusDt = localStorage.getItem("gameStatus");
    const totalRoidsDt = localStorage.getItem("totalRoids");
    const shotRoidsDt = localStorage.getItem("shotRoids");

    if (savedStatusDt === "won") {
        gameStatus.innerText = `You won. Your ship survided !`
    } else {
        gameStatus.innerText = `You lost. Your ship is destroyed !`
    }

    const calcPercentage = (shotRoidsDt/totalRoidsDt)*100

    /*
    shutRoids.innerText  = `Harvested asteroids ..... ${shotRoidsDt}` 
    totalRoids.innerText = `Total asteroids ........ ${totalRoidsDt}` 
    percentage.innerText = `Success percentage is .. ${calcPercentage.toFixed(1)}%`
    */
   
    shutRoids.innerHTML = `<span>Harvested asteroids</span><span>${shotRoidsDt}</span>`;
    totalRoids.innerHTML = `<span>Total asteroids</span><span>${totalRoidsDt}</span>`;
    percentage.innerHTML = `<span>Success percentage</span><span>${calcPercentage.toFixed(1)}%</span>`;
}

setScores()
