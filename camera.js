class Camera{
    constructor(people){
        this.locations = [[0.45,0.85,0.08,0.15,1],[0.34,0.6,0.3,0.25,2],[0.40,0.35,0.13,0.25,3],[0.64,0.75,0.2,0.15,4],[0.64,0.35,0.1,0.35,5],[0.24,0.65,0.1,0.15,1]];
        this.currentLocation = 0;
        this.state = "overview";
        this.people = people;
    }
    draw(rect){
        drawRect(rect[0],rect[1],rect[2],rect[3],"black",0,"",1);
        for(var x of this.locations){
            var temp = [rect[0]+rect[2]*x[0],rect[1]+rect[3]*x[1],rect[2]*x[2],rect[3]*x[3]];
            drawRect(temp[0],temp[1],temp[2],temp[3],"black",0,"white",1);
        }
    }
}