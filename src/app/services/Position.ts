export class Position {
    private readonly _x: number;
    private readonly _y: number;
    private readonly _altitude: number;

    constructor(x: number, y: number, altitude: number | undefined) {
        this._x = x;
        this._y = y;
        this._altitude = altitude ? altitude : 6378137;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get altitude(): number {
        return this._altitude;
    }
}