/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/group/group.css":
/*!****************************************!*\
  !*** ./src/components/group/group.css ***!
  \****************************************/
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/components/info-box/index.css":
/*!*******************************************!*\
  !*** ./src/components/info-box/index.css ***!
  \*******************************************/
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/components/slider/slider.css":
/*!******************************************!*\
  !*** ./src/components/slider/slider.css ***!
  \******************************************/
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/control-panel/control-panel.css":
/*!*********************************************!*\
  !*** ./src/control-panel/control-panel.css ***!
  \*********************************************/
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/styles/index.css":
/*!******************************!*\
  !*** ./src/styles/index.css ***!
  \******************************/
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/components/group/group.ts":
/*!***************************************!*\
  !*** ./src/components/group/group.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./group.css */ "./src/components/group/group.css");
const toggle_class_1 = __importDefault(__webpack_require__(/*! ../helpers/toggle-class */ "./src/components/helpers/toggle-class.ts"));
const create_1 = __importDefault(__webpack_require__(/*! ../helpers/create */ "./src/components/helpers/create.ts"));
class GroupControl {
    constructor(options) {
        const create = (0, create_1.default)({
            type: 'div',
            prefix: 'group-'
        });
        if (options.collapsable) {
            this.wrapperElement = create({
                preclass: ['wrapper'],
                class: 'collapsable',
                children: [
                    create({
                        preclass: 'head',
                        children: [
                            create({ preclass: 'title', text: options.title })
                        ],
                        onclick: (evt) => {
                            (0, toggle_class_1.default)(this.wrapperElement, 'expand');
                        }
                    }),
                    this.contentElement = create({
                        preclass: 'content',
                        children: options.children
                    })
                ]
            });
        }
        else {
            this.wrapperElement = create({
                preclass: ['wrapper'],
                children: [
                    create({
                        preclass: 'head',
                        children: [
                            create({ preclass: 'title', text: options.title })
                        ]
                    }),
                    this.contentElement = create({
                        preclass: 'content',
                        children: options.children
                    })
                ]
            });
        }
    }
    get element() {
        return this.wrapperElement;
    }
    get content() {
        return this.contentElement;
    }
}
exports["default"] = GroupControl;


/***/ }),

/***/ "./src/components/helpers/create.ts":
/*!******************************************!*\
  !*** ./src/components/helpers/create.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = (options) => {
    let defaultType = 'div', prefix = '';
    if (options != null) {
        if (options.type != null) {
            defaultType = options.type;
        }
        if (options.prefix != null) {
            prefix = options.prefix;
        }
    }
    return (type, options) => {
        let createType, createOptions;
        if (type != null && typeof type !== 'string') {
            createOptions = type;
            createType = defaultType;
        }
        else if (type == null) {
            createType = defaultType;
        }
        else {
            createType = type;
            createOptions = options;
        }
        const ele = document.createElement(createType);
        if (createOptions == null) {
            return ele;
        }
        if (typeof createOptions === 'string') {
            ele.textContent = createOptions;
            return ele;
        }
        Object
            .keys(createOptions)
            .forEach(key => {
            let value = createOptions[key];
            if (key === 'class') {
                if (typeof value === 'string') {
                    ele.className = (ele.className.split(' ').concat([value])).join(' ');
                }
                else if (Array.isArray(value)) {
                    ele.className = (ele.className.split(' ').concat(value)).join(' ');
                }
            }
            else if (key === 'preclass') {
                if (typeof value === 'string') {
                    value = value.split(/\s+/g);
                }
                if (Array.isArray(value)) {
                    let prefixedClasses = value.map((value) => prefix + value);
                    ele.className = (ele.className.split(' ').concat(prefixedClasses)).join(' ');
                }
            }
            else if (key === 'parent') {
                value.appendChild(ele);
            }
            else if (key === 'children') {
                value.forEach((child) => {
                    ele.appendChild(child);
                });
            }
            else if (key === 'text') {
                ele.textContent = value;
            }
            else if (key.substring(0, 2) === 'on') {
                ele.addEventListener(key.substring(2), value);
            }
            else {
                ele.setAttribute(key, value);
            }
        });
        return ele;
    };
};


/***/ }),

