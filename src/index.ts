import "./styles/index.css";

import MapGenerator from './generator/';

import { default as getMapSettings, MapSettings, setGenerateFn } from './control-panel/';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


const generateMap = (settings: MapSettings) => {
    const waterAltitude = settings.water.altitude;
    const deepAltitude = waterAltitude * settings.water.depthDelta;
    const beachAltitude = (1 - waterAltitude) * settings.water.beachDelta + waterAltitude;

    const map = new MapGenerator({ chunkSize: 1, ...settings });

    let x = 0;
    while (x < 800) {
        let y = 0;
        while (y < 800) {
            const tile = map.getTile(x, y);
            const transX = x;
            const transY = 799 - y;

            // deep water
            if (tile.height <= deepAltitude) {
                ctx.fillStyle = `rgb(0,100,200)`;

                // shallow water
            } else if (tile.height <= waterAltitude) {
                ctx.fillStyle = `rgb(0,128,255)`;

                // beanch
            } else if (tile.height <= beachAltitude) {
                ctx.fillStyle = `rgb(255, 255, 192)`;

            } else {
                //const val = 255 - Math.floor(tile.height * 255);
                const val = Math.floor(tile.height * 255);
                ctx.fillStyle = `rgb(${val},${val},${val})`;
            }
            ctx.fillRect(transX, transY, 1, 1);
            y += 1;
        }
        x += 1;
    }
};

setGenerateFn(generateMap);
generateMap(getMapSettings());