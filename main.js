var bgalpha = 1;

var gameState = "game"; // can also be "menu"

var people = [];

for(var i = 0; i < 50; i += 1){
	people.push(new Person());
}

var moniter = new Camera(people);

var binder = new Binder(people);

function drawGame(){
    moniter.draw([30, 20, 800-60, 350]);
    binder.draw([400, 390, Math.cos(mouse.x/600)*150, 400]);
}

function drawMenu(){
	// draws menu;
}

function draw(){
	drawRect(0,0,w,h,"white",true,"white",bgalpha);
	if(gameState == "game"){
		drawGame();
	}
	if(gameState == "menu"){
		drawMenu();
	}
}

function update(){
    for(var i = 0; i < people.length; i += 1){

    }
}

function main(){
    update();
    draw();
}

setInterval(main,1000/60);