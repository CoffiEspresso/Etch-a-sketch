
const grid = document.querySelector(".grid");
const DEFAULT_SIZE = 16;
const BACKGROUND_GRIDCOLOR = "white";



const sider = document.querySelector("#slider");
slider.addEventListener('input', RedrawGrid);

document.querySelector("#gridLines").addEventListener("click", ToggleLines);

const clearButton = document.querySelector("#clearAll");
clearButton.addEventListener("click", ClearGrid);

let cells;
let border = 1;
let colorType = "pen"; //can get only: pen, eraser, rainbow, or a color

document.querySelector("#eraser").addEventListener("click", (e)=>{colorType = e.target.id});
document.querySelector("#rainbow").addEventListener("click", (e)=>{colorType = e.target.id});
document.querySelector("#favcolor").addEventListener("input", (e)=>{colorType = e.target.value});



//Grid Creation
DrawGrid(DEFAULT_SIZE);

function DrawGrid(dim){    

    let cellSize = grid.clientWidth /dim;
    
    for (let i = 0; i < (dim * dim); i++) {
        
        const div = document.createElement("div");
        div.classList.add("cell");
        
        div.addEventListener("mousedown", Paint);
        div.addEventListener("mouseenter", Paint);
        
        div.style.flex = `1 0 ${cellSize}px`;
        div.style.background = BACKGROUND_GRIDCOLOR;
        
        div.classList.add("gridBorder");
     
        div.style.maxHeight= cellSize;
        
        grid.appendChild(div);
    }
     cells = document.querySelectorAll(".cell");

}
    

/* FUNCTIONS */

//What happen when you Paint
function Paint(e) {
    let color;
    switch(colorType){
        case "pen": color = "black"; break;
        case "eraser": color = BACKGROUND_GRIDCOLOR; break;
        case "rainbow": color = "rgb(" + Math.floor(Math.random() * 255)
                                    + "," + Math.floor(Math.random() * 255) + ","
                                    + Math.floor(Math.random() * 255) + ")";
                                    break;
        default: color = colorType; break;
    }

    e.preventDefault();
    if (e.buttons == 1) {
        e.target.style.background = color ;
        return;
    }
    else;//do nothing?
}

function ClearGrid() {
    cells.forEach(cell => {
        cell.style.background = BACKGROUND_GRIDCOLOR;
    });
    return;
}

function RedrawGrid(e){  
    cells.forEach(cell => {
        cell.remove();
    });

    DrawGrid(parseInt(slider.value));
}

function ToggleLines(e){
    cells.forEach(cell => {
        cell.classList.toggle("gridBorder");
    });
}