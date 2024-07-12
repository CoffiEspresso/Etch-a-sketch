
const grid = document.querySelector(".grid");
const DEFAULT_SIZE = 16;
const BACKGROUND_GRIDCOLOR = "white";



const sider = document.querySelector("#slider");
slider.addEventListener('input', RedrawGrid);

//document.querySelector("#gridLines").addEventListener("click", ToggleLines);

const clearButton = document.querySelector("#clearAll");
clearButton.addEventListener("click", ClearGrid);

//document.querySelector("#gridLines").addEventListener("input", ToggleLines);

let cells;
let border = 1;
let colorType = "pen"; //can get only: pen, eraser, rainbow, light, dark or a color

document.querySelector("#eraser").addEventListener("click", (e)=>{colorType = e.target.id;
    cells.forEach(cell => {
        cell.style.cursor = "url('./images/eraser.png'), pointer";
    });
});
document.querySelector("#rainbow").addEventListener("click", (e)=>{colorType = e.target.id;
    cells.forEach(cell => {
        cell.style.cursor = "url('./images/rainbow.png'), pointer";
    });
});
document.querySelector("#favcolor").addEventListener("input", (e)=>{colorType = e.target.value});
document.querySelector("#draw").addEventListener("click", ()=>{colorType = document.querySelector("#favcolor").value;
    cells.forEach(cell => {
        cell.style.cursor = "url('./images/pencil.png'), pointer";
    });
});
document.querySelector("#light").addEventListener("click", ()=>{colorType = "light";
    cells.forEach(cell => {
        cell.style.cursor = "url('./images/bulb.png'), pointer";
    });
});
document.querySelector("#dark").addEventListener("click", ()=>{colorType = "dark";
    cells.forEach(cell => {
        cell.style.cursor = "url('./images/moon.png'), pointer";
    });
});



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
        div.style.backgroundColor = BACKGROUND_GRIDCOLOR;
        
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
    if (e.buttons == 1 && (colorType!="light" && colorType != "dark")) {
        e.target.style.backgroundColor = color ;
        return;
    }
    else if (e.buttons == 1 && colorType=="light"){
        let op;  
        e.target.style.opacity != "" ? op = e.target.style.opacity : op = 1;
        op = op - 0.1;
        if(op>0.2)
        e.target.style.opacity = op;

    } 
    else if (e.buttons == 1 && colorType=="dark"){
        let op;
        e.target.style.opacity != "" ? op = e.target.style.opacity : op = 1;
        op = 0.1 + parseFloat(op);
        e.target.style.opacity = op;
    } 
    ;//do nothing?
}

function ClearGrid() {
    cells.forEach(cell => {
        cell.style.backgroundColor = BACKGROUND_GRIDCOLOR;
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

function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }