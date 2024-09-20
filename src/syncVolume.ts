import { m1ddc, updateText } from "./sensor";

function getBrightness() {

}

async function getVolume() {
  return await m1ddc(["get", "volume"])
}

export default async () => {
  const volume = await getVolume();
  await updateText("volume:" + volume);
}
