'use client';

import {Moon} from "@/app/Moon";
import {Grid} from "@mui/material";
import moment, {Moment} from "moment";
import {useState} from "react";
import {DateSelector} from "@/app/DateSelector";
import {NavBar} from "@/app/NavBar";

export default function Home() {
    let [date, setDate] = useState<Moment>(moment());

    return (
        <div>
            <NavBar></NavBar>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Moon date={date}></Moon>
                </Grid>
                <Grid item xs={4}>
                    <DateSelector date={date} updateDate={setDate}></DateSelector>
                </Grid>
            </Grid>
        </div>
    );
}
