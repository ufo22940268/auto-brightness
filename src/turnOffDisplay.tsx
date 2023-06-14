import { turnOffDisplay, turnOnDisplay } from "./sensor";

export default async () => {
  const currentHour = new Date().getHours();
  if (currentHour >= 21 || currentHour < 6) {
    console.log('turnOffDisplay');
    await turnOffDisplay();
  } else {
    console.log('turnOnDisplay');
    await turnOnDisplay();
  }
}
