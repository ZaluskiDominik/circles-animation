'use strict'

let mouse = {
    //mouse position
    //!= undefined when mouse is within canvas rect
    pos : undefined,

    //inits mouse events
    init : function()
    {
        this.initMouseMoveEvent();
        this.initMouseLeaveEvent();
        this.initMouseClickEvent();
    },

    //sets callback to mouse move event, keeps track of mouse position
    initMouseMoveEvent : function()
    {
        canvas.onmousemove = (e) => {
            this.pos = {
                x : e.x,
                y : e.y
            };
        };
    },

    //sets handler for mouse leaveing canvas event, changes mouse pos to undefined 
    initMouseLeaveEvent : function()
    {
        canvas.onmouseleave = () => {
            this.pos = undefined;
        };
    },

    //sets callback for mouse click event
    initMouseClickEvent : function()
    {
        canvas.onclick = circles.startMovingToMouse.bind(circles);
    },
};