import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {Moment} from "moment/moment";

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

    return <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateTimePicker label="Force a date" value={date} onChange={updateDateFilteringNull}/>
    </LocalizationProvider>;
}