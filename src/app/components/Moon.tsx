import {useEffect, useState} from "react";
import p5, {Geometry, Image, Shader} from "p5"
import {P5Wrapper} from "@/app/components/P5Wrapper";
import {AnimationParams} from "@/app/services/AnimationParams";
import {AstronomicalObject, SolarSystem} from "@/app/services/SolarSystem";
import {round} from "@popperjs/core/lib/utils/math";
import {Utils} from "@/app/services/Utils";

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
        let moonDisplacementMap: Image;
        let moonGeometry: Geometry;

        const sphere2 = function (size: number, detail: number, displacementMap: Image | null = null, displacementMaxHeight: number = 0) {
            const geo = new dynamicP5.Geometry(detail, detail);

            for (let i = detail + 1; i >= 0; i--) {
                const lat = p.map(i, 0, detail, 0, p.PI);
                const v = i / detail;
                const sinLat = p.sin(lat);

                for (let j = 0; j < detail + 1; j++) {
                    const lon = p.map(j, 0, detail, 0, p.TWO_PI);

                    const u = 1 - j / detail;

                    let elevation = 0;
                    if (displacementMap != null) {
                        const displacementX = p.map(v, 0, 1, 0, displacementMap.height);
                        const displacementY = p.map(u, 0, 1, 0, displacementMap.width);
                        const displacementPixel = displacementMap.get(round(displacementY), round(displacementX));
                        elevation = p.map(displacementPixel[0], 0, 255, 0, displacementMaxHeight);
                    }

                    const sizeWithDisplacement = size + elevation;

                    const x = sizeWithDisplacement * sinLat * p.cos(lon);
                    const y = sizeWithDisplacement * sinLat * p.sin(lon);
                    const z = sizeWithDisplacement * p.cos(lat);


                    geo.vertices.push(p.createVector(x, y, z));
                    geo.uvs.push(u, v);
                }
            }

            geo.computeFaces();
            geo.computeNormals();

            geo.gid = 'SphereCustom|' + size + '|' + detail;

            return geo;
        }

        const toDegree = function (rad: number): number {
            return (rad % 360) * p.PI / 180;
        }

        p.preload = function () {
            shaders = p.loadShader('shaders/shader.vert', 'shaders/shader.frag');

            moonTexture = p.loadImage("img/lroc_color_poles_4k.jpg");
            moonDisplacementMap = p.loadImage("img/ldem_4_uint.png");
        }

        p.setup = function () {
            const container = document.getElementById("moon-container");
            const size = Math.min(Utils.elementWidth(container), Utils.elementHeight(container)) * 0.9;
            const can = p.createCanvas(size, size, p.WEBGL);
            p.shader(shaders);
            p.noStroke();
            p.frameRate();
            //p.noLoop();

            p.angleMode(p.RADIANS)

            // moonGeometry = sphere2(SolarSystem.kmToUnit(1727.2), 1000, moonDisplacementMap, SolarSystem.kmToUnit(32.768));
            moonGeometry = sphere2(SolarSystem.kmToUnit(1737.4), 100);
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
            shaders.setUniform("uHeightMap", moonDisplacementMap);
            shaders.setUniform("uHeightMapSize", [moonDisplacementMap.width, moonDisplacementMap.height, SolarSystem.kmToUnit(580)]);
            shaders.setUniform('time', p.millis());

            p.translate(moonPosition.x, moonPosition.y, moonPosition.z);

            p.rotate(toDegree(moonRotation.spin), [moonRotation.north.x, moonRotation.north.z, moonRotation.north.y]);
            p.rotate(toDegree(-moonRotation.ra), [1, 0, 0]);

            p.rotate(p.PI / 2, [1, 0, 0])
            p.model(moonGeometry);
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

    return <div id="moon-container" style={{width: "100%", height: "100%"}}>{elementToRender !== null ? elementToRender : <div></div>}</div>
}