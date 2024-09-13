import moment from "moment";
import {AxisInfo, Body, HelioVector, Observer, ObserverVector, RotationAxis, Vector} from "astronomy-engine";
import {Position3d} from "@/app/services/Position3d";
import {PositionOnSphere} from "@/app/services/PositionOnSphere";
import {Rotation} from "@/app/services/Rotation";

export enum AstronomicalObject {
    MOON, EARTH, SUN
}

export class SolarSystem {
    private readonly _date: Date;

    constructor(date: moment.Moment) {
        this._date = moment(date).toDate();
        this._date.setMilliseconds(0);
    }

    public position(object: AstronomicalObject): Position3d {
        return toCoord(HelioVector(this.mapObject(object), this._date))
    }

    public rotation(object: AstronomicalObject): Rotation {
        return toRotation(RotationAxis(this.mapObject(object), this._date))
    }

    public locationOnEarth(position: PositionOnSphere): Position3d {
        const location = toObserver(position);
        return toCoord(ObserverVector(this._date, location, true));
    }

    public kmToUnit(kilometers: number): number {
        return 1000 * kilometers / 150000000;
    }

    private mapObject(o: AstronomicalObject): Body {
        switch (o) {
            case AstronomicalObject.SUN:
                return Body.Sun;
            case AstronomicalObject.EARTH:
                return Body.Earth
            case AstronomicalObject.MOON:
                return Body.Moon
        }
    }
}

const toCoord = function (vector: Vector): Position3d {
    return new Position3d(-vector.x, vector.z, vector.y).mult(1000);
}

const toRotation = function (axis: AxisInfo): Rotation {
    const north = new Position3d(axis.north.x, axis.north.y, axis.north.z);
    return new Rotation(north, axis.spin, axis.ra);
}

const toObserver = function (position: PositionOnSphere): Observer {
    return {
        latitude: position.latitude,
        longitude: position.longitude,
        height: position.altitude
    };
}