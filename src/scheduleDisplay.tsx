import { changeDisplayInOneDay, turnOffDisplay, turnOnDisplay } from "./sensor";

export default async () => {
  const currentHour = new Date().getHours();

  let currentDate = new Date();
  if (changeDisplayInOneDay.date && currentDate.toISOString().substring(0,10) === (changeDisplayInOneDay.date as Date).toISOString().substring(0,10)) {
    return;
  }

  if (currentHour >= 21 || currentHour < 6) {
    console.log('turnOffDisplay');
    await turnOffDisplay();
  } else {
    console.log('turnOnDisplay');
    await turnOnDisplay();
  }
}
