import {InputAdornment, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import * as React from "react";
import {AnimationFlowState} from "@/app/services/AnimationParams";

interface SpeedSelectorProps {
    animationSpeed: number;
    updateAnimationSpeed: (speed: number) => void;
    animationState: AnimationFlowState;
    updateAnimationState: (state: AnimationFlowState) => void;
}

export function SpeedSelector({
                                  animationSpeed,
                                  updateAnimationSpeed,
                                  animationState,
                                  updateAnimationState
                              }: SpeedSelectorProps) {

    const handleFLowState = (_: React.MouseEvent<HTMLElement>, newFLowState: AnimationFlowState | null,
    ) => {
        if (newFLowState !== null) {
            updateAnimationState(newFLowState);
        }
    };

    const updateAnimationSpeedFromEvent = (e: any) => {
        if (!e.target.value) {
            updateAnimationSpeed(0);
        } else {
            updateAnimationSpeed(e.target.value);
        }
    }

    return <>
        <ToggleButtonGroup
            sx={{m: 1, width: '25ch'}}
            value={animationState}
            exclusive
            onChange={handleFLowState}
            aria-label="text alignment"
        >
            <ToggleButton value={AnimationFlowState.PAUSE} aria-label="left aligned">
                <PauseIcon/>
            </ToggleButton>
            <ToggleButton value={AnimationFlowState.REWIND} aria-label="centered">
                <FastRewindIcon/>
            </ToggleButton>
            <ToggleButton value={AnimationFlowState.PLAY} aria-label="centered">
                <PlayArrowIcon/>
            </ToggleButton>
        </ToggleButtonGroup>
        <TextField
            label="Speed"
            id="outlined-start-adornment"
            value={animationSpeed}
            onChange={updateAnimationSpeedFromEvent}
            sx={{m: 1, width: '25ch'}}
            InputProps={{
                startAdornment: <InputAdornment position="start">x</InputAdornment>,
            }}
        />
    </>
}