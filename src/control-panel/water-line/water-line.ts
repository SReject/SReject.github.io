import { Slider, Group } from '../../components/';

export interface WaterLineSettings {
    altitude: number;
    depthDelta: number;
    beachDelta: number;
};

class WaterLine {
    private altitude: Slider;
    private depthDelta: Slider;
    private beachDelta: Slider;

    private container: HTMLElement;

    constructor() {
        this.altitude = new Slider({
            title: 'Altitude',
            description: 'Height delta at which to stop generating water. Higher values generate more water.',
            minimum: 0,
            maximum: 1,
            steps: 1000,
            value: 0.35
        });

        this.depthDelta = new Slider({
            title: 'Deep Water',
            description: 'Water depth at which to stop creating deep water. Higher values generate more deep water.',
            minimum: 0,
            maximum: 1,
            steps: 1000,
            value: 0.8
        });

        this.beachDelta = new Slider({
            title: 'Beach Spread',
            description: 'Controls how far beaches will spread from the shore-line. Higher values generate larger beaches.',
            minimum: 0,
            maximum: 1,
            steps: 1000,
            value: 0.05
        });

        this.container = new Group({
            title: 'Water and Beaches',
            collapsable: true,
            children: [
                this.altitude.element,
                this.depthDelta.element,
                this.beachDelta.element
            ]
        }).element;
    }
    get element() {
        return this.container;
    }
    getSettings(): WaterLineSettings {
        return {
            altitude: this.altitude.value,
            depthDelta: this.depthDelta.value,
            beachDelta: this.beachDelta.value
        }
    }
};

export default new WaterLine();