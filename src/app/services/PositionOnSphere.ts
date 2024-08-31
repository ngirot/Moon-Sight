export class PositionOnSphere {
    private readonly _latitude: number;
    private readonly _longitude: number;
    private readonly _altitude: number;

    constructor(latitude: number, longitude: number, altitude: number | undefined) {
        this._latitude = latitude;
        this._longitude = longitude;
        this._altitude = altitude ? altitude : 6378137;
    }

    get latitude(): number {
        return this._latitude;
    }

    get longitude(): number {
        return this._longitude;
    }

    get altitude(): number {
        return this._altitude;
    }
}