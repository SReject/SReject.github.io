import "./control-panel.css";

import NoiseControl from "./noise-control/";
import * as mapSeed from './map-seed/';

import { default as waterLine, WaterLineSettings } from './water-line/water-line';

import createWrapper from '../components/helpers/create';
import { SimplexOptions } from "src/generator";



export interface MapSettings {
    seed: string | number;
    height: SimplexOptions;
    temperature: SimplexOptions;
    moisture: SimplexOptions;
    water: WaterLineSettings;
}

export type MapGeneratorFn = (settings: MapSettings) => void;

let generate: MapGeneratorFn = (settings: MapSettings) => {
    console.log(settings);
};

const heightNoise = new NoiseControl('Height Map');
const temperatureNoise = new NoiseControl('Temperature Map');
const moistureNoise = new NoiseControl('Moisture Map');
const create = createWrapper();
const generateButton = create({
    class: 'generate',
    children: [
        create('button', {
            text: 'Generate',
            onclick: () => generate(getSettings())
        })
    ]
})

const controlContainer = document.getElementById('control-panel');
controlContainer.appendChild(generateButton);
controlContainer.appendChild(mapSeed.element);
controlContainer.appendChild(heightNoise.element);
controlContainer.appendChild(temperatureNoise.element);
controlContainer.appendChild(moistureNoise.element);
controlContainer.appendChild(waterLine.element);


const getSettings = (): MapSettings => ({
    seed: mapSeed.getSettings(),
    height: heightNoise.getSettings(),
    temperature: temperatureNoise.getSettings(),
    moisture: moistureNoise.getSettings(),
    water: waterLine.getSettings()
});

export default getSettings;

export const setGenerateFn = (generator: MapGeneratorFn) => {
    generate = generator;
}