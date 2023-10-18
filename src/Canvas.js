
import React, { useState} from 'react';

const Canvas = ({})=> {

const [canvas, setCanvas] = useState(new Array(400));
const [gridOn, setGridOn] = useState(true);
const [red, setRed] = useState(0);
const [green, setGreen] = useState(0);
const [blue, setBlue] = useState(0);

let css = `
    .colorPreview{
      background-color: rgb(${red},${green},${blue});
    }
`;

const canv = new Array(400);

for(let i = 0; i< 400;i++){
    if(canvas[i] === undefined){
    canv[i] = {red:255,green:255,blue:255};
    }
    else{
    canv[i] = canvas[i];
    }
    const xaxis = Math.floor(i / 20);
    const yaxis = i % 20;
    css += `
    #pane_${xaxis}_${yaxis}{
        background-color: rgb(${canv[i].red}, ${canv[i].green}, ${canv[i].blue});
    }
    `;
}

const colorPanel = (x,y)=> {
    canv[(x*20)+y]= {red:red,green:green,blue:blue};
    setCanvas(canv);
    //ev.preventDefault();
}

const grid = `
    .pane{
        border: solid rgb(128,128,128) .5px;
    }
`;
return(
    <div>
    <h1>Pixel Canvas</h1>

    <label>Red:<input type="number" min="0" max="255" value={ red } onChange={ ev => setRed(ev.target.value)}/> Green:<input type="number" min="0" max="255" value={ green } onChange={ ev => setGreen(ev.target.value)}/> Blue:<input type="number" min="0" max="255" value={ blue } onChange={ ev => setBlue(ev.target.value)}/></label>
    <label>Show Grid<input type='checkbox' checked={gridOn} onChange={ () => setGridOn(!gridOn)}/></label>
    <div className="colorPreview"></div>
    <style>{css}</style>
    {gridOn?<style>{grid}</style>:''}
    <div id='centerCanvas'>
    <div id='canvas'>
        {[...Array(20)].map((row, x) =>
            <div key={`canvasRow${x}`} id={`canvasRow${x}`} className="canvasFlex">
                {[...Array(20)].map((panel, y) =>
                <div key={`pane-${x}-${y}-`} id={`pane_${x}_${y}`} className="pane" onMouseDown={()=>colorPanel(x,y)}></div>
                )}
            </div>
        )}
    </div>
    </div>
    </div>
)
    
};
export default Canvas;