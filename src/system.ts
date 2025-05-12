import { Cpu } from "./cpu"
import { Display } from "./display"
import { Memory } from "./memory"

class System {
    readonly cpu: Cpu
    readonly display: Display
    readonly memory: Memory

    constructor() {
        this.memory = new Memory(2088) // 2KB of memory
        this.cpu = new Cpu(this.memory)
        this.display = new Display(64, 32, {x: 0, y: 90, z: 0}, undefined, undefined)
    }
}

export { System }