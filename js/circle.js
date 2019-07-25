'use strict'

class Circle extends AbstractObject
{
    constructor()
    {
        super();
        this.initColor();
        this.initRadius();
        this.initVelocity();
        this.initPos();
    }

    //rand position of center point of circle
    initPos()
    {
        this.pos.x = Circle.randFrom(this.radius, canvas.width - this.radius);
        this.pos.y = Circle.randFrom(this.radius, canvas.height - this.radius);
    }

    initColor()
    {
        this.color = this.randColor();
        this.nextColor = this.randColor();
    }

    changeNextColor()
    {
        this.nextColor = this.randColor();        
    }

    //returns random color
    randColor()
    {
        return new Rgb(Math.random() * 255, Math.random() * 255, Math.random() * 255);
    }

    //velocity - pixels per second
    initVelocity()
    {
        //max and min velocities
        let max = 50;
        let min = -50;

        this.velocity = new Vector2D( Circle.randFrom(min, max),
            Circle.randFrom(min, max) );
    }

    //rand radius of this circle
    //radius - currentRadius(grows while circle is near mouse position)
    //baseRadius - originally randomized radius
    initRadius()
    {
        this.baseRadius = this.radius = Circle.randFrom(Circle.minRadius, Circle.maxRadius);
    }

    //draws circle on canvas
    draw()
    {
        ctx.fillStyle = this.color.getStr();
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 360);
        ctx.fill();
    }

    //if circle is near mouse position its radius will grow
    //after leaving area nearby mouse radius will shrink to original value
    updateRadius(deltaTime)
    {
        let growFactor = Circle.radiusGrowPerSec * deltaTime;

        let mouseNear = mouse.pos !== undefined && 
            this.distanceToPoint(mouse.pos.x, mouse.pos.y) < Circle.maxDistFromMouseToGrow;
        this.radius += ( mouseNear ) ? growFactor : -growFactor;

        if (this.radius < this.baseRadius)
            this.radius = this.baseRadius;
        else if (this.radius > Circle.maxRadius * 2)
            this.radius = Circle.maxRadius * 2;
    }

    //moves circle in direction pointing by velocity vector
    move(deltaTime)
    {
        this.pos.x += this.velocity.x * deltaTime;
        this.pos.y += this.velocity.y * deltaTime;

        //if circles is outside canvas horizontally change x of velocity vetor to opposite
        if ( this.pos.x < this.radius || this.pos.x + this.radius > canvas.width )
            this.velocity.x *= -1;
        //if circles is outside canvas vertically change y of velocity vetor to opposite
        if ( this.pos.y < this.radius || this.pos.y + this.radius > canvas.height )
            this.velocity.y *= -1;

        this.repositionIfOutsideCanvas();
    }

    //if circle is outside of canvas rect its position coordinates gets clipped
    //to nearest extremum value, so that circle will be within canvas
    repositionIfOutsideCanvas()
    {
        //x < 0
        if (this.pos.x < this.radius)
            this.pos.x = this.radius;
        //x > width
        else if (this.pos.x + this.radius > canvas.width)
            this.pos.x = canvas.width - this.radius;

        //y < 0
        if (this.pos.y < this.radius)
            this.pos.y = this.radius;
        //y > height
        else if (this.pos.y + this.radius > canvas.height)
            this.pos.y = canvas.height - this.radius;
    }

    updateColor(deltaTime)
    {
        //counter of color's elements(r, g, b) that already reached the same value as for nextColor
        let numColorElemReached = 0;
        
        ['r', 'g', 'b'].forEach( (c) => {
            //if already reached the same value as for nextColor
            if ( Math.abs(this.nextColor[c] - this.color[c]) <= Circle.colorIncreasePerSec )
            {
                this.color[c] = this.nextColor[c];
                //increment counter and continue to next color element
                numColorElemReached++;
                return;
            }

            //factor by which element of an color will be increased/decreased
            let changeFactor = Circle.colorIncreasePerSec * deltaTime * 
                Math.pow(-1, this.nextColor[c] < this.color[c]);
            this.color[c] += changeFactor;
        });

        //rand new next color if color = nextColor
        if (numColorElemReached === 3)
            this.changeNextColor();
    }
}

//max radius that circle can rand
Circle.maxRadius = 15;
//min radius that circle can rand
Circle.minRadius = 2;

//how many pixels circle's radius grow per second when mouse is nearby
Circle.radiusGrowPerSec = 60;
//max distance of circle from mouse position within wich circle grows
Circle.maxDistFromMouseToGrow = 60;

//increase factor per second of each 'r', 'g' and 'b' element of an color
//color of circle is interpolated between start color and next color
Circle.colorIncreasePerSec = 30;