var bgalpha = 1;

function updateCanvasDimensions(){
    h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    h *= 0.95;
    w *= 0.95;
	scale = h/600;
	canvas.height = 600*scale;
	canvas.width = 800*scale;
}
function draw(){
    drawRect(0,0,w,h,"white",true,"white",bgalpha);
    

}

function update(){
    

}

function main(){
    updateCanvasDimensions();
    update();
    draw();


}

setInterval(main,1000/60);