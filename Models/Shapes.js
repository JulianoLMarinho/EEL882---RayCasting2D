class Shape{
    points = [[mouseX, mouseY]];
    lines = [0, 0, 400];
    stillDraw = true;
    editShape = false;
    // edit = 0;
    edit = -1;
    desenhaObjeto(editar = false, intersec, raios){
        if(this.points.length > 0){
            beginShape();
            fill('rgba(255,0,250, 0.2)');
            for(let i = 0; i< this.points.length; i++){
                if(editar){
                    strokeWeight(5);
                    point(this.points[i][0],this.points[i][1]);
                    if(this.edit >= 0){
                        this.points[this.edit][0] = mouseX;
                        this.points[this.edit][1] = mouseY;
                    }
                }
                if(this.editShape && editar){
                    fill('rgba(255,0,250, 0.5)');
                    this.points[i][0] = this.points[i][0] - (pmouseX - mouseX);
                    this.points[i][1] = this.points[i][1] - (pmouseY - mouseY);
                }
                strokeWeight(1);
                vertex(this.points[i][0],this.points[i][1]);
            }
            if(this.stillDraw) vertex(mouseX, mouseY);
            endShape(CLOSE);
            if(intersec){
                this.intersec(raios)
            }
        }
    }

    editarPonto(editanto){
        if(this.edit === -1 && !this.editShape && !editando){
            for(let i = 0; i<this.points.length; i++){
                let t = ((this.points[i][0]-mouseX)**2)+((this.points[i][1]-mouseY)**2);
                if(t<=16){
                    this.edit = i;
                    return true;
                } else {
                    if(this.mouseDentro()){
                        this.editShape = true;
                        return true;
                    }

                }
            }
        } else {
            this.edit = -1;
            this.editShape = false;
            return false;
        }

    }


    mouseDentro(){
        let inter = 0;
        let p = this.points.slice();
        p.push([this.points[0][0], this.points[0][1]]);
        for(let i = 0; i<p.length-1; i++){
            let ab1 = this.ab(p[i][0], p[i][1], p[i+1][0], p[i+1][1]);
            let ab2 = this.ab(mouseX, mouseY, 0, 0);
            let x = (ab2[1]-ab1[1])/(ab1[0]-ab2[0]);
            let y = (ab1[0]*x+ab1[1]);
            if(ab2[0]**2===Infinity**2){
                x = 0;
                y = (ab1[0]*x+ab1[1]);
            } else if(ab1[0]**2===Infinity**2) {
                x = p[i][0];
                y = ab2[0]*x+ab2[1];
            }
            if(x>=Math.min(p[i][0],p[i+1][0]) &&
                x<=Math.max(p[i][0],p[i+1][0]) &&
                y>=Math.min(p[i][1],p[i+1][1]) &&
                y<=Math.max(p[i][1],p[i+1][1]) && x < mouseX && y < mouseY
            ) {
                inter++;
            }
        }
        return inter % 2 !== 0;


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
        for(let r of raios){
            let inter = [];
            for(let i = 0; i<p.length-1; i++){
                let ab1 = this.ab(p[i][0], p[i][1], p[i+1][0], p[i+1][1]);
                let ab2 = this.ab(r.x1, r.y1, r.x2, r.y2);
                let x = (ab2[1]-ab1[1])/(ab1[0]-ab2[0]);
                let y = (ab1[0]*x+ab1[1]);
                if(ab2[0]**2===Infinity**2){
                    x = r.x1;
                    y = (ab1[0]*x+ab1[1]);
                } else if(ab1[0]**2===Infinity**2) {
                    x = p[i][0];
                    y = ab2[0]*x+ab2[1];
                }



                let tY = 5000*r.direction*sin(r.coefAng)+r.y1;
                let tX = 5000*r.direction*cos(r.coefAng)+r.x1;
                if(
                    x>=Math.min(p[i][0],p[i+1][0]) &&
                    x<=Math.max(p[i][0],p[i+1][0]) &&
                    y>=Math.min(p[i][1],p[i+1][1]) &&
                    y<=Math.max(p[i][1],p[i+1][1]) &&
                    (Math.max(tY, r.y1) >= y) &&
                    (Math.min(tY, r.y1) <= y) &&
                    (Math.max(tX, r.x1) >= x) &&
                    (Math.min(tX, r.x1) <= x)
                ) {
                    inter.push([x,y]);
                }
            }
            strokeWeight(10);
            inter.sort(function(a, b){
                return (((r.x1 - a[0])**2)+((r.y1 - a[1])**2))-(((r.x1 - b[0])**2)+((r.y1 - b[1])**2))
            });
            let color = inter.length%2===0?'green':'red';
            for (let [x,y] of inter){
                stroke(color);
                color = color==='green'?'red':'green';
                point(x,y);
                stroke(0);
            }
        }
    }
}
