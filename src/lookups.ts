export type StringLookups =
  | "exact"
  | "iexact"
  | "contains"
  | "icontains"
  | "startswith"
  | "istartswith"
  | "endswith"
  | "iendswith";

export type NumberLookups = "exact" | "gt" | "gte" | "lt" | "lte";

export type BooleanLookups = "exact";
