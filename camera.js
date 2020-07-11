class Camera{
    constructor(){
        this.locations = [];
        this.currentLocation = 0;
        this.state = "overview";
    }
    draw(rect){
        this.locations = [[0.5,0.5,0.1,0.1]];
        for(var x of this.locations){
            drawRect(rect[0]*x[0],rect[1]*x[1],rect[2]*x[2],rect[3]*x[3],"black",0,"white",1);
        }
    }
}