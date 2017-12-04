function Game(stage,xocolor,doc,datastore,activity){
	this.margin = 0;
	this.radius = 0;
	this.circleswidth = 0;
	this.circlesheight = 0;
	this.colours = [xocolor.stroke,xocolor.fill];

	this.gridwidth = 7;
	this.gridheight = 7;
	this.numFlips = 14;
	this.startgridwidth = 4;
	this.startgridheight = 4;

	this.dots = [];
	this.stack = [];


	//Helper functions
	this.radiusFromX = function(){
		this.margin = 1/50*stage.canvas.width;
		var diameter = (stage.canvas.width-(this.margin*(this.gridwidth+1)))/this.gridwidth;
		var radius = diameter/2;
		return radius;
	}

	this.radiusFromY = function(){
		this.margin = 1/50*stage.canvas.height;
		var diameter = (stage.canvas.height-(this.margin*(this.gridheight+1)))/this.gridheight;
		var radius = diameter/2;
		return radius;
	}

	this.canDoFromX = function(){
		var rad = this.radiusFromX();
		this.margin = 1/50*stage.canvas.width;
		if ((((rad*2)*this.gridheight)+(this.margin*(this.gridheight+1)))<=stage.canvas.height){
			return rad;
		} else {
			return false;
		}
	}

	this.checkGameOver = function(){
		for (var x = 0; x<this.startgridwidth; x++){
			for (var y = 0; y<this.startgridheight; y++){
				if (this.dots[x][y].colour!=0){
					return false;
				}
			}
		}
		return true;
	}

	this.flip = function(x,y,playing){
		this.stack.push([x,y]);
		if (playing===undefined){playing=true;}
		//console.log("flipdots");
		this.dots[x][y].flipSelf();
		if (0<y){
			this.dots[x][y-1].flipSelf();
		}
		if (0<x){
			this.dots[x-1][y].flipSelf();
		}
		if (y<this.startgridheight-1){
			this.dots[x][y+1].flipSelf();
		}
		if (x<this.startgridwidth-1){
			this.dots[x+1][y].flipSelf();
		}
		if (playing){
			if (this.checkGameOver()){
				console.log("game over");
			}
		}
	}

	this.getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	this.flipRandomDot = function(){
		this.flip(this.getRandomInt(0,this.startgridwidth-1),this.getRandomInt(0,this.startgridheight-1),false);
	}

	this.initDots = function(){
		this.dots = [];
		var temparr = [];
		var incr = (this.radius*2+this.margin);
		var xp = (stage.canvas.width-this.circleswidth)/2+this.margin;
		var yp = this.margin;

		for (var x = 0; x<this.startgridwidth; x++){
			temparr = [];
			yp = this.margin;
			for (var y = 0; y<this.startgridheight; y++){
				//console.log(x);
				//console.log(y);
				var s = new Dot(stage,xp+this.radius,yp+this.radius,this.colours,0,this.radius,this,x,y);
				s.init();
				temparr.push(s);
				//console.log(s);
				yp+=incr;
			}
			this.dots.push(temparr);
			xp+=incr;
		}
		//console.log(this.dotsarr);
	}

	this.calculateDimensions = function(){
		var rad = this.canDoFromX();
		if (rad===false){
			rad = this.radiusFromY();
		}
		this.radius = rad;
		this.circleswidth = this.radius*2*this.startgridwidth+this.margin*(this.startgridwidth+1);
		this.circlesheight = this.radius*2*this.startgridheight+this.margin*(this.startgridheight+1);
	}

	this.newGame = function(){
		stage.removeAllChildren();
		this.calculateDimensions();
		this.initDots();
		console.log(this.dots);
		for (var i = 0; i<14; i++){
			this.flipRandomDot();
		}
	}

	this.init = function(){
		this.newGame();
	}
}