import {Moment} from "moment";

interface LocalDateProps {
    date: Moment;
}

const format = (date: Moment): string => {
    return date.format('lll');
}

export function LocalDate({date}: LocalDateProps) {
    return <span>{format(date)}</span>;
}