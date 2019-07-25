'use strict'

//global handles for canvas and 2d context
let canvas, ctx;

//inits handles for canvas and 2d context, sets fixed size of the canvas
function initCanvas()
{
    canvas = document.getElementsByTagName("canvas")[0];
    ctx = canvas.getContext("2d");
    
    //set fixed size of canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
