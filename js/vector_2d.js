'use strict'

class Vector2D
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    //returns length of an vector
    getLength()
    {
        return Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) );
    }
}