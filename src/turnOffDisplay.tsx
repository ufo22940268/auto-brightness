import { turnOffDisplay, turnOnDisplay } from "./sensor";

export default async () => {
  const currentHour = new Date().getHours();
  if (currentHour >= 21 || currentHour < 6) {
    await turnOffDisplay();
  } else {
    await turnOnDisplay();
  }
}
