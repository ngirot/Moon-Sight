export class Position3d {
    private readonly _x: number;
    private readonly _y: number;
    private readonly _z: number;

    constructor(x: number, y: number, z: number) {
        this._x = x;
        this._y = y;
        this._z = z;
    }


    public mult(coefficient: number): Position3d {
        return new Position3d(this._x * coefficient, this._y * coefficient, this._z * coefficient);
    }

    public add(addend: Position3d): Position3d {
        return new Position3d(this._x + addend._x, this._y + addend._y, this._z + addend._z);
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get z(): number {
        return this._z;
    }
}