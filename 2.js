//global handle for canvas and 2d context
let canvas, ctx;

//setup canvas
function initCanvas()
{
	canvas=document.getElementById("canvas");
	ctx=canvas.getContext("2d");
	//resize canvas
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;

	//resize background image
	canvas.style.backgroundSize=canvas.width + "px " + canvas.height + "px";
}

//mouse position
let mouse={
	x: undefined,
	y: undefined
}

//receive mouse move event
window.addEventListener("mousemove", function(event)
{
	mouse.x=event.x;
	mouse.y=event.y;
}
)

//receive mouse click event
window.addEventListener("click", function(event)
{
	//all circles should be heading to mouse cursor position
	for (let i=0 ; i<circles.length ; i++)
	{
		let dist=Math.sqrt(Math.pow(event.x - circles[i].x, 2) + Math.pow(event.y - circles[i].y, 2));
		circles[i].moveToCursorStep=Math.random() * 5 + 10;
		circles[i].moveToCursorNumSteps=Math.round(dist/circles[i].moveToCursorStep);
		circles[i].moveToCursorAngle=Math.acos((event.x - circles[i].x)/dist);
		if (event.y>circles[i].y)
			circles[i].moveToCursorAngle*=-1;
	}
}
)

//rgb class
let Rgb=function(r, g, b)
{
	this.r=r;
	this.g=g;
	this.b=b;
	this.rgbString=function()
	{
		//return rgb color formatted to css properties
		return "rgb(" + this.r+ "," + this.g + "," + this.b + ")";
	}
} 

//circle class
let Circle=function(x, y, radius, vx, vy)
{
	//circle's coordinates
	this.x=x;
	this.y=y;
	//2d velocity
	this.vx=vx;
	this.vy=vy;

	this.baseRadius=radius;
	this.radius=radius;
	this.maxRadius=Math.max(radius * 4, 30);
	
	//ranom circle's color
	this.color=new Rgb(Math.random() * 255, Math.random() * 255, Math.random() * 255);
	//stage of color animation
	this.colorStage=0;
	//value added in each step to r,g,b
	this.colorStep=0.7;

	this.moveToCursorStep=null;
	this.moveToCursorNumSteps=null;
	this.moveToCursorAngle=null;

	//draw the circle on the screen
	this.draw=function()
	{
		ctx.width=5;
		ctx.fillStyle=this.color.rgbString();
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 360);
		ctx.fill();
	}

	//circle grows when it is near the mouse cursor position
	this.growAnimation=function()
	{
		if (mouse.x==undefined || mouse.y==undefined)
			return;

		if (Math.sqrt(Math.pow(mouse.x - this.x, 2) + Math.pow(mouse.y - this.y, 2))<60)
		{
			//grow
			if (this.radius<this.maxRadius)
				this.radius++;
		}
		else
		{
			//shrink
			if (this.radius>this.baseRadius)
				this.radius--;
		}
	}

	this.moveAnimation=function()
	{
		this.x+=this.vx;
		this.y+=this.vy;
		//left and right boundaries
		if (this.x<this.radius || this.x + this.radius>canvas.width)
			this.vx*=-1;
		//top and bottom boundaries
		if (this.y<this.radius || this.y + this.radius>canvas.height)
			this.vy*=-1;	
	}

	//change shades of base circle's color
	this.colorAnimation=function()
	{
		this.colorStage+=this.colorStep;
		if (this.colorStage>40 || this.colorStage<-40)
			this.colorStep*=-1;
		this.color.r=(this.color.r + this.colorStep>=0 && this.color.r + this.colorStep<=255) ? this.color.r + this.colorStep : this.color.r;
		this.color.g=(this.color.g + this.colorStep>=0 && this.color.g + this.colorStep<=255) ? this.color.g + this.colorStep : this.color.g;
		this.color.b=(this.color.b + this.colorStep>=0 && this.color.b + this.colorStep<=255) ? this.color.b + this.colorStep : this.color.b;
	}

	//circle goes to mouse click position
	this.moveToCursorAnimation=function()
	{
		this.x+=this.moveToCursorStep * Math.cos(this.moveToCursorAngle);
		this.y+=this.moveToCursorStep * Math.sin(this.moveToCursorAngle) * -1;

		if (--this.moveToCursorNumSteps==0)
		{
			//circle got to mouse click's position
			this.moveToCursorStep=null;
			this.moveToCursorNumSteps=null;
			this.moveToCursorAngle=null;
		}
	}

	//update animation frame
	this.update=function()
	{
		//if mouse click occured circle is heading to click's position
		if (this.moveToCursorStep!=null)
			this.moveToCursorAnimation();
		else
			this.moveAnimation();

		this.growAnimation();
		this.colorAnimation();
	}
}

//array of circles
let circles=[];

function createCircles(count)
{
	for (let i=0 ; i<count ; i++)
	{
		let r=Math.random() * 10 + 1;
		let newCircle=new Circle(Math.random() * (canvas.width - (r*2)) + r, Math.random() * (canvas.height - (r*2)) + r, r, Math.random() * 3 - 1.5, Math.random() * 3 - 1.5);
		circles.push(newCircle);
		newCircle.draw();
	}
}

function animatonLoop()
{
	window.requestAnimationFrame(animatonLoop);

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let i=0 ; i<circles.length ; i++)
	{
		circles[i].update();
		circles[i].draw();
	}
}

//startup function
initCanvas();
createCircles(300);
animatonLoop();