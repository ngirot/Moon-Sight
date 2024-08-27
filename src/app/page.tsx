'use client';

import {Moon} from "@/app/Moon";
import {Grid} from "@mui/material";
import moment from "moment";
import {useState} from "react";
import {NavBar} from "@/app/NavBar";
import {AnimationControl} from "@/app/AnimationControl";
import {AnimationParams} from "@/app/AnimationParams";

export default function Home() {
    let [animationParams, setAnimationParams] = useState<AnimationParams>(new AnimationParams(moment(), moment(), 1));

    return (
        <div>
            <NavBar></NavBar>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Moon animationParams={animationParams}></Moon>
                </Grid>
                <Grid item xs={4}>
                    <AnimationControl animationParams={animationParams}
                                      updateAnimationParams={setAnimationParams}></AnimationControl>
                </Grid>
            </Grid>
        </div>
    );
}
