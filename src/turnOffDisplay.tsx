import { turnOffDisplay } from "./sensor";

import { storeChange } from "./temporaryChangeDisplay";

export default async () => {
  storeChange(true);
  await turnOffDisplay();
}
