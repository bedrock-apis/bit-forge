import { DebugBox, debugDrawer, DebugShape } from "@minecraft/debug-utilities";
import { RGBA, Vector3 } from "@minecraft/server";
import { normalizeRGB } from "./utility";

class Display {
    private _buffer: Uint32Array;
    public readonly width: number
    public readonly height: number
    public readonly displayOrigin: Vector3
    public readonly displayRotation: Vector3
    public readonly pixelSize: number = 0.03125; // 1/2 of a in game pixel

    constructor(width: number, height: number, displayOrigin: Vector3, pixelSize: number = 0.03125, displayRotation: Vector3 = {x: 0, y: 0, z: 0}) {
        if (width <= 0 || height <= 0) throw new Error("Width and height must be positive integers");
        this.width = width;
        this.height = height;

        this.displayOrigin = displayOrigin;
        this.pixelSize = pixelSize;
        this.displayRotation = displayRotation;
        
        this._buffer = new Uint32Array(width * height);
    }

    getBuffer() {
        return this._buffer;
    }
    
    setPixel(x: number, y: number, color: number | RGBA) {
        //Convert RGBA to 32 bit color
        if (typeof color === "object") color = (color.red << 16) | (color.green << 8) | color.blue | (color.alpha << 24);
        //Check if pixel is in bounds
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) throw new Error("Pixel out of bounds");
        //Check if color is in bounds
        if (color < 0 || color > 0xFFFFFFFF) throw new Error("Color out of bounds");

        //Get Buffer Index from X and Y
        const index = y * this.width + x;
        //Set the color at the index
        this._buffer[index] = color;
    }
    getPixel(x: number, y: number) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) throw new Error("Pixel out of bounds");
        
        //Get Buffer Index from X and Y
        const index = y * this.width + x;
        return this._buffer[index];
    }
    clear() {
        for (let i = 0; i < this._buffer.length; i++) {
            this._buffer[i] = 0;
        }
    }
    fill(color: number) {
        //Check if color is in bounds
        if (color < 0 || color > 0xFFFFFFFF) throw new Error("Color out of bounds");
        for (let i = 0; i < this._buffer.length; i++) {
            this._buffer[i] = color;
        }
    }
    render() {
        //Round the rotation to the nearest 90 degrees
        const roundedRotation = {
            x: Math.round(this.displayRotation.x / 90) * 90,
            y: Math.round(this.displayRotation.y / 90) * 90,
            z: Math.round(this.displayRotation.z / 90) * 90,
        };

        //Get the pixel origin
        //The pixel origin is the location of the top left pixel in the display, where the pixels are drawn from
        const pixelOrigin = {
            x: this.displayOrigin.x - (this.width * this.pixelSize) / 2,
            y: this.displayOrigin.y - (this.height * this.pixelSize) / 2,
            z: this.displayOrigin.z,
        }

        const shapes: DebugShape[] = [];
        for (let i = 0; i < this._buffer.length; i++) {
            //Finish later lmao
            const pixelPos = {
                x: pixelOrigin.x + (i % this.width) * this.pixelSize,
                y: pixelOrigin.y + Math.floor(i / this.width) * this.pixelSize,
                z: pixelOrigin.z
            }
            const color = this._buffer[i];
            const pixelColor = {
                red: (color >> 16) & 0xFF,
                green: (color >> 8) & 0xFF,
                blue: color & 0xFF,
            }
            
            const pixelAlpha = (color >> 24) & 0xFF;
            if (pixelAlpha <= 0.5) continue; //Skip if the pixel is mostly transparent
            const shape = new DebugBox(pixelPos)
            shape.color = normalizeRGB(pixelColor);
            shape.scale = this.pixelSize;
            shapes.push(shape);
        }
        shapes.forEach(shape => {
            debugDrawer.addShape(shape)
        });
    }
}



export { Display };