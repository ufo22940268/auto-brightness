import { Cache } from "@raycast/api";

const cache = new Cache();

function getStringOfDay() {
  return new Date().toISOString().substring(0, 10);
}

export function storeChange(turnOff: boolean) {
  cache.set("temporaryChangeDate", getStringOfDay());
}

export function hasChange() {
  return getStringOfDay() == cache.get("temporaryChangeDate");
}

