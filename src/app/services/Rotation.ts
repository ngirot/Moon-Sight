import {Position3d} from "@/app/services/Position3d";

export class Rotation {
    private readonly _north: Position3d;
    private readonly _spin: number;
    private readonly _ra: number;

    constructor(north: Position3d, spin: number, ra: number) {
        this._north = north;
        this._spin = spin;
        this._ra = ra;
    }

    get north(): Position3d {
        return this._north;
    }

    get spin(): number {
        return this._spin;
    }

    get ra(): number {
        return this._ra;
    }
}