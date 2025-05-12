import { Memory } from "./memory";

export enum OpCodes {

    // Load value from memory into register
    LOAD = 0x01, // LOAD REGISTER, ADDRESS

    // Load immediate value into register
    LOAD_IMM = 0x02, // LOAD_IMM REGISTER, VALUE
    
    // Move value from one register to another 
    MOV = 0x03, // MOV REGISTER_A, REGISTER_B

    // Store value from register to memory
    STORE = 0x04, // STORE REGISTER, ADDRESS

    ADD = 0x10, // ADD REGISTER_A, REGISTER_B
    SUB = 0x11, // SUB REGISTER_A, REGISTER_B
    MUL = 0x12, // MUL REGISTER_A, REGISTER_B
    DIV = 0x13, // DIV REGISTER_A, REGISTER_B
    MOD = 0x14, // MOD REGISTER_A, REGISTER_B

    // Not operation (bitwise NOT)
    NOT = 0x20, // NOT REGISTER_A

    // System Instructions
    NOP = 0xFE, // No operation
    HALT = 0xFF, // Halt the CPU
}

class Cpu {
    private registers: number[]; // CPU registers
    private pc: number = 0; // Program Counter
    private halted: boolean = false; // Flag to check if CPU is halted
    
    private readonly memory: Memory;

    constructor(memory: Memory, registerSize: number = 8) {
        this.memory = memory;
        this.registers = new Array(registerSize).fill(0);
    }
    
    public loadProgram(program: number[]): void {
        if (program.length > this.memory.size) {
            throw new Error("Program size exceeds memory size");
        }
        for (let i = 0; i < program.length; i++) {
            this.memory.write(i, program[i]);
        }
        this.pc = 0; // Reset program counter to start of the program
    }
    
    public run(): void {
        while (!this.halted && this.pc < this.memory.size) {
            const opcode = this.fetch();
        
            switch (opcode) {

                // Memory operations
                case OpCodes.LOAD: {
                    const reg = this.fetch();
                    const addr = this.fetch();
                    this.registers[reg] = this.memory.read(addr);
                    break;
                }
                case OpCodes.LOAD_IMM: {
                    const reg = this.fetch();
                    const value = this.fetch();
                    this.registers[reg] = value;
                    break;
                }
                case OpCodes.MOV: {
                    const regA = this.fetch();
                    const regB = this.fetch();
                    this.registers[regA] = this.registers[regB];
                    break;
                }
                case OpCodes.STORE: {
                    const reg = this.fetch();
                    const addr = this.fetch();
                    this.memory.write(addr, this.registers[reg]);
                    break;
                }

                //Math operations
                case OpCodes.ADD: {
                    const regA = this.fetch();
                    const regB = this.fetch();
                    this.registers[regA] += this.registers[regB];
                    break;
                }
                case OpCodes.SUB: {
                    const regA = this.fetch();
                    const regB = this.fetch();
                    this.registers[regA] -= this.registers[regB];
                    break;
                }
                case OpCodes.MUL: {
                    const regA = this.fetch();
                    const regB = this.fetch();
                    this.registers[regA] *= this.registers[regB];
                    break;
                }
                case OpCodes.DIV: {
                    const regA = this.fetch();
                    const regB = this.fetch();
                    if (this.registers[regB] === 0) throw new Error("Division by zero");
                    this.registers[regA] /= this.registers[regB];
                    break;
                }
                case OpCodes.MOD: {
                    const regA = this.fetch();
                    const regB = this.fetch();
                    if (this.registers[regB] === 0) throw new Error("Division by zero");
                    this.registers[regA] %= this.registers[regB];
                    break;
                }

                // Bitwise operations
                case OpCodes.NOT: {
                    const regA = this.fetch();
                    this.registers[regA] = ~this.registers[regA];
                    break;
                }
                
                // System operations
                case OpCodes.NOP: {
                    // No operation, do nothing
                    break;
                }
                case OpCodes.HALT: {
                    this.halted = true;
                    break;
                }


                // Unrecognized opcode
                default:
                    throw new Error(`Unknown opcode: ${opcode}`);
            }
        }
    }
    
    /**
     * Fetches the next byte from the program memory.
     * @returns The next byte from the program memory and increments the program counter.
     */
    private fetch(): number {
        return this.memory.read(this.pc++);
    }

    public getRegisters(): number[] {
        return [...this.registers]; // shallow copy to prevent mutation
    }
    public reset(): void {
        this.pc = 0;
        this.halted = false;
        this.registers.fill(0);
    }
    public isHalted(): boolean {
        return this.halted;
    }
    
}

export { Cpu };