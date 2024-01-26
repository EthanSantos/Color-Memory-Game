const tilesContainer = document.querySelector(".tiles")
const colors = ["aqua", "aquamarine", "crimson", "blue", "dodgerblue", "gold", "greenyellow", "teal"] // array of colors
const colorsPickList = [...colors, ...colors] // array of each color twice
const tileCount = colorsPickList.length

// Game state
let revealedCount = 0
let activeTile = null // tile that user just clicked on
let awaitingEndOfMove = false

function createTile(color){
    const element = document.createElement("div")

    element.classList.add("tile")
    element.setAttribute("data-color", color)
    element.setAttribute("data-revealed", "false")

    element.addEventListener("click", () => {
        const revealed = element.getAttribute("data-revealed")
        if (awaitingEndOfMove || revealed === "true" || element == activeTile){
            return
        }

        element.style.backgroundColor = color

        if (!activeTile){
            activeTile = element
            return
        }

        const colorToMatch = activeTile.getAttribute("data-color")

        if (colorToMatch === color){

            element.setAttribute("data-revealed", "true")
            activeTile.setAttribute("data-revealed", "true")
            
            activeTile = null
            awaitingEndOfMove = false
            revealedCount += 2

            if (revealedCount === tileCount){
                alert("You win! Refresh to play again.")
            }

            return
        }

        // not awaitingEndOfMove and there is an activeTile

        awaitingEndOfMove = true
        
        setTimeout(() => {
            activeTile.style.backgroundColor = null
            element.style.backgroundColor = null

            awaitingEndOfMove = false
            activeTile = null
        }, 1000)

    })

    return element
}

// Build up tiles

function createBoard(){
    for (let i = 0; i < tileCount; i++){
        const randIndex = Math.floor(Math.random() * colorsPickList.length)
        const color = colorsPickList[randIndex]
        const tile = createTile(color)

        colorsPickList.splice(randIndex, 1) // remove chosen color from array
        tilesContainer.appendChild(tile) // add tiles to tilesContainer
    }
}

createBoard()