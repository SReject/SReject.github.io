import "./slider.css";

import createWrapper from '../helpers/create';

export interface SliderOptions {
    title: string;
    description: string;

    minimum: number,
    maximum: number,
    steps: number,

    value?: number,
    onchange?: (value: number) => void;
};

export default class Slider {
    private minimum: number;
    private maximum: number;

    private container: HTMLElement;
    private slider: HTMLElement;

    constructor(options: SliderOptions) {

        this.minimum = options.minimum;
        this.maximum = options.maximum;

        const create = createWrapper({ prefix: 'slider-' });

        const stepSize = (options.maximum - options.minimum) / options.steps;

        let currentValue = options.value != null ? options.value : ((options.maximum - options.minimum) / 2 + options.minimum);

        const eleSliderValue = create({ preclass: 'value', text: currentValue.toString() });

        const onChange = options.onchange || (() => { });
        const onChangeWrapper = (evt: Event) => {
            let value = parseFloat((evt.target as HTMLInputElement).value);
            if (value < this.minimum) {
                value = this.minimum;
            } else if (value > this.maximum) {
                value = this.maximum;
            }

            if (currentValue !== value) {
                onChange(value);
                eleSliderValue.textContent = value.toString();
                currentValue = value;
            }
        };

        this.container = create({
            preclass: 'wrapper',
            children: [
                create({
                    preclass: 'title-wrapper',
                    children: [
                        create({ preclass: 'title', text: options.title }),
                        eleSliderValue
                    ]
                }),
                create({ preclass: 'description', text: options.description }),
                create({
                    preclass: 'container',
                    children: [
                        this.slider = create('input', {
                            type: 'range',
                            class: 'slider',
                            min: this.minimum.toString(),
                            max: this.maximum.toString(),
                            step: stepSize.toString(),
                            value: currentValue.toString(),
                            oninput: onChangeWrapper,
                            onchange: onChangeWrapper
                        })
                    ]
                })
            ]
        });
    }

    get value(): number {
        let value = parseFloat((this.slider as HTMLInputElement).value);
        if (value < this.minimum) {
            value = this.minimum;
        } else if (value > this.maximum) {
            value = this.maximum;
        }
        return value;
    }

    get element(): HTMLElement {
        return this.container;
    }
}