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
                ctx.fillStyle = `rgb(0,100,200)`;

            } else if (heightDelta <= waterDelta) { // water
                ctx.fillStyle = `rgb(0,128,255)`;

            } else if (heightDelta <= beachDelta) { // beach
                ctx.fillStyle = `rgb(255, 255, 192)`;

            } else { // land
                heightDelta = (heightDelta - beachDelta) / (1 - beachDelta);

                const val = Math.floor(255 * heightDelta);
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