/***/ "./src/components/helpers/toggle-class.ts":
/*!************************************************!*\
  !*** ./src/components/helpers/toggle-class.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = (ele, className) => {
    if (typeof className === 'string') {
        className = className.split(' ');
    }
    const eleClasses = ele.className.split(' ');
    className.forEach(cls => {
        let idx = eleClasses.indexOf(cls);
        if (idx === -1) {
            eleClasses.push(cls);
        }
        else {
            eleClasses.splice(idx, 1);
        }
    });
    ele.className = eleClasses.join(' ');
};


/***/ }),

/***/ "./src/components/index.ts":
/*!*********************************!*\
  !*** ./src/components/index.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Group = exports.Slider = void 0;
const slider_1 = __importDefault(__webpack_require__(/*! ./slider/slider */ "./src/components/slider/slider.ts"));
exports.Slider = slider_1.default;
const group_1 = __importDefault(__webpack_require__(/*! ./group/group */ "./src/components/group/group.ts"));
exports.Group = group_1.default;


/***/ }),

/***/ "./src/components/info-box/index.ts":
/*!******************************************!*\
  !*** ./src/components/info-box/index.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./index.css */ "./src/components/info-box/index.css");
const create_1 = __importDefault(__webpack_require__(/*! ../helpers/create */ "./src/components/helpers/create.ts"));
const create = (0, create_1.default)({
    "prefix": "infobox-"
});
const createListItem = (title) => {
    return create({
        preclass: ['listitem'],
        children: [create({ text: `${title}:`, preclass: 'listitem-text' }), create({ preclass: 'listitem-value' })]
    });
};
const toPercentage = (value) => {
    let str = (value * 100).toString().split('.');
    if (str[1].length < 2) {
        str[1] = str[1] + '0'.repeat(2 - str[1].length);
    }
    else if (str[1].length > 2 && parseInt(str[1][2], 10) >= 5) {
        str[1] = str[1][0] + ('' + (parseInt(str[1][1], 10) + 1));
    }
    return str[0] + '.' + str[1].substring(0, 2) + '%';
};
class InfoBox {
    constructor(subject) {
        this.container = create({
            id: "point-info-box",
            children: [
                this.point = createListItem('Position'),
                this.disposition = createListItem('Disposition'),
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
            const rect = subject.getBoundingClientRect(), pointX = Math.floor((this.mouseX - rect.left) * (subject.width / rect.width)), pointY = Math.floor((this.mouseY - rect.top) * (subject.height / rect.height));
            const settings = this.updater(pointX, 799 - pointY);
            if (settings != null) {
                this.point.children.item(1).textContent = `${settings?.x}, ${settings?.y}`;
                this.disposition.children.item(1).textContent = settings.disposition;
                this.elevation.children.item(1).textContent = toPercentage(settings.adjustedHeightDelta);
                this.temperature.children.item(1).textContent = toPercentage(settings.adjustedTemperatureDelta);
                this.humidity.children.item(1).textContent = toPercentage(settings.adjustedMoistureDelta);
                this.container.style.left = `${this.mouseX - rect.left + 10}px`;
                this.container.style.top = `${this.mouseY - rect.top + 10}px`;
                this.container.classList.add('show');
            }
            else {
                this.container.classList.remove('hide');
            }
        };
        subject.addEventListener('mouseenter', (evt) => {
            if (this.timeout != null) {
                window.clearTimeout(this.timeout);
                this.timeout = null;
            }
            this.mouseX = evt.clientX;
            this.mouseY = evt.clientY;
            this.container.classList.remove('show');
            this.timeout = window.setTimeout(onTimeout, 100);
        });
        subject.addEventListener('mousemove', (evt) => {
            if (this.timeout != null) {
                window.clearTimeout(this.timeout);
                this.timeout = null;
            }
            this.mouseX = evt.clientX;
            this.mouseY = evt.clientY;
            this.container.classList.remove('show');
            this.timeout = window.setTimeout(onTimeout, 100);
        });
        subject.addEventListener('mouseleave', (evt) => {
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
exports["default"] = InfoBox;


/***/ }),

/***/ "./src/components/slider/slider.ts":
/*!*****************************************!*\
  !*** ./src/components/slider/slider.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./slider.css */ "./src/components/slider/slider.css");
const create_1 = __importDefault(__webpack_require__(/*! ../helpers/create */ "./src/components/helpers/create.ts"));
;
class Slider {
    constructor(options) {
        this.minimum = options.minimum;
        this.maximum = options.maximum;
        const create = (0, create_1.default)({ prefix: 'slider-' });
        const stepSize = (options.maximum - options.minimum) / options.steps;
        let currentValue = options.value != null ? options.value : ((options.maximum - options.minimum) / 2 + options.minimum);
        const eleSliderValue = create({ preclass: 'value', text: currentValue.toString() });
        const onChange = options.onchange || (() => { });
        const onChangeWrapper = (evt) => {
            let value = parseFloat(evt.target.value);
            if (value < this.minimum) {
                value = this.minimum;
            }
            else if (value > this.maximum) {
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
    get value() {
        let value = parseFloat(this.slider.value);
        if (value < this.minimum) {
            value = this.minimum;
        }
        else if (value > this.maximum) {
            value = this.maximum;
        }
        return value;
    }
    get element() {
        return this.container;
    }
}
exports["default"] = Slider;


/***/ }),

/***/ "./src/control-panel/index.ts":
/*!************************************!*\
  !*** ./src/control-panel/index.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setGenerateFn = void 0;
__webpack_require__(/*! ./control-panel.css */ "./src/control-panel/control-panel.css");
const noise_control_1 = __importStar(__webpack_require__(/*! ./noise-control/ */ "./src/control-panel/noise-control/index.ts"));
const mapSeed = __importStar(__webpack_require__(/*! ./map-seed/ */ "./src/control-panel/map-seed/index.ts"));
const water_line_1 = __importDefault(__webpack_require__(/*! ./water-line/water-line */ "./src/control-panel/water-line/water-line.ts"));
const create_1 = __importDefault(__webpack_require__(/*! ../components/helpers/create */ "./src/components/helpers/create.ts"));
let generate = (settings) => {
    console.log(settings);
};
const heightNoise = new noise_control_1.default('Height Map');
const temperatureNoise = new noise_control_1.NoiseControlWithTapering('Temperature Map', {
    title: 'Altitude Modifier',
    description: 'Controls how altitude will alter temperature'
});
const moistureNoise = new noise_control_1.NoiseControlWithTapering('Moisture Map', {
    title: 'Altitude Modifier',
    description: 'Controls how altitude will alter moisture'
});
const create = (0, create_1.default)();
const generateButton = create({
    class: 'generate',
    children: [
        create('button', {
            text: 'Generate',
            onclick: () => generate(getSettings())
        })
    ]
});
const controlContainer = document.getElementById('control-panel');
controlContainer.appendChild(generateButton);
controlContainer.appendChild(mapSeed.element);
controlContainer.appendChild(heightNoise.element);
controlContainer.appendChild(temperatureNoise.element);
controlContainer.appendChild(moistureNoise.element);
controlContainer.appendChild(water_line_1.default.element);
const getSettings = () => ({
    seed: mapSeed.getSettings(),
    height: heightNoise.getSettings(),
    temperature: temperatureNoise.getSettings(),
    moisture: moistureNoise.getSettings(),
    water: water_line_1.default.getSettings()
});
exports["default"] = getSettings;
const setGenerateFn = (generator) => {
    generate = generator;
};
exports.setGenerateFn = setGenerateFn;


/***/ }),

/***/ "./src/control-panel/map-seed/index.ts":
/*!*********************************************!*\
  !*** ./src/control-panel/map-seed/index.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSettings = exports.element = void 0;
const create_1 = __importDefault(__webpack_require__(/*! ../../components/helpers/create */ "./src/components/helpers/create.ts"));
const components_1 = __webpack_require__(/*! ../../components */ "./src/components/index.ts");
const create = (0, create_1.default)({
    prefix: 'group-'
});
let inputElement = create('input', {
    type: 'text',
    value: Date.now().toString()
});
const group = new components_1.Group({
    title: 'Map Seed',
    children: [
        inputElement,
        create('button', {
            text: 'R',
            onclick: () => {
                inputElement.value = Math.round(Date.now() * Math.random()).toString();
            }
        })
    ]
});
exports.element = group.element;
const getSettings = () => inputElement.value;
exports.getSettings = getSettings;


