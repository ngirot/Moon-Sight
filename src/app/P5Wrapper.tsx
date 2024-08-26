import {useEffect, useRef, useState} from "react";
import p5 from "p5";

interface P5WrapperProps {
    sketchFn: (p: p5) => void
}

export function P5Wrapper({sketchFn}: P5WrapperProps) {
    const [loaded, setLoaded] = useState<boolean>(false);
    const canvaP5 = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let dropped = false;
        let created: p5;
        if (typeof window !== 'undefined') {
            if (!loaded && canvaP5.current !== undefined) {
                setLoaded(true);

                const dynamicImportP5 = import('p5');
                dynamicImportP5.then(lib => {
                    if (!dropped) {
                        created = new lib.default(sketchFn, canvaP5.current ? canvaP5.current : undefined);
                    }
                });
            }
        }
        return () => {
            dropped = true;
            if (created) {
                created.remove();
            }
        }
    }, [canvaP5]);

    return <div ref={canvaP5}></div>;
}