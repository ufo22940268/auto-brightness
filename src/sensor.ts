import { $, execa } from "execa";
import path from "path";

const assetsPath = '/Users/chao.cheng/code/extensions/auto-brightness/assets'
const binary = path.join(assetsPath, "cli.py");


export function isNumeric(str: string) {
    if (typeof str != "string") return false // we only process strings!
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

export const readBrightness = async (): Promise<number> => {
    const {stdout} = await execa("python3", [binary, 'get_brightness']);
    if (!isNumeric(stdout)) {
        throw new Error("error get brightness: " + stdout);
    }
    console.log("brightness from sensor: " + stdout);
    return Number(stdout)
}

export const turnOffDisplay = async (): Promise<void> => {
    await execa("python3", [binary, 'turn_off_display', 'True']);
}

export const turnOnDisplay = async (): Promise<void> => {
    await execa("python3", [binary, 'turn_off_display', 'False']);
}

export const m1ddc = async (command: string[]): Promise<string> => {
    const { stdout, stderr } = await execa("/usr/local/bin/m1ddc", command);
    if (stderr) {
        throw new Error("error m1ddc: " + stderr);
    }

    return stdout;
}
