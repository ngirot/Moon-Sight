import {DateSelector} from "@/app/DateSelector";
import {SpeedSelector} from "@/app/SpeedSelector";
import {AnimationParams} from "@/app/AnimationParams";
import {useEffect, useState} from "react";
import moment, {Moment} from "moment";
import {LocalDate} from "@/app/LocalDate";

interface AnimationControlProps {
    animationParams: AnimationParams;
    updateAnimationParams: (ap: AnimationParams) => void;
}

class Wrapper {
    public animationParams: AnimationParams;

    constructor(animationParams: AnimationParams) {
        this.animationParams = animationParams;
    }
}

export function AnimationControl({animationParams, updateAnimationParams}: AnimationControlProps) {
    const [displayDate, setDisplayDate] = useState<Moment>(animationParams.renderDate());
    const [animationState, setAnimationState] = useState<boolean>(true);
    const [speed, setSpeed] = useState<number>(animationParams.animationSpeed);
    const [currentAnimationParam, setCurrentAnimationParam] = useState<Wrapper>(new Wrapper(animationParams));

    const update = (animationParams: AnimationParams) => {
        updateAnimationParams(animationParams);
        currentAnimationParam.animationParams = animationParams;
    }

    const handleDate = (date: Moment) => {
        update(animationParams.withStartDate(date).withAnimationStartDate(date));
    }

    const handleAnimationSpeed = (s: number) => {
        setSpeed(s);

        if (animationState) {
            const newAnimationParams = animationParams
                .withAnimationSpeed(s)
                .withStartDate(animationParams.renderDate())
                .withAnimationStartDate(moment());

            update(newAnimationParams);
        }
    }

    const handleState = (s: boolean) => {
        setAnimationState(s);
        if (s) {
            update(animationParams.withAnimationSpeed(speed).withAnimationStartDate(moment()));
        } else {
            const newDate = animationParams.renderDate();
            update(animationParams.withStartDate(newDate).withAnimationStartDate(moment()).withAnimationSpeed(0));
        }
    }

    useEffect(() => {
        const timerID = setInterval(() => {
            setDisplayDate(currentAnimationParam.animationParams.renderDate());
        }, 100);
        return () => {
            clearInterval(timerID);
        };
    }, []);

    return <>
        <LocalDate date={displayDate}></LocalDate>
        <DateSelector date={animationParams.startDate} updateDate={handleDate}></DateSelector>
        <SpeedSelector animationSpeed={speed}
                       updateAnimationSpeed={handleAnimationSpeed}
                       animationState={animationState}
                       updateAnimationState={handleState}></SpeedSelector>
    </>
}