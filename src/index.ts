import "./styles/index.css";

import MapGenerator from './generator/';

import { default as getMapSettings, MapSettings, setGenerateFn } from './control-panel/';
import InfoBox from './components/info-box';

const canvas = document.querySelector('canvas');
const infoBox = new InfoBox(canvas);
infoBox.updater = (x: number, y: number) => {
    if (map == null || mapSettings == null) {
        return null;
    }
    return getTileInfo(map, x, y);
};

document.querySelector('.wrapper > .content').appendChild(infoBox.element);



const ctx = canvas.getContext('2d');

const minmax = (min: number, value: number, max: number): number => (
    value <= min ? min :
        value >= max ? max :
            value
);


interface TileInfo {
    x: number,
    y: number,
    disposition: "deep water" | "shallow water" | "beach" | "land",
    heightDelta: number,
    adjustedHeightDelta: number,
    temperatureDelta: number,
    adjustedTemperatureDelta: number,
    moistureDelta: number,
    adjustedMoistureDelta: number,
    color: string[]

}
const getTileInfo = (map: MapGenerator, x: number, y: number): TileInfo => {

    const temperatureHeightModifier = mapSettings.temperature.taper - 1;
    const moistureHeightModifier = mapSettings.temperature.taper - 1;

    const waterDelta = mapSettings.water.altitude;
    const deepDelta = waterDelta * mapSettings.water.depthDelta;
    const beachDelta = (1 - waterDelta) * mapSettings.water.beachDelta + waterDelta;


    const {
        height: heightDelta,
        temperature: temperatureDelta,
        moisture: moistureDelta
    } = map.getTile(x, y);


    let disposition: "deep water" | "shallow water" | "beach" | "land",
        color: string[] = [],
        adjustedHeightDelta = heightDelta,
        adjustedTemperatureDelta = temperatureDelta,
        adjustedMoistureDelta = moistureDelta;

    if (heightDelta <= deepDelta) {
        disposition = "deep water";
        const green = 100 * (heightDelta / deepDelta);
        const blue = 200 * (heightDelta / deepDelta);
        color = [`rgb(0, ${green}, ${blue})`];

    } else if (heightDelta <= waterDelta) {
        disposition = "shallow water";
        const green = 128 * (heightDelta / waterDelta);
        const blue = 255 * (heightDelta / waterDelta);
        color = [`rgb(0, ${green}, ${blue})`];

    } else if (heightDelta <= beachDelta) {
        disposition = "beach";
        const redgreen = 255 * (heightDelta / beachDelta);
        const blue = 192 * (heightDelta / beachDelta);
        color = [`rgb(${redgreen},${redgreen},${blue})`];

    } else {
        disposition = "land";

        // readjust height delta to account for water
        adjustedHeightDelta = (heightDelta - beachDelta) / (1 - beachDelta);

        // get base color
        const val = Math.floor(191 * adjustedHeightDelta + 64)
        color = [`rgb(0,${val},0)`];

        // Get adjusted temperature delta for the tile
        adjustedTemperatureDelta = minmax(0, temperatureDelta * ((1 + adjustedHeightDelta) ** temperatureHeightModifier), 1);

        // Get adjusted temperature delta for the tile
        adjustedMoistureDelta = minmax(0, moistureDelta * ((1 + adjustedHeightDelta) ** moistureHeightModifier), 1);

        if (adjustedTemperatureDelta < 0.5) {
            let n = (0.5 - adjustedTemperatureDelta) / 0.5;
            color.push(`rgba(0,${val},255,${n})`);

        } else if (adjustedTemperatureDelta > 0.5) {
            let n = (adjustedTemperatureDelta - 0.5) / 0.5;
            color.push(`rgba(255,${val},0,${n})`);
        }
    }

    return {
        x,
        y,
        disposition,
        heightDelta,
        adjustedHeightDelta,
        temperatureDelta,
        adjustedTemperatureDelta,
        moistureDelta,
        adjustedMoistureDelta,
        color
    }
}

let map: MapGenerator,
    mapSettings: MapSettings;
const generateMap = (settings: MapSettings) => {
    mapSettings = settings;
    map = new MapGenerator({ chunkSize: 1, ...settings });

    let x = 0;
    while (x < 800) {
        let y = 0;
        while (y < 800) {
            const tileInfo = getTileInfo(map, x, y);
            const transX = x;
            const transY = 799 - y;
            tileInfo.color.forEach(color => {
                ctx.fillStyle = color;
                ctx.fillRect(transX, transY, 1, 1);
            });

            y += 1;
        }
        x += 1;
    }
};

setGenerateFn(generateMap);
generateMap(getMapSettings());