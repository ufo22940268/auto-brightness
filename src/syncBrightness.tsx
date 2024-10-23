import { isNumeric, readBrightness } from "./sensor";
import { $ } from "execa";
import { Cache, getPreferenceValues, launchCommand, LaunchType, showHUD } from "@raycast/api";

const cache = new Cache();
function clampBrightness(brightness: number) {
    const maxBrightness = getPreferenceValues()["maxBrightness"]
    if (!isNumeric(maxBrightness)) {
        throw new Error(`max brightness ${maxBrightness} should be a number`);
    }
    let v =  Math.floor(Math.min(brightness, maxBrightness)/maxBrightness*100);
    // if (v < 15 && brightness < 25) {
    //     v = brightness;
    // }
    return v;
}

async function setBrightnessToMonitor(brightness: number) {
    const current = cache.get("brightness");
    if (current != undefined && isNumeric(current)) {
        if (isNumeric(current) && Math.abs(Number(current) - brightness) < 10) {
            console.log(`current monitor brightness: ${current}, ambient brightness: ${brightness}. no need to update brightness`);
            return;
        }

        if (Number(current) < 0) {
            console.log("failed to get current brightness of monitor: ", +current);
            return;
        }
    }

    console.log("update current brightness " + current + "  to " + brightness);
    await $`/usr/local/bin/m1ddc set luminance ${brightness}`;
    if (getPreferenceValues()["promptBrightnessChange"]) {
        await showHUD(`adjust brightness ${current} to ${brightness}`);
    }
    return brightness;
}

export default async () => {
    let brightness = await readBrightness();
    console.log("start syncing, sensor brightness: " + JSON.stringify(brightness, null, 2));
    brightness = clampBrightness(brightness);
    const newBrightness = await setBrightnessToMonitor(brightness);
    if (newBrightness != undefined) {
        cache.set("brightness", newBrightness.toString());
    }
    await launchCommand({ name: "brightnessDiameter", type: LaunchType.Background });
}
