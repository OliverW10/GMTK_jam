
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
		this.badGuy = bad;
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
}