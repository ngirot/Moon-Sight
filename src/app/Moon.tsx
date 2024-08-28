import {useEffect, useState} from "react";
import p5, {Image, Shader} from "p5"
import {Body, HelioVector, RotationAxis, Vector} from "astronomy-engine";
import {P5Wrapper} from "@/app/P5Wrapper";
import {AnimationParams} from "@/app/AnimationParams";

interface MoonProps {
    animationParams: AnimationParams
}

interface BuildWrapper {
    animationParams: AnimationParams
}

const toCoord = function (vector: Vector) {
    const factor = 1000;
    return {x: -vector.x * factor, y: vector.z * factor, z: vector.y * factor};
}

function build(wrapper: BuildWrapper) {
    return (p: p5) => {
        let shaders: Shader;
        let moonTexture: Image;

        const toDegree = function (rad: number): number {
            return (rad % 360) * p.PI / 180;
        }

        p.preload = function () {
            shaders = p.loadShader('shaders/shader.vert', 'shaders/shader.frag');
            moonTexture = p.loadImage("img/lroc_color_poles_4k.jpg");
        }

        p.setup = function () {
            p.createCanvas(700, 700, p.WEBGL);
            p.shader(shaders);
            p.noStroke();

            p.angleMode(p.RADIANS)
            //p.noLoop();
        }

        p.draw = function () {
            let date = wrapper.animationParams.renderDate().toDate();
            date.setMilliseconds(0);

            const moonVector = HelioVector(Body.Moon, date);
            const moonRotation = RotationAxis(Body.Moon, date);
            const earthVector = HelioVector(Body.Earth, date);
            const sunVector = HelioVector(Body.Sun, date);

            const moonPosition = toCoord(moonVector);
            const earthPosition = toCoord(earthVector);
            const sunPosition = toCoord(sunVector);

            p.background(0);

            const cam = p.createCamera();
            cam.setPosition(earthPosition.x, earthPosition.y, earthPosition.z);
            // @ts-expect-error
            cam.perspective(0.024, 1, 0.01, 10000000000000);
            cam.lookAt(moonPosition.x, moonPosition.y, moonPosition.z);

            shaders.setUniform("uLightPosition", [sunPosition.x, sunPosition.y, sunPosition.z]);
            shaders.setUniform("uTexture", moonTexture);
            shaders.setUniform('time', p.millis());

            p.translate(moonPosition.x, moonPosition.y, moonPosition.z);

            p.rotate(toDegree(moonRotation.spin), [moonRotation.north.x, moonRotation.north.z, moonRotation.north.y]);
            p.rotate(toDegree(-moonRotation.ra), [1, 0, 0]);
            p.rotate(p.PI / 2, [0, 1, 0])
            p.sphere(0.02322760333, 100, 100);
        }
    }
}

export function Moon({animationParams}: MoonProps) {
    const [wrapper, setWrapper] = useState({animationParams});

    useEffect(() => {
        wrapper.animationParams = animationParams;
    }, [animationParams, wrapper]);

    return <P5Wrapper sketchFn={build(wrapper)}></P5Wrapper>;
}