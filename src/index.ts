import "./styles/index.css";

import MapGenerator from './generator/';

import { MapSettings, setGenerateFn } from './control-panel/';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

setGenerateFn((settings: MapSettings) => {
    console.log(settings);

    const map = new MapGenerator({ chunkSize: 1, ...settings });

    let x = 0;
    while (x < 800) {
        let y = 0;
        while (y < 800) {
            const tile = map.getTile(x, y);
            const transX = x;
            const transY = 799 - y;
            const val = 255 - Math.floor(tile.height * 255);
            ctx.fillStyle = `rgb(${val},${val},${val})`;
            ctx.fillRect(transX, transY, 1, 1);
            y += 1;
        }
        x += 1;
    }

});