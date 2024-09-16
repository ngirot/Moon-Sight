import {useEffect, useState} from "react";
import p5, {Image, Shader, Geometry} from "p5"
import {P5Wrapper} from "@/app/components/P5Wrapper";
import {AnimationParams} from "@/app/services/AnimationParams";
import {AstronomicalObject, SolarSystem} from "@/app/services/SolarSystem";

interface MoonProps {
    animationParams: AnimationParams
}

interface BuildWrapper {
    animationParams: AnimationParams
}

function build(wrapper: BuildWrapper, dynamicP5: any) {
    return (p: p5) => {
        let shaders: Shader;
        let moonTexture: Image;

        const sphere2 = function (size: number, detail: number) {
            return new dynamicP5.Geometry(
                detail,
                detail,
                function (this: Geometry) {
                    for (let i = 0; i < detail + 1; i++) {
                        const lat = p.map(i, 0, detail, 0, p.PI);
                        for (let j = 0; j < detail + 1; j++) {
                            const lon = p.map(j, 0, detail, 0, p.TWO_PI);
                            const x = size * p.sin(lat) * p.cos(lon);
                            const y = size * p.sin(lat) * p.sin(lon);
                            const z = size * p.cos(lat);

                            const v = i / detail;
                            const u = 1 - j / detail;

                            // @ts-expect-error
                            this.vertices.push(p.createVector(x, y, z));
                            // @ts-expect-error
                            this.vertexNormals.push(p.createVector(x, y, z));
                            // @ts-expect-error
                            this.uvs.push(u, v);
                        }
                    }

                    this.computeFaces();

                    // @ts-expect-error
                    this.gid = 'SphereCustom|' + size + '|' + detail;
                }
            )
        }

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

            const solarSystem = new SolarSystem(wrapper.animationParams.renderDate());

            const positionOnEarth = solarSystem.locationOnEarth(wrapper.animationParams.position)
            const moonPosition = solarSystem.position(AstronomicalObject.MOON);
            const earthPosition = solarSystem.position(AstronomicalObject.EARTH);
            const sunPosition = solarSystem.position(AstronomicalObject.SUN);
            const moonRotation = solarSystem.rotation(AstronomicalObject.MOON);

            const realPosition = earthPosition.add(positionOnEarth);

            p.background(0);

            const cam = p.createCamera();
            cam.setPosition(realPosition.x, realPosition.y, realPosition.z);
            // @ts-expect-error
            cam.perspective(0.012, 1, 0.01, 10000000000000);
            cam.upX = positionOnEarth.x;
            cam.upY = positionOnEarth.y;
            cam.upZ = positionOnEarth.z;
            cam.lookAt(moonPosition.x, moonPosition.y, moonPosition.z);

            shaders.setUniform("uLightPosition", [sunPosition.x, sunPosition.y, sunPosition.z]);
            shaders.setUniform("uTexture", moonTexture);
            shaders.setUniform('time', p.millis());

            p.translate(moonPosition.x, moonPosition.y, moonPosition.z);

            p.rotate(toDegree(moonRotation.spin), [moonRotation.north.x, moonRotation.north.z, moonRotation.north.y]);
            p.rotate(toDegree(-moonRotation.ra), [1, 0, 0]);

            p.rotate(p.PI / 2, [1, 0, 0])
            p.model(sphere2(solarSystem.kmToUnit(3474.8 / 2), 100));
        }
    }
}

export function Moon({animationParams}: MoonProps) {
    const [wrapper, setWrapper] = useState({animationParams});
    const [elementToRender, setElementToRender] = useState<JSX.Element | null>(null);

    useEffect(() => {
        wrapper.animationParams = animationParams;
    }, [animationParams, wrapper]);

    useEffect(() => {
        import('p5').then(loadedP5 => {
            setElementToRender(<P5Wrapper sketchFn={build(wrapper, loadedP5.default)}></P5Wrapper>);
        });
    }, []);

    return <div>{elementToRender !== null ? elementToRender : <div></div>}</div>
}