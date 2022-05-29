import { default as Simplex2D, Alea } from './simplex-2d-noise';

export interface SimplexOptions {
    scale: number,
    iterations: number,
    pitch: number,
    persistence: number
    min: number,
    max: number
};

export interface MapGeneratorOptions {
    chunkSize?: number;
    seed?: number | string;
    height?: SimplexOptions;
    temperature?: SimplexOptions;
    moisture?: SimplexOptions;
    soil?: SimplexOptions;
};

export interface TileNoise {
    height: number;
    temperature: number;
    moisture: number;
    soil: number;
};

/** Validates options and then creates a new Simplex2D instance
 *
 * @param mapType Text description of map
 * @param seed Seed of the map to generate
 * @param defaults Default values to use if options is not specified
 * @param options Options to use instead of defaults
 * @returns Simplex2D instance
 */
const initializeSymplex = (
    mapType: string,
    seed: number | string,
    defaults: SimplexOptions,
    options?: SimplexOptions
): Simplex2D => {
    if (options == null) {
        return new Simplex2D(
            seed,
            defaults.scale,
            defaults.iterations,
            defaults.pitch,
            defaults.persistence,
            defaults.min,
            defaults.max
        );
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
        options.min <= options.max
    ) {
        return new Simplex2D(
            seed,
            options.scale,
            options.iterations,
            options.pitch,
            options.persistence,
            options.min,
            options.max
        )
    }

    throw new Error(`invalid ${mapType}-map generation options`);
};

export default class MapGenerator {

    public readonly chunkSize: number;
    public readonly seed: number | string;

    public readonly terrainSurfaceSeed: number | string;
    public readonly terrainFeatureSeed: number | string;

    public readonly heightSeed: number | string;
    public readonly temperatureSeed: number | string;
    public readonly moistureSeed: number | string;
    public readonly soilSeed: number | string;

    private heightMap: Simplex2D;
    private temperatureMap: Simplex2D;
    private moistureMap: Simplex2D;
    private soilMap: Simplex2D;

    constructor(options?: MapGeneratorOptions) {
        if (options == null) {
            options = {};
        }

        // Resolve and validate chunk size
        if (options.chunkSize == null) {
            this.chunkSize = 16;
        } else if (
            typeof options.chunkSize !== 'number' ||
            !Number.isInteger(options.chunkSize) ||
            options.chunkSize < 1
        ) {
            throw new Error('invalid chunk size');
        } else {
            this.chunkSize = options.chunkSize;
        }

        // Resolve and validate seed
        if (options.seed == null) {
            this.seed = Date.now().toString();
        } else if (typeof options.seed !== 'number' && typeof options.seed !== 'string') {
            throw new Error('invalid map seed');
        } else {
            this.seed = options.seed;
        }

        // Initialize PRNG with map's seed
        const prng = Alea(this.seed);

        // Generate seeds for terrian surface and features
        this.terrainSurfaceSeed = prng();
        this.terrainFeatureSeed = prng();

        // Generate seeds for height, temperature and moisture maps
        this.heightSeed = prng();
        this.temperatureSeed = prng();
        this.moistureSeed = prng();
        this.soilSeed = prng();

        // Default generator options when not specified
        const defaultOptions: SimplexOptions = {
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

    getTile(x: number, y: number): TileNoise {
        return {
            height: this.heightMap.noise(x, y),
            temperature: this.temperatureMap.noise(x, y),
            moisture: this.moistureMap.noise(x, y),
            soil: 0 /* this.soilMap.noise(x, y) */
        };
    }
}