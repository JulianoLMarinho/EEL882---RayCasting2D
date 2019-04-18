let tipo = 0; //0: polígonos, 1:raios
let acao = 0; //0: desenhar, 1:editar

function ab(x1,y1,x2,y2){
    let a = ((y2-y1)/(x2-x1));
    let b = y2-(x2*a);
    return [a,b];
}

let shapes = [];
let rays = [];

function setup() { 
    let canvas = createCanvas(800, 800);
    canvas.parent("sketch-holder");
    canvas.mousePressed(mpAction);
    canvas.doubleClicked(dcAction);

} 
  
function draw() { 
    background(220);
    strokeWeight(1);
    for(let sh of shapes){
        // if(sh.points.length>1){
        //     if(sh.mouseDentro() && !sh.stillDraw){
        //         strokeWeight(3);
        //     } else {
        //         strokeWeight(1);
        //     }
        // }
        fill('rgba(0,255,0, 0.25)');
        sh.desenhaShape(acao);

    }

    for(let r of rays){
        r.desenhaRaio(acao);
    }

    
}

function mpAction() {
    if(!acao){
        if((shapes.length>0 && shapes[shapes.length-1].stillDraw) || (rays.length>0 && rays[rays.length-1].stillDraw)){
            if(!tipo) shapes[shapes.length-1].addPoint();
            else rays[rays.length-1].addPoint();
        } else {
            if(!tipo) shapes.push(new Shape);
            else rays.push(new Ray());
        }
    } else {

    }
}

function dcAction() {
    if(!acao){
        if(shapes.length>0){
            shapes[shapes.length-1].addPoint(true);
            shapes[shapes.length-1].stillDraw = false;
        }
    }

}

function selecionaForma(forma){
    tipo = forma;
}

function selecionarAcao(tacao){
    acao = tacao;
}

function mouseDragged(){
    if(mouseIsPressed){
        for(let sh of shapes){
            sh.editarPonto();
        }
    }
}
