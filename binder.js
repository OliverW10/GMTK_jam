
class Page{
	constructor(people, ppp){
		this.people = people;
		this.peoplePos = []; // [X, Y, S]
		this.ppp = ppp;
		for(var i = 0; i < this.people.length; i += 1){
			this.peoplePos.push([0.05, (i+0.1)/this.ppp, 0.2, 0.4]);
		}
	}
	draw(rect){
		c.beginPath();
		c.strokeStyle = "black";
		c.rect(...rect);
		c.stroke();
		for(var i = 0; i < this.people.length; i += 1){
			c.beginPath();
			c.fillStyle = "rgb(50, 50, 150)";
			// also uses personRect to draw all the features
			var personRect = [rect[0] + rect[2]*this.peoplePos[i][0], rect[1] + rect[3]*this.peoplePos[i][1], rect[2]*this.peoplePos[i][2], rect[3]*this.peoplePos[i][2]]; // pfp size is based on on height of rect
			c.fillRect(...personRect);
			if(checkKey("KeyH") === true){
				console.log(personRect)
			}
		}
	}
}

class Binder{
	constructor(peopleList){
		this.people = peopleList;
		this.pages = [];
		this.page = 0;
		this.ppp = 4; // people per page
		for(var i = 0; i < Math.ceil(this.people.length/this.ppp); i ++){
			this.pages.push(new Page(this.people.slice(i*this.ppp, (i+1)*this.ppp), this.ppp))
		}
	}
	draw(rect){
		this.pages[this.page].draw(rect)
	}
}