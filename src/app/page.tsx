'use client';

import {Moon} from "@/app/Moon";
import {LocalizationProvider, StaticDateTimePicker} from "@mui/x-date-pickers";
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'
import {Grid} from "@mui/material";
import moment, {Moment} from "moment";
import dynamic from "next/dynamic";
import {useState} from "react";

export default function Home() {
    let [date, setDate] = useState<Moment>(moment());

    const updateDate = (d: Moment | null) => {
        if (d !== null) {
            setDate(d);
        }
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Moon date={date}></Moon>
                </Grid>
                <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <StaticDateTimePicker value={date} onChange={updateDate}/>
                    </LocalizationProvider>
                </Grid>
            </Grid>
        </div>
    );
}
