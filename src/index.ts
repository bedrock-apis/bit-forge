import { Display } from "./display";

//Testings

const display = new Display(64, 32, {x: 0, y: 90, z: 0}, undefined, undefined);
display.setPixel(0, 20, 0xFF0000FF);
fillPixels(display, 20, 40, 20, 30, 0x00FF00FF);

function fillPixels(display: Display, xMin: number, xMax: number, yMin: number, yMax: number, color: number) {
    for (let x = xMin; x < xMax; x++) {
        for (let y = yMin; y < yMax; y++) {
            display.setPixel(x, y, color);
        }
    }
    
}