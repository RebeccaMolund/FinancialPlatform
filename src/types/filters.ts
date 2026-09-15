export type FilterType =
  | "text"
  | "daterange"
  | "numrange"
  | "multiselect"
  | "checklist"
  | "ordernummer"
  | "toggle"
  | "avsnitt";

export interface FilterDef {
  id: string;
  label: string;
  type: FilterType;
}