/***/ }),

/***/ "./src/control-panel/noise-control/index.ts":
/*!**************************************************!*\
  !*** ./src/control-panel/noise-control/index.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NoiseControlWithTapering = void 0;
const components_1 = __webpack_require__(/*! ../../components/ */ "./src/components/index.ts");
class NoiseControl {
    constructor(title) {
        this.scale = new components_1.Slider({
            title: 'Scale',
            description: 'How the noise map will scale per pixel. Higher values create more variance',
            minimum: 0.001,
            maximum: 0.1,
            steps: 99,
            value: 0.005
        });
        this.iterations = new components_1.Slider({
            title: 'Smoothing Passes',
            description: 'The number of smoothing passes',
            minimum: 1,
            maximum: 10,
            steps: 9,
            value: 3
        });
        this.pitch = new components_1.Slider({
            title: 'Frequency Modifier',
            description: 'Controls the noise frequency used for successive smothing passes.',
            minimum: 1,
            maximum: 10,
            steps: 90,
            value: 2
        });
        this.persistence = new components_1.Slider({
            title: 'Amplitude persistence',
            description: 'Controls the weight each successive smoothing pass will contribute to the final result',
            minimum: 0.01,
            maximum: 2,
            steps: 199,
            value: 0.45
        });
        let ele = new components_1.Group({
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
    getSettings() {
        return {
            scale: this.scale.value,
            iterations: this.iterations.value,
            pitch: this.pitch.value,
            persistence: this.persistence.value,
            min: 0,
            max: 1
        };
    }
}
exports["default"] = NoiseControl;
;
class NoiseControlWithTapering extends NoiseControl {
    constructor(title, taper) {
        super(title);
        this.taper = new components_1.Slider({
            title: taper.title,
            description: taper.description,
            steps: 1000,
            minimum: 0,
            maximum: 2,
            value: 1
        });
        this.children.appendChild(this.taper.element);
    }
    getSettings() {
        let settings = super.getSettings();
        return {
            taper: this.taper.value,
            ...settings
        };
    }
}
exports.NoiseControlWithTapering = NoiseControlWithTapering;


/***/ }),

/***/ "./src/control-panel/water-line/water-line.ts":
/*!****************************************************!*\
  !*** ./src/control-panel/water-line/water-line.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const components_1 = __webpack_require__(/*! ../../components/ */ "./src/components/index.ts");
