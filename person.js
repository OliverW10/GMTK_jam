var faceW = 24;
var faceH = 48;
var firstNames = ["Adam", "Alex", "Aaron", "Ben", "Carl", "Dan", "David", "Edward", "Fred", "Frank", "George", "Hal", "Hank", "Ike", "John", "Jack", "Joe", "Larry", "Monte", "Matthew", "Mark", "Nathan", "Otto", "Paul", "Peter", "Roger", "Roger", "Steve", "Thomas", "Tim", "Ty", "Victor", "Walter"];
var lastNames = ["Anderson", "Ashwoon", "Aikin", "Bateman", "Bongard", "Bowers", "Boyd", "Cannon", "Cast", "Deitz", "Dewalt", "Ebner", "Frick", "Hancock", "Haworth", "Hesch", "Hoffman", "Kassing", "Knutson", "Lawless", "Lawicki", "Mccord", "McCormack", "Miller", "Myers", "Nugent", "Ortiz", "Orwig", "Ory", "Paiser", "Pak", "Pettigrew", "Quinn", "Quizoz", "Ramachandran", "Resnick", "Sagar", "Schickowski", "Schiebel", "Sellon", "Severson", "Shaffer", "Solberg", "Soloman", "Sonderling", "Soukup", "Soulis", "Stahl", "Sweeney", "Tandy", "Trebil", "Trusela", "Trussel", "Turco", "Uddin", "Uflan", "Ulrich", "Upson", "Vader", "Vail", "Valente", "Van Zandt", "Vanderpoel", "Ventotla", "Vogal", "Wagle", "Wagner", "Wakefield", "Weinstein", "Weiss", "Woo", "Yang", "Yates", "Yocum", "Zeaser", "Zeller", "Ziegler", "Bauer", "Baxster", "Casal", "Cataldi", "Caswell", "Celedon", "Chambers", "Chapman", "Christensen", "Darnell", "Davidson", "Davis", "DeLorenzo", "Dinkins", "Doran", "Dugelman", "Dugan", "Duffman", "Eastman", "Ferro", "Ferry", "Fletcher", "Fietzer", "Hylan", "Hydinger", "Illingsworth", "Ingram", "Irwin", "Jagtap", "Jenson", "Johnson", "Johnsen", "Jones", "Jurgenson", "Kalleg", "Kaskel", "Keller", "Leisinger", "LePage", "Lewis", "Linde", "Lulloff", "Maki", "Martin", "McGinnis", "Mills", "Moody", "Moore", "Napier", "Nelson", "Norquist", "Nuttle", "Olson", "Ostrander", "Reamer", "Reardon", "Reyes", "Rice", "Ripka", "Roberts", "Rogers", "Root", "Sandstrom", "Sawyer", "Schlicht", "Schmitt", "Schwager", "Schutz", "Schuster", "Tapia", "Thompson", "Tiernan", "Tisler"];
function getName(bad){
	return firstNames[Math.floor(random(0, firstNames.length))] + " " + lastNames[Math.floor(random(0, lastNames.length))]
}
var frametimer = 30;
var clothesSprites = [
[new spriteSheet("assets/hair1.png",16,32,frametimer,this.x,this.y,faceW,faceH), //hairs
new spriteSheet("assets/hair2.png",16,32,frametimer,this.x,this.y,faceW,faceH),
new spriteSheet("assets/hair3.png",16,32,frametimer,this.x,this.y,faceW,faceH),
new spriteSheet("assets/hair4.png",16,32,frametimer,this.x,this.y,faceW,faceH),
new spriteSheet("assets/hair5.png",16,32,frametimer,this.x,this.y,faceW,faceH)], 

[new spriteSheet("assets/head1.png",16,32,frametimer,this.x,this.y,faceW,faceH), // heads
],
[new spriteSheet("assets/shirt1.png",16,32,frametimer,this.x,this.y,faceW,faceH)], // shirt
[new spriteSheet("assets/pants1.png",16,32,frametimer,this.x,this.y,faceW,faceH)], // pants
]
for(var x of clothesSprites){
	for(var z of x){
		z.addState("right",1,8);
		z.addState("left",2,8);
	}
}

var profileSprites = [
new spriteSheet("assets/hair.png",16,16,0,0,0,64,64), // hair
new spriteSheet("assets/heads.png", 16, 16, 0, 0, 0, 64, 64), //head
new spriteSheet("assets/faces.png", 16, 16, 0, 0, 0, 64, 64)
]
for(var x of profileSprites){
	x.addState("face", 1, 6)
}
class Person{
	constructor(rect,bad){
		this.room = 1;
		this.w = faceW;
		this.h = faceH;
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
		this.direction = -1; // the direction they are facing
	}
	drawProfile(rect){ // draws the profile picture for binder
		c.beginPath()
		c.fillStyle = "rgb(255, 0, 0)";
		c.fillRect(...rect);

		//head
		profileSprites[1].sheetX = profileSprites[0].w*round(random(0, 3)); 
		profileSprites[1].x = rect[0];
		profileSprites[1].y = rect[1];
		profileSprites[1].draw();

		// face
		profileSprites[2].sheetX = 0//profileSprites[0].w*this.clothesNums[0];
		profileSprites[2].x = rect[0];
		profileSprites[2].y = rect[1];
		profileSprites[2].draw();

		// hair
		profileSprites[0].sheetX = profileSprites[0].w*this.clothesNums[0];
		profileSprites[0].x = rect[0];
		profileSprites[0].y = rect[1];
		profileSprites[0].draw();
	}
	drawPerson(){
		for(var x of this.clothes){
			x.x = this.x;
			x.y = this.y;
			showText(this.idle,x.x,x.y,10)
			if(this.idle){
				showText("fuck",x.x,x.y-10,10)
				x.sheetX = 0;
			}else{
				x.frameCalc(1);
				
			}
			x.draw();
			
			
		}

	}
	update(rect){
		if(this.timer <= 0){
			this.timer = random(100,400);
			this.target = [random(rect[0],rect[0]+rect[2]-this.w),random(rect[1],rect[1]+rect[3]-this.h)];
		}else{
			var rads = Math.atan2(this.target[1]-this.y,this.target[0]-this.x);
			if(AABBCollision(this.x,this.y,this.w,this.h,this.target[0],this.target[1],16,16)){
				this.idle = true;
				for(var x of this.clothes){
					x.sheetX = 0;
				}
			}else{
				this.x += Math.cos(rads)*this.speed;
				this.y += Math.sin(rads)*this.speed;
				this.idle = false;
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