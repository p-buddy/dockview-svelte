import type { AddedPanelByView } from "./index.js";

export default class ReactivePanelUpdater<T> {
  #value?: T;
  private subscribers = new Map<AddedPanelByView, (value: T) => void>();

  get value() {
    return this.#value;
  }

  constructor(getter: () => T) {
    this.#value = getter();
    $effect(() => {
      this.#value = getter();
      for (const detached of ReactivePanelUpdater.Dettached)
        this.subscribers.delete(detached)
      ReactivePanelUpdater.Dettached.clear();
      for (const subscriber of this.subscribers.values())
        subscriber(this.#value);
    });
  }

  attach(panel: AddedPanelByView, path: string[]) {
    console.log("attach", this.#value);
    const root = {} as Record<string, any>;

    path.reduce((acc, curr, index, { length }) => {
      const isLast = index === length - 1;
      acc[curr] = isLast ? this.#value : {};
      return acc;
    }, root!);

    this.subscribers.set(panel, (value: T) => {
      path.reduce((acc, curr, index, { length }) => {
        const isLast = index === length - 1;
        if (isLast) {
          acc[curr] = value;
        } else return acc[curr];
      }, root!);

      panel.update(root as any);
    });
  }

  private static Dettached = new Set<AddedPanelByView>()

  static DettachFromAll(panel: AddedPanelByView) {
    this.Dettached.add(panel);
  }
}