import type { Component, mount } from "svelte";

export type RequiredAndPartial<T, Required extends keyof T> = Pick<T, Required> &
  Partial<Omit<T, Required>>;

type OptionalKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? K : never
}[keyof T];

type OptionalProperties<T> = Pick<T, OptionalKeys<T>>;

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type ExpandRecursively<T> = T extends object
  ? T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never
  : T;

export type AnyComponent = Component<any, any, any>;

export type ConstrainedComponent
  <Props extends Record<string, any> = Record<string, any>,
    Exports extends Record<string, any> = Record<string, any>,
    Bindings extends "" | keyof Props = "" | keyof Props
  > = Component<Props, Exports, Bindings>;

type v4ComponentExportsInternalKeys = "$on" | "$set";
type v4ComponentPropsInternalKeys = "$$slots" | "$$events";

export type ComponentExports<TComponent extends AnyComponent> =
  TComponent extends Component<any, infer Exports, any>
  ? Omit<Exports, v4ComponentExportsInternalKeys>
  : never;

export type ComponentProps<TComponent extends AnyComponent> =
  TComponent extends Component<infer Props, any, any>
  ? Omit<Props, keyof ComponentExports<TComponent> | v4ComponentPropsInternalKeys>
  : never;

export type OmitNever<T> = { [K in keyof T as T[K] extends never ? never : K]: T[K] }

export type RecursivePartial<T> = {
  [P in keyof T]?:
  T[P] extends (infer U)[]
  ? RecursivePartial<U>[]
  : T[P] extends object | undefined
  /**/ ? RecursivePartial<T[P]>
  /**/ : T[P];
};

export type RecordLike = { [index: string]: any };

type Subtract<N extends number, M extends number> =
  N extends M ? 0 : N;

type DefaultPathDepth = 1;

/**
 * Takes an object type T and produces a union of all possible
 * key-path tuples leading down to nested properties, up to a maximum depth.
 * 
 * @template T - The object type to create paths for
 * @template Depth - The maximum depth to recurse (default: 2)
 */
export type Path<T, Depth extends number = DefaultPathDepth> =
  [Depth] extends [never]
  /**/ ? never
  /**/ : Depth extends 0
    /**/ ? never
    /**/ : T extends object
      /**/ ? { [K in keyof T]: [K] | [K, ...Path<T[K], Subtract<Depth, 1>>] }[keyof T]
      /**/ : [];

/**
 * Given a type T and a path tuple P, returns the type
 * you'd get if you looked up T along that path.
 *
 * For example, if T = { a: { b: string } }
 *   PathValue<T, ["a"]>        = { b: string }
 *   PathValue<T, ["a","b"]>    = string
 */
export type ValueAtPath<T, P extends any[]> =
  P extends [infer K, ...infer Rest]
  /**/ ? K extends keyof T
    /**/ ? Rest extends []
      /**/ ? T[K]
      /**/ : ValueAtPath<T[K], Rest>
    /**/ : never
  /**/ : T;


export type Mounted<Props extends Record<string, any> = any, Exports extends Record<string, any> = any> =
  ReturnType<typeof mount<Props, Exports>>;

export type AsNonReadonly<T extends object> = {
  -readonly [K in keyof T]: T[K];
};
