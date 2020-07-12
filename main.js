var bgalpha = 1;
var day = 1;

var gameState = "game"; // can also be "menu"

var people = [];

for(var i = 0; i < 25; i += 1){
	people.push(new Person([200, 38, 400, 250]));
}

var rect = [200, 38, 400, 250]
var moniter = new Camera(rect);

var binder = new Binder(people);

var poster = new Poster(people);

var tutorial = new Tutorial();

var deskImg = new image("assets/monitor.png");

function drawGame(){
	deskImg.drawImg(0, 0, 800, 600);
    moniter.draw([200, 38, 400, 250]);
    poster.draw();
    binder.draw([250, 350, 300, 225]);
    for(var x of people){
        if(moniter.currentLocation == x.room && moniter.state == "inspect" && x.y <= rect[1]+rect[3]*0.5){
            x.drawPerson();
        }
    }
    for(var x of people){
        if(moniter.currentLocation == x.room && moniter.state == "inspect" && x.y > rect[1]+rect[3]*0.5){
            x.drawPerson();
        }
    }
    tutorial.execute();
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
function updateMenu(){

}
function updateGame(){
    for(var x of people){
        x.update();
    }
}
function update(){
    if(gameState == "game"){
        updateGame();
    }
    if(gameState == "menu"){
		updateMenu();
	}
}

function main(){
    update();
    draw();
}

setInterval(main,1000/60);