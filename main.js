var bgalpha = 1;

var gameState = "game"; // can also be "menu"

var people = [];

for(var i = 0; i < 50; i += 1){
	people.push(new Person());
}

var moniter = new Camera(people);

var binder = new Binder(people);

var deskImg = new image("assets/desk.jpg");

function drawGame(){
	deskImg.drawImg(0, 0, 800, 600)
    moniter.draw([150, 45, 400, 250]);
    binder.draw([250, 350, 300, 225]);
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