;
class WaterLine {
    constructor() {
        this.altitude = new components_1.Slider({
            title: 'Altitude',
            description: 'Height delta at which to stop generating water. Higher values generate more water.',
            minimum: 0,
            maximum: 1,
            steps: 1000,
            value: 0.35
        });
        this.depthDelta = new components_1.Slider({
            title: 'Deep Water',
            description: 'Water depth at which to stop creating deep water. Higher values generate more deep water.',
            minimum: 0,
            maximum: 1,
            steps: 1000,
            value: 0.8
        });
        this.beachDelta = new components_1.Slider({
            title: 'Beach Spread',
            description: 'Controls how far beaches will spread from the shore-line. Higher values generate larger beaches.',
            minimum: 0,
            maximum: 1,
            steps: 1000,
            value: 0.05
        });
        this.container = new components_1.Group({
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
    getSettings() {
        return {
            altitude: this.altitude.value,
            depthDelta: this.depthDelta.value,
            beachDelta: this.beachDelta.value
        };
    }
}
;
exports["default"] = new WaterLine();


/***/ }),

/***/ "./src/generator/index.ts":
/*!********************************!*\
  !*** ./src/generator/index.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const simplex_2d_noise_1 = __importStar(__webpack_require__(/*! ./simplex-2d-noise */ "./src/generator/simplex-2d-noise.ts"));
