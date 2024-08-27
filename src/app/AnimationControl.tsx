import {DateSelector} from "@/app/DateSelector";
import {SpeedSelector} from "@/app/SpeedSelector";
import {AnimationFlowState, AnimationParams} from "@/app/AnimationParams";
import {useEffect, useState} from "react";
import moment, {Moment} from "moment";
import {LocalDate} from "@/app/LocalDate";
import {Box, Stack} from "@mui/system";
import {Card, Divider, Typography} from "@mui/material";

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
    const [animationState, setAnimationState] = useState<AnimationFlowState>(AnimationFlowState.PLAY);
    const [speed, setSpeed] = useState<number>(animationParams.animationSpeed);
    const [currentAnimationParam, setCurrentAnimationParam] = useState<Wrapper>(new Wrapper(animationParams));

    const update = (animationParams: AnimationParams) => {
        updateAnimationParams(animationParams);
        currentAnimationParam.animationParams = animationParams;
    }

    const handleDate = (date: Moment) => {
        update(animationParams.withStartDate(date).withAnimationStartDate(date).withAnimationSpeed(0));
        setAnimationState(AnimationFlowState.PAUSE);
    }

    const handleAnimationSpeed = (s: number) => {
        setSpeed(s);

        if (animationState !== AnimationFlowState.PAUSE) {
            const newAnimationParams = animationParams
                .withAnimationSpeed(s)
                .withStartDate(animationParams.renderDate())
                .withAnimationStartDate(moment());

            update(newAnimationParams);
        }
    }

    const handleState = (newState: AnimationFlowState) => {
        setAnimationState(newState);
        let newSpeed = 0;
        if (newState === AnimationFlowState.PLAY) {
            newSpeed = speed;
        }
        if (newState === AnimationFlowState.REWIND) {
            newSpeed = -speed;
        }

        const newDate = animationParams.renderDate();
        update(animationParams.withStartDate(newDate).withAnimationStartDate(moment()).withAnimationSpeed(newSpeed))
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
        <Card variant="outlined" sx={{maxWidth: 360}}>
            <Box sx={{p: 2}} align="center">
                <Typography gutterBottom variant="h5" component="div">
                    <LocalDate date={displayDate}></LocalDate>
                </Typography>
                <DateSelector date={animationParams.startDate} updateDate={handleDate}></DateSelector>
            </Box>
            <Divider/>
            <Box sx={{p: 2}}>
                <Stack direction="row" spacing={1}>
                    <SpeedSelector animationSpeed={speed}
                                   updateAnimationSpeed={handleAnimationSpeed}
                                   animationState={animationState}
                                   updateAnimationState={handleState}></SpeedSelector>
                </Stack>
            </Box>
        </Card>
    </>
}