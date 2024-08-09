import { isNumeric, readBrightness } from "./sensor";
import { $ } from "execa";
import { getPreferenceValues, showHUD, showToast } from "@raycast/api";

function clampBrightness(brightness: number) {
    const maxBrightness = getPreferenceValues()["maxBrightness"]
    if (!isNumeric(maxBrightness)) {
        throw new Error(`max brightness ${maxBrightness} should be a number`);
    }
    return Math.floor(Math.min(brightness, maxBrightness)/maxBrightness*100);
}

async function setBrightnessToMonitor(brightness: number) {
    const {stdout: current} = await $`/usr/local/bin/m1ddc get luminance`
    if (isNumeric(current) && Math.abs(Number(current) - brightness) < 10) {
        console.log(`current monitor brightness: ${current}, ambient brightness: ${brightness}. no need to update brightness`);
        return;
    }

    if (Number(current) < 0) {
        console.log("failed to get current brightness of monitor: ", + current);
        return;
    }

    console.log('update brightness');
    await $`/usr/local/bin/m1ddc set luminance ${brightness}`
    await showHUD(`adjust brightness ${current} to ${brightness}`)
}

export default async () => {
    let brightness = await readBrightness();
    console.log("start syncing, sensor brightness: " + JSON.stringify(brightness, null, 2));
    brightness = clampBrightness(brightness)
    await setBrightnessToMonitor(brightness)
}
