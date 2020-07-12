var faceW = 40;
var faceH = 80;
var firstNames = ["Adam", "Alex", "Aaron", "Ben", "Carl", "Dan", "David", "Edward", "Fred", "Frank", "George", "Hal", "Hank", "Ike", "John", "Jack", "Joe", "Larry", "Monte", "Matthew", "Mark", "Nathan", "Otto", "Paul", "Peter", "Roger", "Roger", "Steve", "Thomas", "Tim", "Ty", "Victor", "Walter"];
var lastNames = ["Anderson", "Ashwoon", "Aikin", "Bateman", "Bongard", "Bowers", "Boyd", "Cannon", "Cast", "Deitz", "Dewalt", "Ebner", "Frick", "Hancock", "Haworth", "Hesch", "Hoffman", "Kassing", "Knutson", "Lawless", "Lawicki", "Mccord", "McCormack", "Miller", "Myers", "Nugent", "Ortiz", "Orwig", "Ory", "Paiser", "Pak", "Pettigrew", "Quinn", "Quizoz", "Ramachandran", "Resnick", "Sagar", "Schickowski", "Schiebel", "Sellon", "Severson", "Shaffer", "Solberg", "Soloman", "Sonderling", "Soukup", "Soulis", "Stahl", "Sweeney", "Tandy", "Trebil", "Trusela", "Trussel", "Turco", "Uddin", "Uflan", "Ulrich", "Upson", "Vader", "Vail", "Valente", "Van Zandt", "Vanderpoel", "Ventotla", "Vogal", "Wagle", "Wagner", "Wakefield", "Weinstein", "Weiss", "Woo", "Yang", "Yates", "Yocum", "Zeaser", "Zeller", "Ziegler", "Bauer", "Baxster", "Casal", "Cataldi", "Caswell", "Celedon", "Chambers", "Chapman", "Christensen", "Darnell", "Davidson", "Davis", "DeLorenzo", "Dinkins", "Doran", "Dugelman", "Dugan", "Duffman", "Eastman", "Ferro", "Ferry", "Fletcher", "Fietzer", "Hylan", "Hydinger", "Illingsworth", "Ingram", "Irwin", "Jagtap", "Jenson", "Johnson", "Johnsen", "Jones", "Jurgenson", "Kalleg", "Kaskel", "Keller", "Leisinger", "LePage", "Lewis", "Linde", "Lulloff", "Maki", "Martin", "McGinnis", "Mills", "Moody", "Moore", "Napier", "Nelson", "Norquist", "Nuttle", "Olson", "Ostrander", "Reamer", "Reardon", "Reyes", "Rice", "Ripka", "Roberts", "Rogers", "Root", "Sandstrom", "Sawyer", "Schlicht", "Schmitt", "Schwager", "Schutz", "Schuster", "Tapia", "Thompson", "Tiernan", "Tisler"];
function getName(bad){
	return firstNames[Math.floor(random(0, firstNames.length))] + " " + lastNames[Math.floor(random(0, lastNames.length))]
}
var frametimer = 5;


var profileSprites = [
new spriteSheet("assets/hairs.png",16,16,0,0,0,48,48), // hair
new spriteSheet("assets/heads.png", 16, 16, 0, 0, 0, 48, 48), //head
new spriteSheet("assets/faces.png", 16, 16, 0, 0, 0, 48, 48)
]
profileSprites[0].addState("idle",1,8)
profileSprites[1].addState("idle",1,8)
profileSprites[2].addState("idle",1,3)
var restrictedRooms = {
	1:false,
	2:false,
	3:false,
	4:false,
	5:false,
	6:false
}
var doors = [ //[x, y, w, h, roomItLeadsTo, tpx, tpy, room, restricted] x,y,w,h and tpx,tpy are as a percentage of the monitor rect
	[0.45,0,0.1,0.05,2,0.5,0.6,1],
	[0.45,0.95,0.1,0.05,1,0.5,0.1,2],
	[0,0.45,0.05,0.1,6,0.75,0.45,2],
	[0.95,0.45,0.05,0.1,2,0,0.45,6],
	[0.95,0.45,0.05,0.1,4,0,0.45,2],
	[0,0.45,0.05,0.1,2,0,0.45,4],
	[0.45,0.95,0.1,0.05,2,0.5,0.1,3],
	[0.95,0.45,0.05,0.1,5,0,0.45,3],
	[0,0.45,0.05,0.1,3,0.95,0.45,5],
	[0.45,0,0.1,0.05,3,0.5,0.6,2],
]

