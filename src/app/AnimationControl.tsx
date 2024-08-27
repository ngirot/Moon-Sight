import {DateSelector} from "@/app/DateSelector";
import {SpeedSelector} from "@/app/SpeedSelector";
import {AnimationParams} from "@/app/AnimationParams";
import {useState} from "react";
import moment, {Moment} from "moment";

interface AnimationControlProps {
    animationParams: AnimationParams;
    updateAnimationParams: (ap: AnimationParams) => void;
}

export function AnimationControl({animationParams, updateAnimationParams}: AnimationControlProps) {
    const [animationState, setAnimationState] = useState<boolean>(true);
    const [speed, setSpeed] = useState<number>(animationParams.animationSpeed);

    const handleDate = (date: Moment) => {
        updateAnimationParams(animationParams.withStartDate(date).withAnimationStartDate(date));
    }

    const handleAnimationSpeed = (s: number) => {
        setSpeed(s);

        if (animationState) {
            const newAnimationParams = animationParams
                .withAnimationSpeed(s)
                .withStartDate(animationParams.renderDate())
                .withAnimationStartDate(moment());

            updateAnimationParams(newAnimationParams);
        }
    }

    const handleState = (s: boolean) => {
        setAnimationState(s);
        if (s) {
            updateAnimationParams(animationParams.withAnimationSpeed(speed).withAnimationStartDate(moment()));
        } else {
            const newDate = animationParams.renderDate();
            updateAnimationParams(animationParams.withStartDate(newDate).withAnimationStartDate(moment()).withAnimationSpeed(0));
        }
    }

    return <>
        <DateSelector date={animationParams.startDate} updateDate={handleDate}></DateSelector>
        <SpeedSelector animationSpeed={speed}
                       updateAnimationSpeed={handleAnimationSpeed}
                       animationState={animationState}
                       updateAnimationState={handleState}></SpeedSelector>
    </>
}