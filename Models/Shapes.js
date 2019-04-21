class Shape{
    points = [[mouseX, mouseY]];
    lines = [0, 0, 400];
    stillDraw = true;
    // edit = 0;
    edit = -1;
    desenhaObjeto(editar = false, intersec, raios){
        if(this.points.length > 0){
            beginShape();
            fill('rgba(0,255,0, 0.25)');
            for(let [x,y] of this.points){
                if(editar){
                    strokeWeight(5);
                    point(x,y);
                    if(this.edit >= 0){
                        this.points[this.edit][0] = mouseX;
                        this.points[this.edit][1] = mouseY;
                    }
                }
                strokeWeight(1);
                vertex(x,y);
            }
            if(this.stillDraw) vertex(mouseX, mouseY);
            endShape(CLOSE);
            if(intersec){
                this.intersec(raios)
            }
        }
    }

    editarPonto(){
        if(this.edit == -1){
            for(let i = 0; i<this.points.length; i++){
                let t = ((this.points[i][0]-mouseX)**2)+((this.points[i][1]-mouseY)**2);
                if(t<=16){
                    this.edit = i;
                    return true;
                }
            }
        } else {
            this.edit = -1;
            return false;
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
        if(this.stillDraw && !lastPoint) this.points.push([mouseX, mouseY]);
        if(lastPoint) this.points.pop();
    }

    ab(x1,y1,x2,y2){
        let a = ((y1-y2)/(x1-x2));
        let b = y2-(x2*a);
        return [a,b];
    }



    intersec(raios){
        let p = this.points.slice();
        p.push([this.points[0][0], this.points[0][1]]);
        for(let i = 0; i<p.length-1; i++){
            for(let r of raios){
                let ab1 = this.ab(p[i][0], p[i][1], p[i+1][0], p[i+1][1]);

                let a = r.coefAng;
                let b = r.y1-a*r.x1;

                let ab2 = this.ab(r.x1, r.y1, r.x2, r.y2);
                console.log(ab2);

                let x = (ab2[1]-ab1[1])/(ab1[0]-ab2[0]);
                if(ab2[0]==Infinity){
                    x = r.x1;
                }
                let y = (ab1[0]*x+ab1[1]);
                if(x>Math.min(p[i][0],p[i+1][0]) &&
                    x<Math.max(p[i][0],p[i+1][0]) &&
                    y>Math.min(p[i][1],p[i+1][1]) &&
                    y<Math.max(p[i][1],p[i+1][1])
                ) {
                    strokeWeight(10);
                    point(x,y);
                }
            }
        }
    }
}
