'use client';

import Image from "next/image";
import styles from "./page.module.css";
import {App2} from "@/app/comp.";
import {Moon} from "@/app/Moon";

export default function Home() {
    return (
        <div>
            <Moon></Moon>
        </div>
    );
}
