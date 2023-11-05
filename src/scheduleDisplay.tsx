import { turnOffDisplay, turnOnDisplay } from "./sensor";
import { hasChange } from "./temporaryChangeDisplay";

export default async () => {
  const currentHour = new Date().getHours();

  // if (hasChange() != null) {
  //   return true;
  // }

  if (currentHour >= 21 || currentHour < 6) {
    console.log('turnOffDisplay');
    await turnOffDisplay();
  } else {
    console.log('turnOnDisplay');
    await turnOnDisplay();
  }
}