class Person{
	constructor(rect){
		this.rect = rect;
		this.walls = [
			[this.rect[0],this.rect[1]-20,this.rect[2]+20,20],
			[this.rect[0]-20,this.rect[1]-20,20,this.rect[3]+20],
			[this.rect[0]+this.rect[2],this.rect[1],20,this.rect[3]],
			[this.rect[0],this.rect[1]+this.rect[3],this.rect[2],20]
		];

		this.arrestable = false;
		this.room = 1;
		this.w = faceW;
		this.h = faceH;
		this.x = random(rect[0],rect[0]+rect[2]-this.w);
		this.y = random(rect[1],rect[1]+rect[3]-this.h);
		this.timer = 0;
		this.target = [];
		this.speed = 1;
		this.name = getName(this.badGuy);
		// clothes are stored as indexes for sprites
		// [hair, head, shirt, pants, shoes]
		//heads are 16x16
		//pants and body are 16x32
		this.clothesNums = [] // stores indexes for clothes
		this.numOfHairSprites = 7;
		this.numOfHeadSprites = 6;
		this.numOfShirtSprites = 3;
		this.numOfPantsSprites = 1;
		this.hairPick = Math.round(random(1,this.numOfHairSprites));
		this.headPick = Math.round(random(1,this.numOfHeadSprites));

		this.clothes = [
			new spriteSheet("assets/pants"+Math.round(random(1,this.numOfPantsSprites))+".png",16,32,frametimer,this.x,this.y,faceW,faceH),
			new spriteSheet("assets/shirt"+Math.round(random(1,this.numOfShirtSprites))+".png",16,32,frametimer,this.x,this.y,faceW,faceH),
			new spriteSheet("assets/head"+this.headPick+".png",16,32,frametimer,this.x,this.y,faceW,faceH),
			new spriteSheet("assets/hair"+this.hairPick+".png",16,32,frametimer,this.x,this.y,faceW,faceH),
		] // stores the actual sprite sheets for the clothes
		for(var z of this.clothes){
			z.addState("left",1,8);
			z.addState("right",2,8);
			z.addState("idle",3,1);
		}

		this.face = Math.floor(random(0, 3));
		this.direction = -1; // the direction they are facing


		this.faceOffset = [0,0]
		this.touchindoor = false;
	}
	drawProfile(rect){ // draws the profile picture for binder
		//head
		profileSprites[1].sheetX = 16*this.headPick-16; 
		profileSprites[1].x = rect[0];
		profileSprites[1].y = rect[1];
		profileSprites[1].draw();

		// face
		profileSprites[2].sheetX = profileSprites[0].w*this.face
		profileSprites[2].x = rect[0] + this.faceOffset[0];
		profileSprites[2].y = rect[1] + this.faceOffset[1];
		profileSprites[2].draw();

		// hair
		profileSprites[0].sheetX = 16*this.hairPick-16;
		profileSprites[0].x = rect[0];
		profileSprites[0].y = rect[1];
		profileSprites[0].draw();
	}
	drawPerson(){
		for(var x of this.clothes){
			x.x = this.x;
			x.y = this.y;
			x.frameCalc(1);
			x.draw(1);
			//showText(this.name+", "+this.hairPick+", "+this.headPick,x.x,x.y,10)
		}
		/*
		for(var x of this.walls){
			drawRect(x[0],x[1],x[2],x[3],"blue",1,"black",1)
		}
		for(var x of doors){
			if(x[7]==moniter.currentLocation){
				drawRect(this.rect[0]+this.rect[2]*x[0],this.rect[1]+this.rect[3]*x[1],x[2]*this.rect[2],this.rect[3]*x[3],"red",0,"",1);		
			}
		}
		*/
		//showText(Math.round(this.timer),this.x,this.y,10);
	}
	update(){
		
		if(this.timer <= 0){
			this.timer = random(100,400);
			if(Math.random() > 0.9){
				var temp = [];
				for(var x of doors){
					if(x[7] == this.room){
						temp.push([this.rect[0]+this.rect[2]*x[0],this.rect[1]+this.rect[3]*x[1],x[2]*this.rect[2],this.rect[3]*x[3],x[4],x[5],x[6],x[7],x[8]]);
					}
				}
				if(temp.length > 0){
					var w = temp[Math.round(random(0,temp.length-1))];
					if(restrictedRooms[w[4]] == false || day > 2){
						this.target = w;
						this.touchindoor = true;
					}else{
						this.touchindoor = false;
						this.target = [random(this.rect[0],this.rect[0]+this.rect[2]-this.w),random(this.rect[1],this.rect[1]+this.rect[3]-this.h)];
					}
				}else{
					this.touchindoor = false;
					this.target = [random(this.rect[0],this.rect[0]+this.rect[2]-this.w),random(this.rect[1],this.rect[1]+this.rect[3]-this.h)];
				}
				
			}else{
				this.touchindoor = false;
				this.target = [random(this.rect[0],this.rect[0]+this.rect[2]-this.w),random(this.rect[1],this.rect[1]+this.rect[3]-this.h)];
				
			}
		}else{
			var rads = Math.atan2(this.target[1]-this.y,this.target[0]-this.x);
			if(AABBCollision(this.x,this.y,this.w,this.h,this.target[0],this.target[1],16,16)){
				rads = 0;
				if(this.touchindoor){
					this.room = this.target[4];
					this.timer = 0;
					this.touchindoor = false;


					this.x = this.rect[0]+this.rect[2]*this.target[5];
					
					this.y = this.rect[1]+this.rect[3]*this.target[6];
					
				}
			}else{
				this.x += Math.cos(rads)*this.speed;
				for(var x of this.walls){
					if(AABBCollision(this.x,this.y,this.w,this.h,x[0],x[1],x[2],x[3])){
						if(this.x > x[0]){
							this.x = x[0]+x[2];
						}else{
							this.x = x[0]-this.w;
						}
					}
				}
				this.y += Math.sin(rads)*this.speed;
				for(var x of this.walls){
					if(AABBCollision(this.x,this.y,this.w,this.h,x[0],x[1],x[2],x[3])){
						if(this.y > x[1]){
							this.y = x[1]+x[3];
						}else{
							this.y = x[1]-this.h;
						}
					}
				}
			}
			if(rads == 0){
				for(var x of this.clothes){
					x.state = "idle";
				}	
			}
			else if(Math.cos(rads) < 0){
				this.direction = -1;
				for(var x of this.clothes){
					x.state = "left";
				}
			}else if(Math.cos(rads) > 0){
				this.direction = 1;
				for(var x of this.clothes){
					x.state = "right";
				}
			}
			
		}

		this.timer -= 1;
	}
}