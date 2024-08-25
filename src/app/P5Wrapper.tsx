import {useEffect, useRef, useState} from "react";
import p5 from "p5";

interface P5WrapperProps {
    sketchFn: (p: p5) => void
}

export function P5Wrapper({sketchFn}: P5WrapperProps) {
    const [sketch, setSketch] = useState<p5 | null>(null);
    const canvaP5 = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let created: p5;
        if (typeof window !== 'undefined') {
            if (sketch === null && canvaP5.current !== undefined) {
                created = new p5(sketchFn, canvaP5.current ? canvaP5.current : undefined);
                setSketch(created);
            }
        }
        return () => {
            if (created) {
                created.remove();
            }
        }
    }, [canvaP5]);

    return <div ref={canvaP5}></div>;
}