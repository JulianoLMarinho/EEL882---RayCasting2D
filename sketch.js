let tipo = 0; //0: polígonos, 1:raios
let acao = 0; //0: desenhar, 1:editar
let intersec = 0; //0: não mostra interseções, 1: mostra intersecções

function ab(x1,y1,x2,y2){
    let a = ((y2-y1)/(x2-x1));
    let b = y2-(x2*a);
    return [a,b];
}

let shapes = [];
let rays = [];
let objetos = [];

function setup() { 
    let canvas = createCanvas(600, 600);
    canvas.parent("sketch-holder");
    canvas.mousePressed(mpAction);
    canvas.doubleClicked(dcAction);
    canvas.mouseReleased(rlAction);

} 

function rlAction(){
    if(acao){
        // for(let sh of shapes){
        //     if(sh.editarPonto()) break;
        // }
        // for (let r of rays){
        //     r.editarPonto();
        // }

        for (let o of objetos){
            o.editarPonto();
        }
    }
}

function draw() { 
    background(220);
    strokeWeight(1);
    // for(let sh of shapes){
    //     // if(sh.points.length>1){
    //     //     if(sh.mouseDentro() && !sh.stillDraw){
    //     //         strokeWeight(3);
    //     //     } else {
    //     //         strokeWeight(1);
    //     //     }
    //     // }
    //     fill('rgba(0,255,0, 0.25)');
    //     sh.desenhaObjeto(acao);
    //
    // }
    //
    // for(let r of rays){
    //     r.desenhaObjeto(acao);
    // }
    // if(mouseIsPressed){
    //     for(let sh of shapes){
    //         sh.editarPonto();
    //     }
    // }
    rays = objetos.filter(filtroObjetos);
    for (let o of objetos){
        o.desenhaObjeto(acao, intersec, rays);
    }
    
}

function mpAction() {
    if(!acao){
        // if((shapes.length>0 && shapes[shapes.length-1].stillDraw) || (rays.length>0 && rays[rays.length-1].stillDraw)){
        //     if(!tipo) shapes[shapes.length-1].addPoint();
        //     else rays[rays.length-1].addPoint();
        // } else {
        //     if(!tipo) shapes.push(new Shape);
        //     else rays.push(new Ray());
        // }


        if((objetos.length>0 && objetos[objetos.length-1].stillDraw)){
            if(!tipo) objetos[objetos.length-1].addPoint();
            else objetos[objetos.length-1].addPoint();
        } else {
            if(!tipo) objetos.push(new Shape);
            else objetos.push(new Ray());
        }
    } else {
        // for(let sh of shapes){
        //     if(sh.editarPonto()) break;
        // }
        // for (let r of rays){
        //     r.editarPonto();
        // }

        for(let sh of objetos){
            if(sh.editarPonto()) break;
        }
    }
}

function dcAction() {
    if(!acao){
        // if(shapes.length>0){
        //     shapes[shapes.length-1].addPoint(true);
        //     shapes[shapes.length-1].stillDraw = false;
        // }

        if(objetos.length>0 && !tipo){
            objetos[objetos.length-1].addPoint(true);
            objetos[objetos.length-1].stillDraw = false;
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

}

function mostrarIntersec() {
    intersec = intersec?0:1;
    rays = objetos.filter(filtroObjetos);
}


function filtroObjetos(objeto){
    let h = objeto.constructor.name;
    return h == "Ray";
}
