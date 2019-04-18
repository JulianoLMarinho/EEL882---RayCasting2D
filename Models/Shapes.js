class Shape{
    points = [[mouseX, mouseY]];
    lines = [0, 0, 400];
    stillDraw = true;
    desenhaShape(editar = false){
        if(this.points.length > 0){
            beginShape();
            for(let [x,y] of this.points){
                if(editar){
                    strokeWeight(8);
                    point(x,y);
                }
                strokeWeight(1);
                vertex(x,y);
            }
            if(this.stillDraw) vertex(mouseX, mouseY);
            endShape(CLOSE);
        }
    }

    editarPonto(){
        for(let i = 0; i<this.points.length; i++){
            let t = ((this.points[i][0]-mouseX)**2)+((this.points[i][1]-mouseY)**2);
            if(t<=16){
                this.points[i][0] = mouseX;
                this.points[i][1] = mouseY;
            }
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
        if (inter%2==0){
            return false;
        } else {
            return true;
        }


    }

    addPoint(lastPoint = false){
        if(this.stillDraw) this.points.push([mouseX, mouseY]);
        if(lastPoint) this.points.push([this.points[0][0],this.points[0][1]]);
    }

    ab(x1,y1,x2,y2){
        let a = ((y1-y2)/(x1-x2));
        let b = y2-(x2*a);
        return [a,b];
    }
}
