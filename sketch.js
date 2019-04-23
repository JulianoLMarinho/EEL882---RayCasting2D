let tipo = 0;           //0: polígonos, 1:raios
let acao = 0;           //0: desenhar, 1:editar
let intersec = 0;       //0: não mostra interseções, 1: mostra intersecções
let editando = 0;       //0: não está editando, 1: está editando
let rays = [];          //Lista com todos os raios presentes no canvas
let objetos = [];       //Lista com todos os objetos presentes no canvas
let canvas = null;      //Área de desenho


function setup() { 
    canvas = createCanvas(650, 650);
    canvas.parent("sketch-holder");
    canvas.mousePressed(mpAction);
    canvas.doubleClicked(dcAction);
    canvas.mouseReleased(rlAction);
}


function draw() {
    background(220);
    strokeWeight(1);
    rays = objetos.filter(filtroObjetos);
    for (let o of objetos){
        o.desenhaObjeto(acao, intersec, rays);
    }
}

//Chamada no mouseReleased do canvas
function rlAction(){
    if(acao){
        for (let o of objetos){
            if(o.editarPonto(true)) break;
        }
        editando = false;
    }
}

//Chamada no mousePressed do canvas
function mpAction() {
    if(!acao){
        if((objetos.length>0 && objetos[objetos.length-1].stillDraw)){
            if(!tipo) objetos[objetos.length-1].addPoint();
            else objetos[objetos.length-1].addPoint();
        } else {
            if(!tipo) objetos.push(new Shape);
            else objetos.push(new Ray());
        }
    } else {
        for(let i = 1; i<= objetos.length; i++){
            if(objetos[objetos.length - i].editarPonto(editando)){
                editando = true;
            }
        }
    }
}

//Chamada no doubleClick do canvas
function dcAction() {
    if(!acao){
        if(objetos.length>0 && !tipo){
            objetos[objetos.length-1].addPoint(true);
            objetos[objetos.length-1].stillDraw = false;
        }
    }

}

//Função utilizada no front para definir se o objeto desenhado será um polígono ou um raio
function selecionaForma(forma){
    tipo = forma;
}

//Função utilizada para definir se a ação será desenhar um objeto ou editar um objeto
function selecionarAcao(tacao){
    if(tacao){
        $("#selecionar1").attr('disabled', true);
        $("#selecionar2").attr('disabled', true);
    } else {
        $("#selecionar1").attr('disabled', false);
        $("#selecionar2").attr('disabled', false);

    }
    acao = tacao;
}

//Função utilizada para definir se as intersecções serão mostradas no canvas
function mostrarIntersec() {
    intersec = intersec?0:1;
    rays = objetos.filter(filtroObjetos);
}

//Função utilizada para criar uma cópia com os raios presentes no canvas que serão tratados por cada polígono
function filtroObjetos(objeto){
    let h = objeto.constructor.name;
    return h == "Ray";
}
