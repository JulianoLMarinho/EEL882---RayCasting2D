class Ray{
    x1 = 0;
    y1 = 0;
    x2 = mouseX;
    y2 = mouseY;
    stillDraw = true;
    selecionado = false;
    selecionadoAng = false;
    coefAng = 0;
    direction = 1;

    constructor(){
        this.x1 = mouseX;
        this.y1 = mouseY;
    }

    desenhaObjeto(editar = false,  intersec, raios){
        if(this.stillDraw || this.selecionadoAng){
            this.x2 = mouseX;
            this.y2 = mouseY;
            this.coefAng = atan(((this.y2-this.y1)/(this.x2-this.x1)));
            this.direction = this.x2-this.x1 >= 0 ? 1:-1;
        }
        strokeWeight(10);
        fill('blue');
        stroke('blue');
        point(this.x1,this.y1);

        fill('blue');
        stroke('blue');
        strokeWeight(1);
        triangle(25*this.direction*cos(this.coefAng+0.3)+this.x1, (25*this.direction*sin(this.coefAng+0.3)+this.y1), 25*this.direction*cos(this.coefAng-0.3)+this.x1, (25*this.direction*sin(this.coefAng-0.3)+this.y1), 30*this.direction*cos(this.coefAng)+this.x1, (30*this.direction*sin(this.coefAng)+this.y1));
        line(this.x1,this.y1, (30*this.direction*cos(this.coefAng)+this.x1), (30*this.direction*sin(this.coefAng)+this.y1));
        strokeWeight(1.5);
        stroke(0);
        for (let i = 30; i<5000; i++){
            if (i%6==0) point((i*this.direction*cos(this.coefAng)+this.x1), (i*this.direction*sin(this.coefAng)+this.y1));
        }
        if(editar){
            strokeWeight(5);
            stroke(0);
            point(this.x1, this.y1);
            point(30*this.direction*cos(this.coefAng)+this.x1, 30*this.direction*sin(this.coefAng)+this.y1)
            if(this.selecionado && !this.selecionadoAng){
                this.x1 = mouseX;
                this.y1 = mouseY;
                this.x2 = 100*this.direction*cos(this.coefAng)+this.x1;
                this.y2 = 100*this.direction*sin(this.coefAng)+this.y1;
            }
        }
    }

    addPoint(){
        this.stillDraw = false;
    }

    editarPonto(editando){
        if((this.selecionadoAng || this.selecionado) || editando) {
            this.selecionado = false;
            this.selecionadoAng = false;
            return false;
        } else {
            if(!this.selecionado) {
                let t = ((this.x1 - mouseX) ** 2) + ((this.y1 - mouseY) ** 2);
                if (t <= 25) {
                    this.selecionado = true;
                    return true;
                }
                let g = (((30*this.direction*cos(this.coefAng)+this.x1) - mouseX)**2) + (((30*this.direction*sin(this.coefAng)+this.y1) - mouseY) ** 2);
                if(g<=25){
                    this.selecionadoAng = true;
                    return true;
                }
            }
            return false;
        }
    }
}
