import {DatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {Moment} from "moment/moment";
import {Button, Grid, InputLabel} from "@mui/material";
import moment from "moment";

interface DateSelectorProps {
    date: Moment;
    updateDate: (date: Moment) => void;
}

export function DateSelector({date, updateDate}: DateSelectorProps) {
    const updateDateFilteringNull = (d: Moment | null) => {
        if (d !== null) {
            updateDate(d);
        }
    }

    const resetDate = () => {
        updateDateFilteringNull(moment());
    }

    return <LocalizationProvider dateAdapter={AdapterMoment}>
        <Grid container spacing={2}>
            <Grid item xs={12}><InputLabel>Select date</InputLabel></Grid>
            <Grid item xs={12}><DatePicker value={date} onChange={updateDateFilteringNull}/></Grid>
            <Grid item xs={12}><TimePicker value={date} onChange={updateDateFilteringNull}/></Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="secondary" onClick={resetDate}>Now</Button>
            </Grid>
        </Grid>
    </LocalizationProvider>;
}