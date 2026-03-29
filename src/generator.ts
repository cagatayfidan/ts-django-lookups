import { StringLookups, NumberLookups, BooleanLookups } from "./lookups";

export type Lookup<T> = T extends string
  ? StringLookups
  : T extends number
    ? NumberLookups
    : T extends boolean
      ? BooleanLookups
      : never;

export type LastSegment<S extends string> =
  S extends `${infer _}__${infer Rest}` ? LastSegment<Rest> : S;

export type LooseLookupKeys<T> = keyof T | `${string}__${Lookup<T[keyof T]>}`;

export type LookupKeys<T> = {
  [K in keyof T]: Extract<K, string> | `${string}__${Lookup<T[K]>}`;
}[keyof T];

export type ValidateLookup<T, S extends string> =
  LastSegment<S> extends Lookup<T[keyof T]> ? S : never;

export type FieldForKey<
  T,
  K extends string,
> = K extends `${infer Prefix}__${infer Last}`
  ? Last extends Lookup<T[keyof T]>
    ? K
    : never
  : K extends keyof T
    ? K
    : never;

export type NestedLookup<
  T,
  K extends string,
> = K extends `${infer F}__${infer Rest}`
  ? F extends keyof T
    ? T[F] extends object
      ? NestedLookup<T[F], Rest>
      : LastSegment<K> extends Lookup<T[F]>
        ? K
        : never
    : never
  : K extends keyof T
    ? K
    : never;
