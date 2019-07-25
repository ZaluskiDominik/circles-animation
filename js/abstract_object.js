'use strict'

class AbstractObject
{
    constructor(posX, posY)
    {
        //position of an object on canvas
        this.pos = {
            x : posX,
            y : posY
        };
    }

    //returns distance of this object to another object
    distanceToObject(abstractObject)
    {
        return this.distanceToPoint(abstractObject.pos.x, abstractObject.pos.y);
    }

    //returns distance of this object to some point
    distanceToPoint(x, y)
    {
        return Math.sqrt( Math.pow(this.pos.x - x, 2) + Math.pow(this.pos.y - y, 2) );
    }

    //changes degrees to radians
    rad(degAngle)
    {
        return Math.PI / 180 * degAngle;
    }

    //returns random number from given (min, max) interval
    static randFrom(min, max)
    {
        return Math.random() * (max - min) + min;
    }
}