'use strict'

class Rgb
{
    constructor(r, g, b)
    {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    //returns string representation of rgb color
    getStr()
    {
        return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
    }
}