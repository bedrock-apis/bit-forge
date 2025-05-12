import { RGB } from "@minecraft/server";

export namespace ColorUtilities {
    
    /**
     * Normalizes an RGB color to a 0-1 range.
     * @param color - The color to normalize
     * @returns The normalized color
     */
    export function normalizeRGB(color: RGB): RGB {
        if (color.red < 0 || color.red > 255) throw new Error("Red value out of bounds");
        if (color.green < 0 || color.green > 255) throw new Error("Green value out of bounds");
        if (color.blue < 0 || color.blue > 255) throw new Error("Blue value out of bounds");
        return {
            red: color.red / 255,
            green: color.green / 255,
            blue: color.blue / 255,
        };
    }

    /**
     * Denormalizes an RGB color from a 0-1 range to a 0-255 range.
     * @param color - The color to denormalize
     * @returns The denormalized color
     */
    export function denormalizeRGB(color: RGB): RGB {
        if (color.red < 0 || color.red > 1) throw new Error("Red value out of bounds");
        if (color.green < 0 || color.green > 1) throw new Error("Green value out of bounds");
        if (color.blue < 0 || color.blue > 1) throw new Error("Blue value out of bounds");
        return {
            red: Math.round(color.red * 255),
            green: Math.round(color.green * 255),
            blue: Math.round(color.blue * 255),
        };
    }

    /**
     * Converts an RGB color to a hex string.
     * @param color - The color to convert
     * @returns The hex string
     */
    export function hexToRgb(hex: string): RGB {
        if (hex.length !== 7) throw new Error("Hex color must be 7 characters long (including #)");
        const red = parseInt(hex.slice(1, 3), 16);
        const green = parseInt(hex.slice(3, 5), 16);
        const blue = parseInt(hex.slice(5, 7), 16);
        return { red, green, blue };
    }

    /**
     * Converts an RGB color to a hex string.
     * @param color - The color to convert
     * @returns The hex string
     */
    export function rgbToHex(color: RGB): string {
        const red = Math.round(color.red).toString(16).padStart(2, "0");
        const green = Math.round(color.green).toString(16).padStart(2, "0");
        const blue = Math.round(color.blue).toString(16).padStart(2, "0");
        return `#${red}${green}${blue}`;
    }
}
