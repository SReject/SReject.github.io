import { SimplexOptions } from "../../generator";
import { Slider, Group } from '../../components/';
import { create } from "domain";

export default class NoiseControl {
    private scale: Slider;
    private iterations: Slider;
    private pitch: Slider;
    private persistence: Slider;

    protected children: HTMLElement;
    private container: HTMLElement;

    constructor(title: string) {
        this.scale = new Slider({
            title: 'Scale',
            description: 'How the noise map will scale per pixel. Higher values create more variance',
            minimum: 0.001,
            maximum: 0.1,
            steps: 99,
            value: 0.005
        });
        this.iterations = new Slider({
            title: 'Smoothing Passes',
            description: 'The number of smoothing passes',
            minimum: 1,
            maximum: 10,
            steps: 9,
            value: 3
        });
        this.pitch = new Slider({
            title: 'Frequency Modifier',
            description: 'Controls the noise frequency used for successive smothing passes.',
            minimum: 1,
            maximum: 10,
            steps: 90,
            value: 2
        });
        this.persistence = new Slider({
            title: 'Amplitude persistence',
            description: 'Controls the weight each successive smoothing pass will contribute to the final result',
            minimum: 0.01,
            maximum: 2,
            steps: 199,
            value: 0.45
        });

        let ele = new Group({
            title: title,
            collapsable: true,
            children: [
                this.scale.element,
                this.iterations.element,
                this.pitch.element,
                this.persistence.element
            ]
        });

        this.container = ele.element;
        this.children = ele.content;
    }
    get element() {
        return this.container;
    }
    getSettings(): SimplexOptions {
        return {
            scale: this.scale.value,
            iterations: this.iterations.value,
            pitch: this.pitch.value,
            persistence: this.persistence.value,
            min: 0,
            max: 1
        }
    }
}

interface NoiseControlTaperSettings {
    title: string;
    description: string
};
export interface SimplexOptionsWithTaper extends SimplexOptions {
    taper: number
}
export class NoiseControlWithTapering extends NoiseControl {
    private taper: Slider;

    constructor(title: string, taper: NoiseControlTaperSettings) {
        super(title);


        this.taper = new Slider({
            title: taper.title,
            description: taper.description,
            steps: 1000,
            minimum: 0,
            maximum: 2,
            value: 1
        });

        this.children.appendChild(this.taper.element);
    }
    getSettings(): SimplexOptionsWithTaper {
        let settings = super.getSettings();
        return {
            taper: this.taper.value,
            ...settings
        }
    }
}