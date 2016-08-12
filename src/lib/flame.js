'use strict';

var Particle = require('./particle');

function createDom(rootElement, width, height) {
	var canvas = document.createElement('canvas');
	if(typeof width === 'number') {
		width = Math.floor(width);
		width += 'px';
	}
	if(typeof height === 'number') {
		height = Math.floor(height);
		height += 'px';
	}
	canvas.setAttribute('width', width);
	canvas.setAttribute('height', height);
	rootElement.appendChild(canvas);
	return canvas.getContext('2d');
}



function frame() {
	
	this.canvasContext.globalCompositeOperation = "source-over";

	this.canvasContext.clearRect(0, 0, this.width, this.height);

	this.canvasContext.globalCompositeOperation = "lighter";

	this.particles.forEach(function(particle, index){
		this.canvasContext.beginPath();
		particle.opacity = Math.round(particle.life/particle.lifetime*100)/100;
		if(!particle.alive || particle.location.x < 0 || particle.location.x > this.width || particle.location.y < 0 || particle.location.y > this.height) {
			particle.alive = false;
			this.particles[index] = this.createParticle();
			return;
		}
		var gradient = this.canvasContext.createRadialGradient(
			particle.location.x, 
			particle.location.y, 
			0, 
			particle.location.x, 
			particle.location.y, 
			particle.radius
		);
		gradient.addColorStop(0, "rgba("+particle.r+", "+particle.g+", "+particle.b+", "+particle.opacity+")");
		gradient.addColorStop(0.5, "rgba("+particle.r+", "+particle.g+", "+particle.b+", "+particle.opacity+")");
		gradient.addColorStop(1, "rgba("+particle.r+", "+particle.g+", "+particle.b+", 0)");
		this.canvasContext.fillStyle = gradient;
		this.canvasContext.arc(particle.location.x, particle.location.y, particle.radius, Math.PI*2, false);
		this.canvasContext.fill();

	}.bind(this));

	requestAnimationFrame(frame.bind(this));

}

function FlameEffect(config) {
	this.init(config);
}

FlameEffect.prototype.createParticle = function() {
	return new Particle(
		this.location.x, 
		this.location.y, 
		{
			x: -2.5+Math.random()*5, 
			y: -1+Math.random()*1
		}, 
		0,					 				// direction
		Math.random() * 10 + 20, 			// lifetime
		Math.random() * 20 + 10 20, 		// radius
		255, 								// r
		255, 								// g
		255, 								// b
		false, 								// decayTime
		false								// decaySize
	);
}

FlameEffect.prototype.init = function(config) {

	this.root = config.root;
	this.width = config.width;
	this.height = config.height;
	this.location = {
		x: config.x,
		y: config.y
	};

	this.canvasContext = createDom(this.root, this.width, this.height);

	this.particles = [];

	var count = 100;

	while(count > 0) {
		this.particles.push(this.createParticle());
		count--;
	}

	requestAnimationFrame(frame.bind(this));
}

module.exports = FlameEffect;