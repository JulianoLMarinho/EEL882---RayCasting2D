class Shapes{
    points = [[mouseX, mouseY]];
    lines = [0, 0, 400];
    ponto = [0,0];
    stillDraw = true;
    desenhaShape(){
        if(this.points.length > 0){
            beginShape();
            for(let [x,y] of this.points){
                vertex(x,y);
            }
            if(this.stillDraw) vertex(mouseX, mouseY);
            endShape(CLOSE);
            point(this.ponto[0], this.ponto[1]);
        }
    }

    mouseDentro(){
        let inter = 0;
        for(let i = 0; i<this.points.length-1; i++){
            let ab1 = this.ab(this.points[i][0], this.points[i][1], this.points[i+1][0], this.points[i+1][1]);
            let ab2 = this.ab(this.lines[0], this.lines[1], mouseX, mouseY);
            let x = (ab2[1]-ab1[1])/(ab1[0]-ab2[0]);
            let y = (ab1[0]*x+ab1[1]);
            if(x>Math.min(this.points[i][0],this.points[i+1][0]) &&
                x<Math.max(this.points[i][0],this.points[i+1][0]) &&
                y>Math.min(this.points[i][1],this.points[i+1][1]) &&
                y<Math.max(this.points[i][1],this.points[i+1][1]) && x <= mouseX && y <= mouseY
            ) {
                inter++;
            }
        }
        let ab1 = this.ab(this.points[0][0], this.points[0][1], this.points[this.points.length-1][0], this.points[this.points.length-1][1]);
        let ab2 = this.ab(this.lines[0], this.lines[1], mouseX, mouseY);
        let x = (ab2[1]-ab1[1])/(ab1[0]-ab2[0]);
        let y = (ab1[0]*x+ab1[1]);
        if(x>Math.min(this.points[0][0],this.points[this.points.length-1][0]) &&
            x<Math.max(this.points[0][0],this.points[this.points.length-1][0]) &&
            y>Math.min(this.points[0][1],this.points[this.points.length-1][1]) &&
            y<Math.max(this.points[0][1],this.points[this.points.length-1][1]) && x <= mouseX && y <= mouseY
        ) {
            inter++;
        }
        if (inter%2==0){
            return false;
        } else {
            return true;
        }


    }

    addPoint(){
        if(this.stillDraw) this.points.push([mouseX, mouseY]);
    }

    ab(x1,y1,x2,y2){
        let a = ((y1-y2)/(x1-x2));
        let b = y2-(x2*a);
        return [a,b];
    }
}


let s = [];

function setup() { 
    createCanvas(800, 800);

} 
  
function draw() { 
    background(220);

    strokeWeight(1);
    for(let sh of s){
        if(sh.points.length>1){
            if(sh.mouseDentro() && !sh.stillDraw){
                strokeWeight(3);
            } else {
                strokeWeight(1);
            }
        }
        sh.desenhaShape();
    }

    
}

function mousePressed() {
    console.log(mouseX, mouseY);
    if(s.length>0 && s[s.length-1].stillDraw){
        s[s.length-1].addPoint();
    } else {
        s.push(new Shapes);
    }
    
}

function doubleClicked() {
    if(s.length>0){
        s[s.length-1].stillDraw = false;
    }
    
}
