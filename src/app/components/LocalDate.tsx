"use client"

import {Moment} from "moment";

interface LocalDateProps {
    date: Moment;
}

const format = (date: Moment): string => {
    let d = date.toDate();
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
}

export function LocalDate({date}: LocalDateProps) {
    return <span suppressHydrationWarning>{format(date)}</span>;
}