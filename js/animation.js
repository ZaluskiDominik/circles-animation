'use strict'

let animation = {
	init : function()
	{
		initCanvas();
		circles.init();
		mouse.init();
	},

	//starts animation
	start : function()
	{
		this.updateFrameTimestamps();
		this.mainLoop();
	},

	drawBackground : function()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	},

	//returns times(seconds) elapsed between previous and current frames
	getTimeBetweenFrames : function()
	{
		return this.currFrameTimestamp - this.prevFrameTimestamp;
	},

	//updates timestamp of previous frame occurance, and gets timestamp of current frame
	updateFrameTimestamps : function()
	{
		this.prevFrameTimestamp = this.currFrameTimestamp;
		this.currFrameTimestamp = performance.now() / 1000;
	},

	//animation loop, called when each frame is ready
	mainLoop : function()
	{
		window.requestAnimationFrame(this.mainLoop.bind(this));

		//get deltaTime between frames
		this.updateFrameTimestamps();
		let deltaTime = this.getTimeBetweenFrames();

		this.drawBackground();

		//update and draw circles
		circles.update(deltaTime);
		circles.draw();
	}
};

animation.init();
animation.start();