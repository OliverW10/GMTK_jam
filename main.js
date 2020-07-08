var bgalpha = 1;

function draw(){
    drawRect(0,0,w,h,"white",true,"white",bgalpha);
    

}

function update(){
    

}

function main(){
    update();
    draw();


}

setInterval(main,1000/60);