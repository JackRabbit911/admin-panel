export type SideItem = {
  label: string;
  to: string;
  sub?: SideItem[];
  disabled?: boolean;
}
