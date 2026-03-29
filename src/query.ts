import { NestedLookup } from "./generator";

export type Query<T> = Partial<Record<NestedLookup<T, string>, any>>;