;
;
;
/** Validates options and then creates a new Simplex2D instance
 *
 * @param mapType Text description of map
 * @param seed Seed of the map to generate
 * @param defaults Default values to use if options is not specified
 * @param options Options to use instead of defaults
 * @returns Simplex2D instance
 */
const initializeSymplex = (mapType, seed, defaults, options) => {
    if (options == null) {
        return new simplex_2d_noise_1.default(seed, defaults.scale, defaults.iterations, defaults.pitch, defaults.persistence, defaults.min, defaults.max);
    }
    if (
    // validate scale
    typeof options.scale === 'number' &&
        Number.isFinite(options.scale) &&
        options.scale > 0 &&
        // validate iterations
        typeof options.iterations === 'number' &&
        Number.isInteger(options.iterations) &&
        options.iterations >= 1 &&
        // validate pitch
        typeof options.pitch === 'number' &&
        Number.isFinite(options.pitch) &&
        options.pitch > 0 &&
        // validate persistence
        typeof options.persistence === 'number' &&
        Number.isFinite(options.persistence) &&
        options.persistence > 0 &&
        // Validate min
        typeof options.min === 'number' &&
        Number.isFinite(options.min) &&
        // Validate max
        typeof options.max === 'number' &&
        Number.isFinite(options.max) &&
        // validate min v max
        options.min <= options.max) {
        return new simplex_2d_noise_1.default(seed, options.scale, options.iterations, options.pitch, options.persistence, options.min, options.max);
    }
    throw new Error(`invalid ${mapType}-map generation options`);
};
class MapGenerator {
    constructor(options) {
        if (options == null) {
            options = {};
        }
        // Resolve and validate chunk size
        if (options.chunkSize == null) {
            this.chunkSize = 16;
        }
        else if (typeof options.chunkSize !== 'number' ||
            !Number.isInteger(options.chunkSize) ||
            options.chunkSize < 1) {
            throw new Error('invalid chunk size');
        }
        else {
            this.chunkSize = options.chunkSize;
        }
        // Resolve and validate seed
        if (options.seed == null) {
            this.seed = Date.now().toString();
        }
        else if (typeof options.seed !== 'number' && typeof options.seed !== 'string') {
            throw new Error('invalid map seed');
        }
        else {
            this.seed = options.seed;
        }
        // Initialize PRNG with map's seed
        const prng = (0, simplex_2d_noise_1.Alea)(this.seed);
        // Generate seeds for terrian surface and features
        this.terrainSurfaceSeed = prng();
        this.terrainFeatureSeed = prng();
        // Generate seeds for height, temperature and moisture maps
        this.heightSeed = prng();
        this.temperatureSeed = prng();
        this.moistureSeed = prng();
        this.soilSeed = prng();
        // Default generator options when not specified
        const defaultOptions = {
            scale: 0.002,
            iterations: 5,
            pitch: 2,
            persistence: 0.45,
            min: 0,
            max: 1
        };
        // initialize maps
        this.heightMap = initializeSymplex('height', this.heightSeed, defaultOptions, options.height);
        this.temperatureMap = initializeSymplex('temperature', this.temperatureSeed, defaultOptions, options.temperature);
        this.moistureMap = initializeSymplex('moisture', this.moistureSeed, defaultOptions, options.moisture);
        this.soilMap = initializeSymplex('soil', this.soilSeed, defaultOptions, options.soil);
    }
    getTile(x, y) {
        return {
            height: this.heightMap.noise(x, y),
            temperature: this.temperatureMap.noise(x, y),
            moisture: this.moistureMap.noise(x, y),
            soil: 0 /* this.soilMap.noise(x, y) */
        };
    }
}
exports["default"] = MapGenerator;


