import { $, execa } from "execa";
import path from "path";
import { environment } from "@raycast/api";
import * as fs from "fs";

const binaryAsset = path.join(environment.assetsPath, "read_brightness.py");
const binary = path.join(environment.supportPath, "read_brightness.py");
async function ensureBinary() {
    if (!fs.existsSync(binary)) {
        await execa("cp", [binaryAsset, binary]);
        await execa("chmod", ["+x", binary]);
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
    const {stdout} = await execa("python3", [binary]);
    if (!isNumeric(stdout)) {
        throw new Error("error get brightness: " + stdout);
    }
    return Number(stdout)
}
