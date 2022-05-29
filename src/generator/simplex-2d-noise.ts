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

/**
 * A random() function, must return a numer in the interval [0,1), just like Math.random().
 */
export type RandomFn = () => number;

export const Alea = (seed: string | number): RandomFn => {

    // Masher has been incorporated into Alea initializer
    // Increases time taken to initialize but reduces memory footprint once initialized
    let n = 0xefc8249d;
    let mash = (data: number | string): number => {
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

/** 2D Simplex multi-octave noise generator*/
export default class SimplexNoise {
    private p: Uint8Array;
    private perm: Uint8Array;
    private permMod12: Uint8Array;

    private scale: number;
    private iterations: number;
    private pitch: number;
    private persistence: number;
    private min: number;
    private max: number;

    /** Creates a new `SimplexNoise` instance.
     * @param randomOrSeed A random number generator or a seed (string|number).
     * @param scale The base frequency of the noise
     * @param iterations The number of octaves to iterate through
     * @param pitch The value each sequential iteration's frequency will be multipled by
     * @param persistence Affects amplitude(weight) tapering of each successive octave(iteration)
     * @param min The minimum value that can be returned
     * @param max The maximum value that can be returned
     */
    constructor(
        randomOrSeed: RandomFn | string | number = Math.random,
        scale: number = 0,
        iterations: number = 1,
        pitch: number = 2,
        persistence: number = 1,
        min: number = 0,
        max: number = 1
    ) {
        const random = typeof randomOrSeed == 'function' ? randomOrSeed : Alea(randomOrSeed);
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
    noise(xPos: number, yPos: number): number {
        let frequency = this.scale,
            freqMod = this.pitch,
            iterations = this.iterations,
            persistence = this.persistence,
            maxAmplitude = 0,
            amplitude = 1,
            noise = 0;

        // iterate over each octave
        while (iterations--) {

            // apply frequency for the octave
            let x = xPos * frequency,
                y = yPos * frequency;

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
            let i1: number,
                j1: number; // Offsets for second (middle) corner of simplex in (i,j) coords
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
            noise += (n0 + n1 + n2) * 70.0 * amplitude

            // adjust amplitude and frequency values for next octave/iteration
            maxAmplitude += amplitude;
            amplitude *= persistence;
            frequency *= freqMod;
        }

        // take average then scale to the instances min-max range
        return (noise / maxAmplitude) * ((this.max - this.min) / 2) + (this.max + this.min) / 2;
    }
}