'use client';

import {Moon} from "@/app/components/Moon";
import {Grid} from "@mui/material";
import moment from "moment";
import {useState} from "react";
import {NavBar} from "@/app/components/NavBar";
import {AnimationControl} from "@/app/components/AnimationControl";
import {AnimationParams} from "@/app/services/AnimationParams";
import {CoordInput} from "@/app/components/CoordInput";
import {Stack} from "@mui/system";
import {PositionOnSphere} from "@/app/services/PositionOnSphere";

export default function Home() {
    const positionDefault = new PositionOnSphere(48.866667, 2.333333, undefined);
    let [animationParams, setAnimationParams] = useState<AnimationParams>(new AnimationParams(positionDefault, moment(), moment(), 1));

    const updatePosition = (p: PositionOnSphere) => {
        setAnimationParams(animationParams.withPosition(p));
    }

    return (
        <div>
            <NavBar></NavBar>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Moon animationParams={animationParams}></Moon>
                </Grid>
                <Grid item xs={4}>
                    <Stack spacing={2}>
                        <AnimationControl animationParams={animationParams}
                                          updateAnimationParams={setAnimationParams}></AnimationControl>
                        <CoordInput position={animationParams.position}
                                    updatePosition={updatePosition}></CoordInput>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    );
}
