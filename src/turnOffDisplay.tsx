import { changeDisplayInOneDay, turnOffDisplay } from "./sensor";

export default async () => {
  changeDisplayInOneDay.date = new Date()
  changeDisplayInOneDay.off = true;
  await turnOffDisplay();
}
