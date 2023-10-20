import { Cache, Icon, MenuBarExtra } from "@raycast/api";

export default function Command() {
  const brightness = new Cache().get("brightness");
  return (
    <MenuBarExtra icon={Icon.Sun} title={brightness + "%"}>
    </MenuBarExtra>
  );
}
