
const grid = document.querySelector(".grid");
const DEFAULT_SIZE = 22;
const BACKGROUND_GRIDCOLOR = "white";

const clearButton = document.querySelector("#clearAll");
clearButton.addEventListener("click", ClearGrid);
const border = 1;
let size = grid.clientWidth /DEFAULT_SIZE;
//Grid Creation
for (let i = 0; i < (DEFAULT_SIZE * DEFAULT_SIZE); i++) {

    const div = document.createElement("div");
    div.classList.add("cell");
    
    div.addEventListener("mousedown", Paint);
    div.addEventListener("mouseenter", Paint);
    //let size = 100 / DEFAULT_SIZE;
    
    div.style.flex = `1 0 ${size}px`;
    div.style.background = BACKGROUND_GRIDCOLOR;
    div.style.border = `${border}px solid black`;
    div.style.maxHeight= size;

    grid.appendChild(div);
}


/* FUNCTIONS */

//What happen when you Paint
function Paint(e) {
    e.preventDefault();
    if (e.buttons == 1) {
        e.target.style.background = "black";
        return;
    }
    else;//do nothing?
}

function ClearGrid() {
    let cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.style.background = "white";
    });
    return;
}