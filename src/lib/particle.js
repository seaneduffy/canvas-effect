function frame() {
	
	if(!this.alive) {

		return;

	}

	if(this.decayTime) {

		this.life--;

	}

	if(this.decaySize) {

		this.radius--;

	}

	this.location.x += this.speed.x;

	this.location.y += this.speed.y;
	
	if((this.decayTime && this.remaining_life < 0) || (this.decaySize && this.radius < 0)) {

		this.alive = false;

	} else {

		requestAnimationFrame(frame.bind(this));

	}
}

function Particle(originX, originY, speed, direction, lifetime, radius, r, g, b, decayTime, decaySize) {
	this.speed = speed;
	this.location = {
		x: originX, 
		y: originY
	};
	this.radius = radius;
	this.lifetime = this.life = lifetime;
	this.r = r;
	this.g = g;
	this.b = b;
	this.alive = true;
	this.decayTime = decayTime;
	this.decaySize = decaySize;
	requestAnimationFrame(frame.bind(this));
}

module.exports = Particle;