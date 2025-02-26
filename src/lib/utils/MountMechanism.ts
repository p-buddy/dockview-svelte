import { deferred } from "./helpers.js";

/**
re * The recipe to cate a identifier for a component mounted into a panel.
 * 
 * The below properties where chosen as they can guarantee uniqueness, while also preserving helpful information.
 * 
 * @description
 * `viewIndex` allows us to distinguish which view instance the panel belongs to (e.g. ). 
 */
export type IdentifierRecipe = {
  /** The target of the panel to be rendered */
  panelTarget: `${"dock" | "grid" | "split" | "pane"}${"" | "header" | "watermark" | "actions"}`,

  /** The index of the specific view 
   * (which the view components _should_ internally keep track of, 
   * e.g. this is the first aka 0th-index dockview, or the second aka 1st-index gridview) 
   */
  viewIndex: number,
  /** The given id of the panel */
  id: string,
  /** The name of the component to be mounted */
  name: string
};

type Identifier<Recipe extends IdentifierRecipe> = `${Recipe["viewIndex"]}${Recipe["id"]}${Recipe["name"]}`;

export class MountMechanism {
  private defferedMountMap = new Map<
    ReturnType<typeof this.id>,
    ReturnType<typeof deferred<Record<string, any>>>
  >();

  static ID = <Recipe extends IdentifierRecipe>({ viewIndex, id, name }: Recipe): Identifier<Recipe> =>
    `${viewIndex}${id}${name}`;

  readonly id = MountMechanism.ID;

  await<Exports extends Record<string, any>>(
    identifier: IdentifierRecipe,
    reset = false,
  ): Promise<Exports> {
    const mountID = this.id(identifier);
    if (this.defferedMountMap.has(mountID) && !reset)
      return this.defferedMountMap.get(mountID)!.promise as Promise<Exports>;
    const _deffered = deferred<Record<string, any>>();
    this.defferedMountMap.set(mountID, _deffered);
    return _deffered.promise as Promise<Exports>;
  }

  get<Exports extends Record<string, any>>(
    id: ReturnType<typeof this.id>
  ) {
    const stored = this.defferedMountMap.get(id);
    return stored as ReturnType<typeof deferred<Exports>> | undefined;
  }

  drop(id: ReturnType<typeof this.id>) {
    this.defferedMountMap.delete(id);
  }

  tryResolveAndDrop<Exports extends Record<string, any>>(id: ReturnType<typeof this.id>, instance: Exports) {
    this.get(id)?.resolve(instance);
    this.drop(id);
  }
}