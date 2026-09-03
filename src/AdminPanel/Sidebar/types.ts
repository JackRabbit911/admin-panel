import type { IconName } from "Reused/Icon";
export type IMenuItem = {
  label: string;
  to: string;
  icon?: IconName;
  sub?: IMenuItem[];
  disabled?: boolean;
}
