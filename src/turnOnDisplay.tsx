import { turnOnDisplay } from "./sensor";
import { storeChange } from "./temporaryChangeDisplay";

export default async () => {
  storeChange(false);
  await turnOnDisplay();
}
