import {useEffect, useRef} from "react";
import p5 from "p5";

interface P5WrapperProps {
    sketchFn: (p: p5) => void
}

export function P5Wrapper({sketchFn}: P5WrapperProps) {
    let sketchable: p5 | null = null;

    const canvaP5 = useRef<HTMLElement | undefined>(undefined);

    useEffect((): void => {
        if (typeof window !== 'undefined') {
            if (!sketchable) {
                sketchable = new p5(sketchFn, canvaP5.current);
                console.log('attach', sketchable);
            }
        }
    });

    return <div ref={canvaP5}></div>;
}