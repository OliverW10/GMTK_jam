
var bubbleSprite = new spriteSheet("assets/bubble.png",800,600,25,0,0,800,600)

class Tutorial{
	constructor(){
		this.state = this.intro
		this.texts = [""];
	}
	createBubble(){

	}
	removeBubble(){

	}
	execute(){
		this.drawBubble();
		this.state();
	}
	drawBubble(){
		bubbleSprite.draw()
	}
	intro(){
	}
}