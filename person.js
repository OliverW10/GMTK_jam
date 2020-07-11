
var firstNames = [];
var lastNames = [];
function getName(bad){

}

var clothesSprites = [
[], //hair
[], // head
[], // shirt
[], // pants
[], // shoes
]

class Person{
	constructor(bad){
		this.room = 1;
		this.x = 0;
		this.y = 0;
		this.timer = 0;
		this.target = [];
		this.badGuy = bad;
		this.speed = 2;
		this.name = getName(this.badGuy);

		// clothes are stored as indexes for sprites
		// [hair, head, shirt, pants, shoes]
		this.clothes = [];
		for(var i = 0; i < clothesSprites.length; i += 1){
			this.clothes.push(round(random(0, clothesSprites.length)));
		}
		this.direction = 0; // the direction they are facing
	}
	drawProfile(){ // draws the profile picture for binder
		for(var i = 0; i < this.clothes.length; i += 1){
			clothesSprites[this.clothes].draw()
		}
	}
	drawPerson(rect){
		for(var i = 0; i < this.clothes.length; i += 1){
			this.clothes.draw()
		}
	}
	update(rect){
		if(this.timer <= 0){
			this.timer = 300+random(0,300);
			this.target = [random(rect[0],rect[0]+rect[1]),random(rect[1],+rect[1]+rect[2])];
		}else{
			var rads = Math.atan2(this.target[1]-this.y,this.target[0]-this.x);
			this.x += Math.cos(rads)*this.speed;
			this.y += Math.sin(rads)*this.speed;
		}

		this.timer -= 1;
	}
}