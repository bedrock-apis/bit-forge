import { OpCodes } from "./cpu";
import { System } from "./system";

const system = new System();

system.cpu.loadProgram([
    OpCodes.LOAD_IMM,   0x00,   0x0A,
    OpCodes.LOAD_IMM,   0x01,   0x14,
    OpCodes.ADD,        0x00,   0x01,
    OpCodes.HALT
]);

const registers = system.cpu.getRegisters();
console.log(''+registers[0]);


/*
system.display.setPixel(0, 20, 0xFF0000FF);
fillPixels(system.display, 20, 40, 20, 30, 0x00FF00FF);

function fillPixels(display: Display, xMin: number, xMax: number, yMin: number, yMax: number, color: number) {
    for (let x = xMin; x < xMax; x++) {
        for (let y = yMin; y < yMax; y++) {
            display.setPixel(x, y, color);
        }
    }   
}
*/