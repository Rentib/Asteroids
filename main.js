var ship;
var asteroids = [];
var lasers = [];
function setup(){
	var k = min(windowWidth, windowHeight) - 10;
	createCanvas(k, k);
	ship = new Ship();
	for(var i = 0;i < k / 100;i++){
		asteroids.push(new Asteroid());
	}
}
function draw(){
	background(0);
	ship.render();
	ship.update();
	ship.edges();

	for(var i = 0;i < lasers.length;i++){
		lasers[i].render();
		lasers[i].update();
		var x = lasers[i].pos.x;
		var y = lasers[i].pos.y;
		if(x < -width || x > 2 * width || y < -height || y > 2 * height)
			lasers.splice(i, 1);
	}

	for(var i = 0;i < asteroids.length;i++){
		asteroids[i].render();
		asteroids[i].update();
		asteroids[i].edges();
		if(asteroids[i].collision(ship))
			ship.destroy();
		for(var j = 0;j < lasers.length;j++){
			if(asteroids[i].collision(lasers[j])){
				lasers.splice(j, 1);
				splitAsteroid(asteroids[i], i);
				return;
			}
		}
	}
	if(asteroids.length == 0){
		for(var i = 0;i < 10;i++)
			asteroids.push(new Asteroid());
	}
}
function keyPressed(){
	if(keyCode === LEFT_ARROW){
		ship.rotateBoost = -0.1;
		ship.isRotating = 1;
	}
	if(keyCode === RIGHT_ARROW){
		ship.rotateBoost = 0.09;
		ship.isRotating = 1;
	}
	if(keyCode === UP_ARROW)
		ship.isBoosting = 1;
	if(key == ' ')
		lasers.push(new Laser());
}
function keyReleased(){
	if(keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW)
		ship.isRotating = 0.9;
	if(keyCode === UP_ARROW)
		ship.isBoosting = 0.99;
}
