import { isNumeric, readBrightness } from "./sensor";
import { $ } from "execa";

function clampBrightness(brightness: number) {
    return Math.floor(Math.min(brightness, 60)/60*100)
}

async function setBrightnessToMonitor(brightness: number) {
    const {stdout: current} = await $`/usr/local/bin/m1ddc get luminance`
    if (isNumeric(current) && Math.abs(Number(current) - brightness) < 10) {
        console.log(`current monitor brightness: ${current}, ambient brightness: ${brightness}. no need to update brightness`);
        return;
    }
    console.log('update brightness');
    await $`/usr/local/bin/m1ddc set luminance ${brightness}`
}

export default async () => {
    let brightness = await readBrightness();
    brightness = clampBrightness(brightness)
    await setBrightnessToMonitor(brightness)
}
