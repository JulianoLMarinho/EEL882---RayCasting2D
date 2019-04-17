class Ray{
    x1 = 0;
    y1 = 0;
    x2 = mouseX;
    y2 = mouseY;
    stillDraw = true;
    constructor(){
        this.x1 = mouseX;
        this.y1 = mouseY;
    }

    desenhaRaio(){
        if(this.stillDraw){
            this.x2 = mouseX;
            this.y2 = mouseY;
        }
        strokeWeight(10);
        fill('blue');
        point(this.x1,this.y1);
        strokeWeight(2);
        let d1 = atan(((this.y2-this.y1)/(this.x2-this.x1)));
        let direction = this.x2-this.x1 >= 0 ? 1:-1;
        strokeWeight(1);

        triangle(25*direction*cos(d1+0.3)+this.x1, (25*direction*sin(d1+0.3)+this.y1), 25*direction*cos(d1-0.3)+this.x1, (25*direction*sin(d1-0.3)+this.y1), 30*direction*cos(d1)+this.x1, (30*direction*sin(d1)+this.y1));
        line(this.x1,this.y1, (30*direction*cos(d1)+this.x1), (30*direction*sin(d1)+this.y1));
        line(this.x1,this.y1, (3000*direction*cos(d1)+this.x1), (3000*direction*sin(d1)+this.y1));
    }

    addPoint(){
        this.stillDraw = false;
    }
}
