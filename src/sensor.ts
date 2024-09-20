import { $, execa } from "execa";
import path from "path";
import { environment } from "@raycast/api";
import * as fs from "fs";

const binaryAsset = path.join(environment.assetsPath, "cli.py");
const binary = path.join(environment.supportPath, "cli.py");

const talkerAsset = path.join(environment.assetsPath, "talker.py");
const talker = path.join(environment.supportPath, "talker.py");

async function ensureBinary() {
    if (!fs.existsSync(binary)) {
        await execa("cp", [binaryAsset, binary]);
        await execa("chmod", ["+x", binary]);
    }

    if (!fs.existsSync(talker)) {
        await execa("cp", [talkerAsset, talker]);
        await execa("chmod", ["+x", talker]);
    }
}

export function isNumeric(str: string) {
    if (typeof str != "string") return false // we only process strings!
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

export const readBrightness = async (): Promise<number> => {
    await ensureBinary();
    const {stdout} = await execa("python3", [binary, 'get_brightness']);
    if (!isNumeric(stdout)) {
        throw new Error("error get brightness: " + stdout);
    }
    return Number(stdout)
}

export const updateText = async (text: string) => {
    await ensureBinary();

    await execa("python3", [binary, 'update_text', text]);
}


export const m1ddc = async (command: string[]): Promise<string> => {
    const { stdout, stderr } = await execa("/usr/local/bin/m1ddc", command);
    if (stderr) {
        throw new Error("error m1ddc: " + stderr);
    }

    return stdout;
}
