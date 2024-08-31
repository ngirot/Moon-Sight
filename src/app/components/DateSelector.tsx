import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {Moment} from "moment/moment";
import 'moment/min/locales';
import {currentLocale} from "@/app/services/LocaleService";
import {useEffect, useState} from "react";

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

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true);
    }, [])

    return <div>
        {isClient ? <LocalizationProvider adapterLocale={currentLocale()} dateAdapter={AdapterMoment}>
            <DateTimePicker label="Force a date" value={date} onChange={updateDateFilteringNull}/>
        </LocalizationProvider> : <div></div>}
    </div>;
}