type MemoryBuffer = Uint8Array | Uint16Array | Uint32Array

export class Memory {
    private _buffer: Uint8Array;

    constructor(size: number) {
        if (size <= 0) throw new Error("Size must be a positive integer");
        this._buffer = new Uint8Array(size);
    }

    write(addr: number, value: number) {
        if (addr < 0 || addr >= this._buffer.length) throw new Error("Address out of bounds");
        if (value < 0 || value >= Math.pow(2, this._buffer.BYTES_PER_ELEMENT * 8)) throw new Error("Value out of bounds");
        this._buffer[addr] = value;
    }

    read(addr: number): number {
        if (addr < 0 || addr >= this._buffer.length) throw new Error("Address out of bounds");
        return this._buffer[addr];
    }
    get buffer() {
        return this._buffer;
    }
    get size() {
        return this._buffer.length;
    }
}
