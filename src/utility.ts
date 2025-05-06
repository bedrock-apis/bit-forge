import { RGB } from "@minecraft/server";

export function normalizeRGB(color: RGB): RGB {
    //Convert RGB to 0-1 range
    return {
        red: color.red / 255,
        green: color.green / 255,
        blue: color.blue / 255,
    };
}