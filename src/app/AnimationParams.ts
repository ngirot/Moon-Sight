import moment, {Moment} from "moment";

export class AnimationParams {
    private readonly _startDate: Moment;
    private readonly _animationStartDate: Moment;
    private readonly _animationSpeed: number;

    constructor(startDate: moment.Moment, animationStartDate: moment.Moment, animationSpeed: number) {
        this._startDate = startDate;
        this._animationStartDate = animationStartDate;
        this._animationSpeed = animationSpeed;
    }

    get startDate(): moment.Moment {
        return this._startDate;
    }

    get animationStartDate(): moment.Moment {
        return this._animationStartDate;
    }

    get animationSpeed(): number {
        return this._animationSpeed;
    }

    public renderDate(): Moment {
        const elapsed = (moment().valueOf() - this._animationStartDate.valueOf());
        return moment(this._startDate).add(elapsed * this._animationSpeed, 'millisecond');
    }

    public withStartDate(startDate: Moment): AnimationParams {
        return new AnimationParams(startDate, this._animationStartDate, this._animationSpeed);
    }

    public withAnimationStartDate(animationStartDate: Moment): AnimationParams {
        return new AnimationParams(this._startDate, animationStartDate, this._animationSpeed);
    }

    public withAnimationSpeed(animationSpeed: number): AnimationParams {
        return new AnimationParams(this._startDate, this._animationStartDate, animationSpeed);
    }

}