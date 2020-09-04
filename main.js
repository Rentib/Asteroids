var ship;
var asteroids = [];
var lasers = [];
var windowSize;
function setup(){
	windowSize = min(windowWidth, windowHeight) - 10;
	createCanvas(windowSize, windowSize);
	ship = new Ship();
	spawnAsteroids();
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
	spawnAsteroids();
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

function spawnAsteroids(){
	while(asteroids.length < windowSize / 100){
		asteroids.push(new Asteroid());
		var index = asteroids.length - 1;
		var d = dist(ship.pos.x, ship.pos.y, asteroids[index].pos.x, asteroids[index].pos.y);
		if(d < 50)
			asteroids.splice(index, 1);
	}
}
