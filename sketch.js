let tipo = 0;

function ab(x1,y1,x2,y2){
    let a = ((y2-y1)/(x2-x1));
    let b = y2-(x2*a);
    return [a,b];
}

let shapes = [];
let rays = [];

function setup() { 
    let canvas = createCanvas(400, 400);
    canvas.parent("sketch-holder");
    canvas.mousePressed(mpAction)

} 
  
function draw() { 
    background(220);
    strokeWeight(1);
    for(let sh of shapes){
        if(sh.points.length>1){
            if(sh.mouseDentro() && !sh.stillDraw){
                strokeWeight(3);
            } else {
                strokeWeight(1);
            }
        }
        fill('rgba(0,255,0, 0.25)');
        sh.desenhaShape();
    }

    for(let r of rays){
        r.desenhaRaio();
    }

    
}

function mpAction() {
    if((shapes.length>0 && shapes[shapes.length-1].stillDraw) || (rays.length>0 && rays[rays.length-1].stillDraw)){
        if(!tipo) shapes[shapes.length-1].addPoint();
        else rays[rays.length-1].addPoint();
    } else {
        if(!tipo) shapes.push(new Shape);
        else rays.push(new Ray());
    }
}

function doubleClicked() {
    if(shapes.length>0){
        shapes[shapes.length-1].addPoint(true);
        shapes[shapes.length-1].stillDraw = false;
    }
}

function selecionaForma(forma){
    tipo = forma;
}
