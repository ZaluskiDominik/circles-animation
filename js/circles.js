'use strict'

let circles = {
    circles : [],
    //true when circles should be moving towards last position of mouse click
    moveToMouse : false,
    //duration of animation while circles move to mouse click point(seconds)
    moveToMouseAnimTime : 1,
    //timer of above animation
    moveToMouseTimeCounter : 0,

    //creates all circles
    init(numCircles = 200)
    {
        for (let i = 0 ; i < numCircles ; i++)
            this.circles.push( new Circle() );
    },

    //starts move to mouse circles animation
    startMovingToMouse : function()
    {
        this.moveToMouse = true;
        this.moveToMouseTimeCounter = 0;

        this.circles.forEach( (circle) => {
            //set new move direction
            circle.velocity = new Vector2D(mouse.pos.x - circle.pos.x, 
                mouse.pos.y - circle.pos.y);
            //scale velocity so that circle will get to mouse click point after
            //moveToMouseAnimTime seconds
            circle.velocity.x /= this.moveToMouseAnimTime;
            circle.velocity.y /= this.moveToMouseAnimTime;
        });
    },

    //draws all circles
    draw()
    {
        this.circles.forEach( (circle) => {
            circle.draw();
        });
    },

    //advance in animation, called from main animation loop
    update : function(deltaTime)
    {
        this.handleMoveToMouse(deltaTime);

        this.circles.forEach( (circle) => {
            circle.updateRadius(deltaTime);
            circle.move(deltaTime);
            circle.updateColor(deltaTime);
        });
    },

    //while moveToMouse is true counts time till moveToMouse animation ends
    handleMoveToMouse : function(deltaTime)
    {
        //exit if moveToMouse animation wasn't started
        if ( !this.moveToMouse )
            return;

        //if timer of animation didn't reached animation duration,
        //increase time animation is running
        if (this.moveToMouseTimeCounter < this.moveToMouseAnimTime)
            this.moveToMouseTimeCounter += deltaTime;
        //else end animation
        else
        {
            this.moveToMouse = false;
            //random new velocities of circles
            this.circles.forEach( (circle) => {
                circle.initVelocity();
            });
        }
    }
};