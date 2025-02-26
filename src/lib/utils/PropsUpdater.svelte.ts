import type { IFrameworkPart } from "dockview-core";
import type { ValueAtPath, Path } from "./types.js";

export type PropsPostProcessor<T extends Record<string, any>> = (props: T) => void;

export class PropsUpdater<T extends Record<string, any>> implements Pick<IFrameworkPart, "update"> {
  props = $state<T>()!;
  private readonly postProcessor?: PropsPostProcessor<T>;

  constructor(props: T, postProcessor?: PropsPostProcessor<T>) {
    this.props = props;
    this.postProcessor = postProcessor;
    this.postProcessor?.(this.props);
  }

  update(props: T) {
    this.props = props;
    this.postProcessor?.(this.props);
  }

  /**
   * Example usage:
   *   updateSingle("topKey", "nestedKey", newValue)
   *   updateSingle("deep", "nested", "property", newValue)
   * 
   * The last argument must match the type at that path in T.
   */
  updateSingle<P extends Path<T>>(...keysAndValue: [...P, ValueAtPath<T, P>]): void {
    const value = keysAndValue.pop()!;
    const keys = keysAndValue as any as P;
    const { length } = keys;

    let target: any = this.props;
    for (let i = 0; i < length - 1; i++)
      target = target[keys[i]];

    target[keys[length - 1]] = value;
    this.postProcessor?.(this.props);
  }
}