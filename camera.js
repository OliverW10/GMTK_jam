class Camera{
    constructor(people){
        this.locations = [[0.45,0.85,0.08,0.15,1],[0.34,0.6,0.3,0.25,2],[0.40,0.35,0.13,0.25,3],[0.64,0.75,0.2,0.15,4],[0.64,0.35,0.1,0.35,5],[0.24,0.65,0.1,0.15,6]];
        this.currentLocation = 1;
        this.state = "overview";
        this.people = people;
    }
    draw(rect){
        drawRect(rect[0],rect[1],rect[2],rect[3],"black",0,"",1);
        if(this.state == "overview"){
            for(var x of this.locations){
                var temp = [rect[0]+rect[2]*x[0],rect[1]+rect[3]*x[1],rect[2]*x[2],rect[3]*x[3]];
                if(AABBCollision(temp[0],temp[1],temp[2],temp[3],mouse.x,mouse.y,0,0)){
                    drawRect(temp[0],temp[1],temp[2],temp[3],"black",1,"gray",1);
                    if(mouse.button.left){
                        this.state = "inspect";
                        this.currentLocation = x[4];
                    }
                }else{
                    drawRect(temp[0],temp[1],temp[2],temp[3],"black",0,"white",1);
                }
            }
        }else{
            showText("Room #"+this.currentLocation,rect[0]+rect[2]*0.5,rect[1]+rect[3]*0.05,20)
            if(mouse.button.right){
                this.state = "overview";
            }
            
        }
        for(var x of this.people){
            x.update(rect);
            if(this.state == "inspect" && x.room == this.currentLocation){
                x.drawPerson();
            }
        }
        
    }
}