/***/ }),

/***/ "./src/generator/simplex-2d-noise.ts":
/*!*******************************************!*\
  !*** ./src/generator/simplex-2d-noise.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/*! License Alea.js prng
 * Derivative Copyright (C) 2022 SReject
 * Derivative Copyright (C) 2021 Jonas Wagner
 * Copyright (C) 2010 by Johannes Baagøe baagoe@baagoe.org
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Alea = void 0;
/*! License simplex (2d) noise
 * A 2D multi-octave Simplex Noise generator based on Jonas Wagner's simple-noise work
 * - Removes 3D and 4D noise generation as well as supporting code
 * - Exposes Alea PRNG
 * - renames noise2D to noise
 * - Adds multi-octave support
 *
 * Derivative Copyright (c) 2022 SReject
 * Copyright (c) 2021 Jonas Wagner
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
const grad3 = new Float32Array([1, 1, 0,
    -1, 1, 0,
    1, -1, 0,
    -1, -1, 0,
    1, 0, 1,
    -1, 0, 1,
    1, 0, -1,
    -1, 0, -1,
    0, 1, 1,
    0, -1, 1,
    0, 1, -1,
    0, -1, -1
]);
const Alea = (seed) => {
    // Masher has been incorporated into Alea initializer
    // Increases time taken to initialize but reduces memory footprint once initialized
    let n = 0xefc8249d;
    let mash = (data) => {
        data = data.toString();
        for (let i = 0; i < data.length; i++) {
            n += data.charCodeAt(i);
            let h = 0.02519603282416938 * n;
            n = h >>> 0;
            h -= n;
            h *= n;
            n = h >>> 0;
            h -= n;
            n += h * 0x100000000; // 2^32
        }
        return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
    };
    let s0 = mash(' ');
    let s1 = mash(' ');
    let s2 = mash(' ');
    let c = 1;
    s0 -= mash(seed);
    if (s0 < 0) {
        s0 += 1;
    }
    s1 -= mash(seed);
    if (s1 < 0) {
        s1 += 1;
    }
    s2 -= mash(seed);
    if (s2 < 0) {
        s2 += 1;
    }
    mash = null;
    return function () {
        const t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
        s0 = s1;
        s1 = s2;
        return s2 = t - (c = t | 0);
    };
};
exports.Alea = Alea;
/** 2D Simplex multi-octave noise generator*/
class SimplexNoise {
    /** Creates a new `SimplexNoise` instance.
     * @param randomOrSeed A random number generator or a seed (string|number).
     * @param scale The base frequency of the noise
     * @param iterations The number of octaves to iterate through
     * @param pitch The value each sequential iteration's frequency will be multipled by
     * @param persistence Affects amplitude(weight) tapering of each successive octave(iteration)
     * @param min The minimum value that can be returned
     * @param max The maximum value that can be returned
     */
    constructor(randomOrSeed = Math.random, scale = 0, iterations = 1, pitch = 2, persistence = 1, min = 0, max = 1) {
        const random = typeof randomOrSeed == 'function' ? randomOrSeed : (0, exports.Alea)(randomOrSeed);
        this.scale = scale;
        this.iterations = iterations;
        this.pitch = pitch;
        this.persistence = persistence;
        this.min = min;
        this.max = max;
        const p = new Uint8Array(256);
        for (let i = 0; i < 256; i++) {
            p[i] = i;
        }
        for (let i = 0; i < 255; i++) {
            const r = i + ~~(random() * (256 - i));
            const aux = p[i];
            p[i] = p[r];
            p[r] = aux;
        }
        this.p = p;
        this.perm = new Uint8Array(512);
        this.permMod12 = new Uint8Array(512);
        for (let i = 0; i < 512; i++) {
            this.perm[i] = this.p[i & 255];
            this.permMod12[i] = this.perm[i] % 12;
        }
    }
    /** Generates a noise value for the specified point
     * @param xPos x position to retrieve noise value
     * @param yPos y position to retrieve noise value
     * @returns A value within instance's min-max range (inclusive)
     */
    noise(xPos, yPos) {
        let frequency = this.scale, freqMod = this.pitch, iterations = this.iterations, persistence = this.persistence, maxAmplitude = 0, amplitude = 1, noise = 0;
        // iterate over each octave
        while (iterations--) {
            // apply frequency for the octave
            let x = xPos * frequency, y = yPos * frequency;
            const permMod12 = this.permMod12;
            const perm = this.perm;
            let n0 = 0; // Noise contributions from the three corners
            let n1 = 0;
            let n2 = 0;
            // Skew the input space to determine which simplex cell we're in
            const s = (x + y) * F2; // Hairy factor for 2D
            const i = Math.floor(x + s);
            const j = Math.floor(y + s);
            const t = (i + j) * G2;
            const X0 = i - t; // Unskew the cell origin back to (x,y) space
            const Y0 = j - t;
            const x0 = x - X0; // The x,y distances from the cell origin
            const y0 = y - Y0;
            // For the 2D case, the simplex shape is an equilateral triangle.
            // Determine which simplex we are in.
            let i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
            if (x0 > y0) {
                i1 = 1;
                j1 = 0;
            } // lower triangle, XY order: (0,0)->(1,0)->(1,1)
            else {
                i1 = 0;
                j1 = 1;
            } // upper triangle, YX order: (0,0)->(0,1)->(1,1)
            // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
            // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
            // c = (3-sqrt(3))/6
            const x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
            const y1 = y0 - j1 + G2;
            const x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords
            const y2 = y0 - 1.0 + 2.0 * G2;
            // Work out the hashed gradient indices of the three simplex corners
            const ii = i & 255;
            const jj = j & 255;
            // Calculate the contribution from the three corners
            let t0 = 0.5 - x0 * x0 - y0 * y0;
            if (t0 >= 0) {
                const gi0 = permMod12[ii + perm[jj]] * 3;
                t0 *= t0;
                n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0); // (x,y) of grad3 used for 2D gradient
            }
            let t1 = 0.5 - x1 * x1 - y1 * y1;
            if (t1 >= 0) {
                const gi1 = permMod12[ii + i1 + perm[jj + j1]] * 3;
                t1 *= t1;
                n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1);
            }
            let t2 = 0.5 - x2 * x2 - y2 * y2;
            if (t2 >= 0) {
                const gi2 = permMod12[ii + 1 + perm[jj + 1]] * 3;
                t2 *= t2;
                n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2);
            }
            // Add contributions from each corner, scale to [-1,1] then multiply by amplitude
            noise += (n0 + n1 + n2) * 70.0 * amplitude;
            // adjust amplitude and frequency values for next octave/iteration
            maxAmplitude += amplitude;
            amplitude *= persistence;
            frequency *= freqMod;
        }
        // take average then scale to the instances min-max range
        return (noise / maxAmplitude) * ((this.max - this.min) / 2) + (this.max + this.min) / 2;
    }
}
exports["default"] = SimplexNoise;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./styles/index.css */ "./src/styles/index.css");
const generator_1 = __importDefault(__webpack_require__(/*! ./generator/ */ "./src/generator/index.ts"));
const control_panel_1 = __importStar(__webpack_require__(/*! ./control-panel/ */ "./src/control-panel/index.ts"));
const info_box_1 = __importDefault(__webpack_require__(/*! ./components/info-box */ "./src/components/info-box/index.ts"));
const canvas = document.querySelector('canvas');
const infoBox = new info_box_1.default(canvas);
infoBox.updater = (x, y) => {
    if (map == null || mapSettings == null) {
        return null;
    }
    const waterDelta = mapSettings.water.altitude;
    return getTileInfo(map, mapSettings.temperature.taper - 1, mapSettings.temperature.taper - 1, waterDelta, waterDelta * mapSettings.water.depthDelta, (1 - waterDelta) * mapSettings.water.beachDelta + waterDelta, x, y);
};
document.querySelector('.wrapper > .content').appendChild(infoBox.element);
const ctx = canvas.getContext('2d');
const minmax = (min, value, max) => (value <= min ? min :
    value >= max ? max :
        value);
