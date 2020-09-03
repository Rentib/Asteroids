function Laser(){
	var x = ship.pos.x;
	var y = ship.pos.y;
	var angle = ship.angle - PI / 2;
	this.pos = createVector(x, y);
	this.v = p5.Vector.fromAngle(angle).mult(10);
	this.r = 5;

	this.update = function(){
		this.pos.add(this.v);
	};

	this.render = function(){
		push();
	    fill(250, 0, 0)
	    ellipse(this.pos.x, this.pos.y, this.r, this.r);
	    rotate(angle - PI / 2);
	    pop();
	};
}