import { changeDisplayInOneDay, turnOnDisplay } from "./sensor";

export default async () => {
  changeDisplayInOneDay.date = new Date()
  changeDisplayInOneDay.off = false;
  await turnOnDisplay();
}
