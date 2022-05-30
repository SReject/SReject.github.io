import "./styles/index.css";

import MapGenerator from './generator/';

import { default as getMapSettings, MapSettings, setGenerateFn } from './control-panel/';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


const generateMap = (settings: MapSettings) => {

    const waterDelta = settings.water.altitude;
    const deepDelta = waterDelta * settings.water.depthDelta;
    const beachDelta = (1 - waterDelta) * settings.water.beachDelta + waterDelta;

    const map = new MapGenerator({ chunkSize: 1, ...settings });

    let x = 0, logged = false;
    while (x < 800) {
        let y = 0;
        while (y < 800) {
            const tile = map.getTile(x, y);
            const transX = x;
            const transY = 799 - y;

            let { height: heightDelta } = tile;

            if (heightDelta <= deepDelta) { // deep water
                const green = 100 * (heightDelta / deepDelta);
                const blue = 200 * (heightDelta / deepDelta);
                ctx.fillStyle = `rgb(0, ${green}, ${blue})`;

            } else if (heightDelta <= waterDelta) { // water
                const green = 128 * (heightDelta / waterDelta);
                const blue = 255 * (heightDelta / waterDelta);
                ctx.fillStyle = `rgb(0, ${green}, ${blue})`;

            } else if (heightDelta <= beachDelta) { // beach
                const redgreen = 255 * (heightDelta / beachDelta);
                const blue = 192 * (heightDelta / beachDelta);
                ctx.fillStyle = `rgb(${redgreen},${redgreen},${blue})`;

            } else { // land

                // readjust height delta to account for water
                heightDelta = (heightDelta - beachDelta) / (1 - beachDelta);

                const val = Math.floor(191 * heightDelta + 64);
                ctx.fillStyle = `rgb(0,${val},0)`;
            }
            ctx.fillRect(transX, transY, 1, 1);
            y += 1;
        }
        x += 1;
    }
};

setGenerateFn(generateMap);
generateMap(getMapSettings());