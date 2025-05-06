import {RolldownOptions} from "rolldown";
import {name} from "./package.json" with { type: "json" };
import * as manifest from "./behavior_pack_template/manifest.json" with { type: "json" };
import { dirname, resolve } from "node:path";
import { env } from "node:process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";

const VALID_NAME = name.replace(/@-\*\/\\/,"_");
const PUBLISHER = "Microsoft";
const PRODUCT_NAME = "MinecraftWindowsBeta";
const PRODUCT_ID = "8wekyb3d8bbwe"

const BEHAVIOR_PACKS = resolve(`${env["LOCALAPPDATA"]}/Packages/${PUBLISHER}.${PRODUCT_NAME}_${PRODUCT_ID}/LocalState/games/com.mojang/development_behavior_packs`);
const PROJECT_FOLDER = resolve(`${BEHAVIOR_PACKS}/${VALID_NAME}`);
const SCRIPTS_FILE = resolve(PROJECT_FOLDER, manifest.modules[0].entry??manifest.modules[1].entry??"scripts/main.js");

if(!existsSync(BEHAVIOR_PACKS))
    throw "Minecraft Preview Local AppData not found";

if(!existsSync(PROJECT_FOLDER))
{
    mkdirSync(PROJECT_FOLDER);
    writeFileSync(resolve(PROJECT_FOLDER, "manifest.json"), JSON.stringify(manifest));
    mkdirSync(dirname(SCRIPTS_FILE), {recursive: true});

}

console.log("Bundling to", SCRIPTS_FILE);
export default [
    {
        input: "src/index.ts",
        external: /^@minecraft/,
        output:{
            file:SCRIPTS_FILE
        }
    }
] satisfies RolldownOptions[];