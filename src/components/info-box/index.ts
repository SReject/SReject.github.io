import "./index.css";

import createWrapper from '../helpers/create';
const create = createWrapper({
    "prefix": "infobox-"
});

interface InfoBoxSettings {
    x: number,
    y: number,
    disposition: "deep water" | "shallow water" | "beach" | "land",
    adjustedHeightDelta: number,
    adjustedTemperatureDelta: number,
    adjustedMoistureDelta: number
}

const createListItem = (title: string): HTMLElement => {
    return create({
        preclass: ['listitem'],
        children: [create({ text: `${title}:`, preclass: 'listitem-text' }), create({ preclass: 'listitem-value' })]
    })
};

const toPercentage = (value: number): string => {
    let str = (value * 100).toString().split('.');

    if (str[1].length < 2) {
        str[1] = str[1] + '0'.repeat(2 - str[1].length);

    } else if (str[1].length > 2 && parseInt(str[1][2], 10) >= 5) {
        str[1] = str[1][0] + ('' + (parseInt(str[1][1], 10) + 1));
    }

    return str[0] + '.' + str[1].substring(0, 2) + '%';
};

export default class InfoBox {
    private container: HTMLElement;
    private point: HTMLElement;
    private elevation: HTMLElement;
    private temperature: HTMLElement;
    private humidity: HTMLElement;

    private mouseX: number;
    private mouseY: number;

    private timeout: null | number;

    public updater: (x: number, y: number) => (InfoBoxSettings | null);

    constructor(subject: HTMLCanvasElement) {
        this.container = create({
            id: "point-info-box",
            children: [
                this.point = createListItem('Position'),
                this.elevation = createListItem('Elevation'),
                this.temperature = createListItem('Temperature'),
                this.humidity = createListItem('Humidity')
            ]
        });

        const onTimeout = () => {
            if (this.timeout != null) {
                window.clearTimeout(this.timeout);
                this.timeout = null;
            }

            if (this.mouseX == null || this.mouseY == null || this.updater == null) {
                this.container.classList.remove('show');
                return;
            }

            const rect = subject.getBoundingClientRect(),
                pointX = Math.floor((this.mouseX - rect.left) * (subject.width / rect.width)),
                pointY = Math.floor((this.mouseY - rect.top) * (subject.height / rect.height));

            const settings = this.updater(pointX, 799 - pointY);
            if (settings != null) {
                this.point.children.item(1).textContent = `${settings?.x}, ${settings?.y}`;
                this.elevation.children.item(1).textContent = toPercentage(settings.adjustedHeightDelta);
                this.temperature.children.item(1).textContent = toPercentage(settings.adjustedTemperatureDelta);
                this.humidity.children.item(1).textContent = toPercentage(settings.adjustedMoistureDelta);

                this.container.style.left = `${this.mouseX - rect.left + 10}px`;
                this.container.style.top = `${this.mouseY - rect.top + 10}px`;
                this.container.classList.add('show');
            } else {
                this.container.classList.remove('hide');
            }
        };

        subject.addEventListener('mouseenter', (evt: MouseEvent) => {
            if (this.timeout != null) {
                window.clearTimeout(this.timeout);
                this.timeout = null;
            }

            this.mouseX = evt.clientX;
            this.mouseY = evt.clientY;
            this.container.classList.remove('show');
            this.timeout = window.setTimeout(onTimeout, 100);
        });

        subject.addEventListener('mousemove', (evt: MouseEvent) => {
            if (this.timeout != null) {
                window.clearTimeout(this.timeout);
                this.timeout = null;
            }

            this.mouseX = evt.clientX;
            this.mouseY = evt.clientY;
            this.container.classList.remove('show');
            this.timeout = window.setTimeout(onTimeout, 100);
        });

        subject.addEventListener('mouseleave', (evt: MouseEvent) => {
            if (this.timeout != null) {
                window.clearTimeout(this.timeout);
                this.timeout = null;
            }
            this.container.classList.remove('show');
        });
    }
    get element() {
        return this.container;
    }
}