const getTileInfo = (map, temperatureHeightModifier, moistureHeightModifier, waterDelta, deepwaterDelta, beachDelta, x, y) => {
    const { height: heightDelta, temperature: temperatureDelta, moisture: moistureDelta } = map.getTile(x, y);
    let disposition, color = [], adjustedHeightDelta = heightDelta, adjustedTemperatureDelta = temperatureDelta, adjustedMoistureDelta = moistureDelta;
    if (heightDelta <= deepwaterDelta) {
        disposition = "deep water";
        const green = 100 * (heightDelta / deepwaterDelta);
        const blue = 200 * (heightDelta / deepwaterDelta);
        color = [`rgb(0, ${green}, ${blue})`];
    }
    else if (heightDelta <= waterDelta) {
        disposition = "shallow water";
        const green = 128 * (heightDelta / waterDelta);
        const blue = 255 * (heightDelta / waterDelta);
        color = [`rgb(0, ${green}, ${blue})`];
    }
    else if (heightDelta <= beachDelta) {
        disposition = "beach";
        const redgreen = 255 * (heightDelta / beachDelta);
        const blue = 192 * (heightDelta / beachDelta);
        color = [`rgb(${redgreen},${redgreen},${blue})`];
    }
    else {
        disposition = "land";
        // readjust height delta to account for water
        adjustedHeightDelta = (heightDelta - beachDelta) / (1 - beachDelta);
        // get base color
        const val = Math.floor(191 * adjustedHeightDelta + 64);
        color = [`rgb(0,${val},0)`];
        // Get adjusted temperature delta for the tile
        adjustedTemperatureDelta = minmax(0, temperatureDelta * ((1 + adjustedHeightDelta) ** temperatureHeightModifier), 1);
        // Get adjusted temperature delta for the tile
        adjustedMoistureDelta = minmax(0, moistureDelta * ((1 + adjustedHeightDelta) ** moistureHeightModifier), 1);
        if (adjustedTemperatureDelta < 0.5) {
            let n = (0.5 - adjustedTemperatureDelta) / 0.5;
            color.push(`rgba(0,${val},255,${n})`);
        }
        else if (adjustedTemperatureDelta > 0.5) {
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
    };
};
let map, mapSettings;
const generateMap = (settings) => {
    mapSettings = settings;
    map = new generator_1.default({ chunkSize: 1, ...settings });
    const waterDelta = mapSettings.water.altitude;
    const deepDelta = waterDelta * mapSettings.water.depthDelta;
    const beachDelta = (1 - waterDelta) * mapSettings.water.beachDelta + waterDelta;
    const getInfo = getTileInfo.bind(null, map, 
    // height-temp modifier
    mapSettings.temperature.taper - 1, 
    // height-moisture modifier
    mapSettings.moisture.taper - 1, waterDelta, deepDelta, beachDelta);
    let x = 0;
    while (x < 800) {
        let y = 0;
        while (y < 800) {
            const tileInfo = getInfo(x, y);
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
(0, control_panel_1.setGenerateFn)(generateMap);
if (document.readyState === "complete") {
    generateMap((0, control_panel_1.default)());
}
else {
    document.addEventListener('readystatechange', () => {
        if (document.readyState === "complete") {
            generateMap((0, control_panel_1.default)());
        }
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map