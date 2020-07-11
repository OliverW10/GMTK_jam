
var firstNames = [];
var lastNames = [];
function getName(bad){

}

var clothesSprites = [
[new spriteSheet("assets/hair1.png",16,32,5,this.x,this.y,16,32)], //hair
[new spriteSheet("assets/head1.png",16,32,5,this.x,this.y,16,32)], // head
[new spriteSheet("assets/shirt1.png",16,32,5,this.x,this.y,16,32)], // shirt
[new spriteSheet("assets/pants1.png",16,32,5,this.x,this.y,16,32)], // pants
]

var profileSprites = [
new spriteSheet("assets/hair.png",16,16,0,0,0,16,16), // hair
new spriteSheet("assets/heads.png", 16, 16, 0, 0, 0, 16, 16) //head
]

class Person{
	constructor(rect,bad){
		this.room = 1;
		this.x = random(rect[0],rect[0]+rect[2]-16);
		this.y = random(rect[1],rect[1]+rect[3]-32);
		this.timer = 0;
		this.target = [];
		this.badGuy = bad;
		this.speed = 1;
		this.name = getName(this.badGuy);
		this.idle = false;
		// clothes are stored as indexes for sprites
		// [hair, head, shirt, pants, shoes]
		//heads are 16x16
		//pants and body are 16x32
		this.clothesNums = [] // stores inexes for clothes
		this.clothes = [] // stores the actual sprite sheets for the clothes
		for(var i = 0; i < clothesSprites.length; i += 1){
			this.clothesNums.push(Math.floor(random(0, clothesSprites[i].length)))
			this.clothes.push(clothesSprites[i][this.clothesNums[i]]);
		}
		for(var x of this.clothes){
			x.addState("right",1,8);
			x.addState("left",2,8);
		}
		//for(var i = 0; i < clothesSprites.length; i += 1){
		//	this.clothes.push(round(random(0, clothesSprites.length)));
		//}
		this.direction = -1; // the direction they are facing
	}
	drawProfile(rect){ // draws the profile picture for binder
		profileSprites[0].sheetX = profileSprites[0].w*this.clothesNums[0];
		profileSprites[0].x = rect[0];
		profileSprites[0].draw();

		profileSprites[1].sheetX = profileSprites[1].w*this.clothesNums[1];
		profileSprites[1].x = rect[0];
		profileSprites[1].draw();
	}
	drawPerson(){
		for(var x of this.clothes){
			x.x = this.x;
			x.y = this.y;
			x.draw();
			if(this.idle){
				x.sheetX = 16 * 3;
			}else{
				x.frameCalc(1);
			}
			
		}
	}
	update(rect){
		if(this.timer <= 0){
			this.timer = random(100,400);
			this.target = [random(rect[0],rect[0]+rect[2]-16),random(rect[1],rect[1]+rect[3]-32)];
		}else{
			var rads = Math.atan2(this.target[1]-this.y,this.target[0]-this.x);
			if(!AABBCollision(this.x,this.y,16,32,this.target[0],this.target[1],16,16)){
				if(Math.cos(rads)*this.speed <= 0){
				}
				this.x += Math.cos(rads)*this.speed;
				this.y += Math.sin(rads)*this.speed;
				this.idle = false;
			}else{
				this.idle = true;
			}
			
			if(Math.cos(rads)*this.speed <= 0){
				this.direction = -1;
				for(var x of this.clothes){
					x.state = "right";
				}
			}else{
				this.direction = 1;
				for(var x of this.clothes){
					x.state = "left";
				}
			}
		}

		this.timer -= 1;
	}
}