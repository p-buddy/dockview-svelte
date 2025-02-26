import type {
  IFrameworkPart,
  DockviewApi,
  GridviewApi,
  IGridviewPanel,
  IDockviewPanel,
  IPaneviewPanel,
  ISplitviewPanel,
  SplitviewApi,
  PaneviewApi,
  GridviewFrameworkOptions,
  DockviewFrameworkOptions,
  SplitviewFrameworkOptions,
  PaneviewFrameworkOptions,
  PanelApi,
  IDockviewPanelHeaderProps,
  IWatermarkPanelProps,
  IDockviewHeaderActionsProps,
  PanelUpdateEvent,
} from "dockview-core";
import { mount, unmount, type Component, type Snippet } from "svelte";
import type {
  IPaneviewReactProps,
  IDockviewReactProps,
  IGridviewReactProps,
  ISplitviewReactProps,
  IGridviewPanelProps,
  IDockviewPanelProps,
  IPaneviewPanelProps,
  ISplitviewPanelProps,
} from "dockview";
import SnippetRender from "./utils/SnippetRender.svelte";

/** BEGIN Utilities */
type RequiredAndPartial<T, Required extends keyof T> = Pick<T, Required> &
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
type ConstrainedComponent
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

export type Mounted<Props extends Record<string, any> = any, Exports extends Record<string, any> = any> =
  ReturnType<typeof mount<Props, Exports>>;

type RecordLike = { [index: string]: any };

type OmitNever<T> = { [K in keyof T as T[K] extends never ? never : K]: T[K] }

export type RecursivePartial<T> = {
  [P in keyof T]?:
  T[P] extends (infer U)[]
  ? RecursivePartial<U>[]
  : T[P] extends object | undefined
  /**/ ? RecursivePartial<T[P]>
  /**/ : T[P];
};

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
type Path<T, Depth extends number = DefaultPathDepth> =
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
type ValueAtPath<T, P extends any[]> =
  P extends [infer K, ...infer Rest]
  /**/ ? K extends keyof T
    /**/ ? Rest extends []
      /**/ ? T[K]
      /**/ : ValueAtPath<T[K], Rest>
    /**/ : never
  /**/ : T;

/** END Utilities */

/**
 * The props for the React version of the different view components
 */
export type ReactViewPropsByView = {
  grid: IGridviewReactProps;
  dock: IDockviewReactProps;
  pane: IPaneviewReactProps;
  split: ISplitviewReactProps;
};

/** The keys of the different view types */
export type ViewKey = keyof ReactViewPropsByView;

/** The props of the components underlying the added panels within the different views */
export type PanelComponentProps<T extends ViewKey = ViewKey> = {
  grid: IGridviewPanelProps;
  dock: IDockviewPanelProps;
  pane: IPaneviewPanelProps;
  split: ISplitviewPanelProps;
}[T];

export type OriginalPanelPropKeys<T extends ViewKey = ViewKey> = keyof PanelComponentProps<T>;

/** The type of the panel returned by `api.addPanel` for the different views */
export type AddedPanelByView<T extends ViewKey = ViewKey> = {
  grid: IGridviewPanel;
  dock: IDockviewPanel;
  pane: IPaneviewPanel;
  split: ISplitviewPanel;
}[T];

/** A collection of svelte components (v5 / "runes mode" and/or v4 / "legacy mode") that can be used as panel componets (their props are restricted according to the view type) */
export type ComponentsConstraint<ViewType extends ViewKey> = Record<
  string,
  Exclude<Component<PanelComponentProps<ViewType>, Record<string, any>, any>, () => Symbol>
>;

export type CustomComponentConstraint<Props extends Record<string, any>> = Record<
  string,
  Component<Props, Record<string, any>, any>
>;

/** A collection of snippets that can be used as panel componets (their props are restricted according to the view type) */
export type SnippetsConstraint<ViewType extends ViewKey> = Record<
  string,
  Snippet<[PanelComponentProps<ViewType>]>
>;

export type CustomSnippetsConstraint<Props extends Record<string, any>> = Record<
  string,
  Snippet<[Props]>
>;

/** A collection of the different component types that can be used as header components for Pane views */
export type PanePanelHeaderConstraint = {
  components: ComponentsConstraint<"pane">,
  snippets: SnippetsConstraint<"pane">,
};

export type DockviewTabConstraint = {
  components: CustomComponentConstraint<IDockviewPanelHeaderProps>,
  snippets: CustomSnippetsConstraint<IDockviewPanelHeaderProps>,
}

type SnippetOrComponentTuple<TProps extends Record<string, any>> =
  | { component: CustomComponentConstraint<TProps>[string] }
  | { snippet: CustomSnippetsConstraint<TProps>[string] }

export type DockviewSpecificComponentConstraint = {
  watermark: SnippetOrComponentTuple<IWatermarkPanelProps>,
  defaultTab: SnippetOrComponentTuple<IDockviewPanelHeaderProps>,
  rightHeaderActions: SnippetOrComponentTuple<IDockviewHeaderActionsProps>,
  leftHeaderActions: SnippetOrComponentTuple<IDockviewHeaderActionsProps>,
  prefixHeaderActions: SnippetOrComponentTuple<IDockviewHeaderActionsProps>,
}

/** 
 * A type that takes panel props for each view type and selectively requires certain keys while keeping others optional.
 * The Required parameter controls which keys from the original panel props become required.
 */
export type SelectivelyRequiredPanelComponentPropsByView<
  T extends RecordLike = RecordLike,
  Required extends OriginalPanelPropKeys = "params",
> = {
  grid: RequiredAndPartial<IGridviewPanelProps<T>, Required>;
  dock: RequiredAndPartial<IDockviewPanelProps<T>, Required>;
  pane: RequiredAndPartial<IPaneviewPanelProps<T>, Required>;
  split: RequiredAndPartial<ISplitviewPanelProps<T>, Required>;
};

export type FrameworkOptions<ViewType extends ViewKey> = {
  grid: GridviewFrameworkOptions;
  dock: DockviewFrameworkOptions;
  pane: PaneviewFrameworkOptions;
  split: SplitviewFrameworkOptions;
}[ViewType];

/**  */
type RawAddPanelOptions<T extends ViewKey> = Parameters<
  Parameters<ReactViewPropsByView[T]["onReady"]>[0]["api"]["addPanel"]
>[0];

export type AdditionalAddPanelOptions<ViewType extends ViewKey> =
  ViewType extends "pane"
  /**/ ? { headers: PanePanelHeaderConstraint }
  /**/ : ViewType extends "dock"
    /**/ ? { tabs: DockviewTabConstraint } & DockviewSpecificComponentConstraint
    /**/ : never;

type BaseOmittedPanelOptionKeys = "id" | "component" | "params";
type OmittedPanelOptionKeysPerType<T extends ViewKey> = T extends "pane" ? "headerComponent" : never;

type CustomizedAddPanelOptions<T extends ViewKey, Additional extends AdditionalAddPanelOptions<T> = never> = (Omit<
  RawAddPanelOptions<T>,
  BaseOmittedPanelOptionKeys | OmittedPanelOptionKeysPerType<T>
>)
  & { id?: string }
  & (
    T extends "pane"
    /**/ ? Additional extends AdditionalAddPanelOptions<"pane">
      /**/ ? { headerComponent?: keyof (Additional["headers"]["components"] | Additional["headers"]["snippets"]) }
      /**/ : {}
    /**/ : {}
  );

type ComponentPanelPropParams<ViewType extends ViewKey, K extends keyof Components, Components extends ComponentsConstraint<ViewType>> =
  Components[K] extends Component<infer Props extends SelectivelyRequiredPanelComponentPropsByView[ViewType]>
  ? Props["params"]
  : never;

type SpreadAddComponentPanelOptions<
  ViewType extends ViewKey,
  K extends keyof Components,
  Components extends ComponentsConstraint<ViewType>,
  Additional extends AdditionalAddPanelOptions<ViewType>
> = ComponentPanelPropParams<ViewType, K, Components> extends Record<string, any>
  /**/ ?
    /**/ | [ComponentPanelPropParams<ViewType, K, Components>]
    /**/ | [ComponentPanelPropParams<ViewType, K, Components>, CustomizedAddPanelOptions<ViewType, Additional>]
  /**/ :
    /**/ | [null | undefined | {}, CustomizedAddPanelOptions<ViewType, Additional>]
    /**/ | [];

type SpreadAddSnippetPanelOptions<
  ViewType extends ViewKey,
  K extends keyof Snippets,
  Snippets extends SnippetsConstraint<ViewType>,
  Additional extends AdditionalAddPanelOptions<ViewType>
> = Snippets[K] extends Snippet<
  infer Params extends [SelectivelyRequiredPanelComponentPropsByView[ViewType]]
>
  /**/ ?
    /**/ | [Params[0]["params"]]
    /**/ | [Params[0]["params"], CustomizedAddPanelOptions<ViewType, Additional>]
  /**/ :
    /**/ | [null | undefined | {}, CustomizedAddPanelOptions<ViewType, Additional>]
    /**/ | [];


export type ExtendedGridAPI<
  ViewType extends ViewKey,
  Components extends ComponentsConstraint<ViewType>,
  Snippets extends SnippetsConstraint<ViewType>,
  Additional extends AdditionalAddPanelOptions<ViewType> = AdditionalAddPanelOptions<ViewType>
> = {
  addComponentPanel: <K extends keyof Components & string>(
    name: string extends K ? never : K,
    ...params: SpreadAddComponentPanelOptions<ViewType, K, Components, Additional>
  ) => Promise<{ exports: ComponentExports<Components[K]>, panel: AddedPanelByView<ViewType>, reference: string }>;
  addSnippetPanel: <K extends keyof Snippets & string>(
    name: string extends K ? never : K,
    ...params: SpreadAddSnippetPanelOptions<ViewType, K, Snippets, Additional>
  ) => Promise<{ panel: AddedPanelByView<ViewType>, reference: string }>;
};

export type RawViewAPIs = {
  grid: GridviewApi;
  dock: DockviewApi;
  pane: PaneviewApi;
  split: SplitviewApi;
}

export type ViewAPI<
  ViewType extends ViewKey,
  Components extends ComponentsConstraint<ViewType>,
  Snippets extends SnippetsConstraint<ViewType>,
  Additional extends AdditionalAddPanelOptions<ViewType> = never
> = RawViewAPIs[ViewType] & ExtendedGridAPI<ViewType, Components, Snippets, Additional>;

type RawViewProps<ViewType extends ViewKey> = ReactViewPropsByView[ViewType];
type OnReady<ViewType extends ViewKey> = RawViewProps<ViewType>["onReady"];

type CustomizedViewProps<
  ViewType extends ViewKey,
  Components extends ComponentsConstraint<ViewType>,
  Snippets extends SnippetsConstraint<ViewType>,
  Additional extends AdditionalAddPanelOptions<ViewType> = never
> = {
  /** 
   * CAUTION: Snippets with no arguments (like the one below) do unnfortunately satisfy the `components` type costraint, but must be provided within the `snippets` object 
   * @example
   * ```ts
   * {#snippet snippetWithNoArguments()}
   * {/snippet}
   * 
   * <View
   *  snippets={{ snippetWithNoArguments }} // CORRECT
   *  components={{ snippetWithNoArguments }} // INCORRECT, but no type error will be shown
   * </View>
   * ```
   * */
  components?: Components;
  snippets?: Snippets;
  onReady?: (
    event: Parameters<OnReady<ViewType>>[0] & { api: ExtendedGridAPI<ViewType, Components, Snippets, Additional> },
  ) => ReturnType<OnReady<ViewType>>;
};

type OverridenDockviewReactPropNames = "tabComponents" | "watermarkComponent" | "defaultTabComponent" | "rightHeaderActionsComponent" | "leftHeaderActionsComponent" | "prefixHeaderActionsComponent";

export type ModifiedProps<
  ViewType extends ViewKey,
  Components extends ComponentsConstraint<ViewType>,
  Snippets extends SnippetsConstraint<ViewType>,
  Additional extends AdditionalAddPanelOptions<ViewType> = never
> = Omit<
  RawViewProps<ViewType>,
  | (keyof CustomizedViewProps<ViewType, Components, Snippets, Additional>)
  | (ViewType extends "pane" ? "headerComponents" : never)
  | (ViewType extends "dock" ? OverridenDockviewReactPropNames : never)
> &
  CustomizedViewProps<ViewType, Components, Snippets, Additional>;

export type AdditionalPaneProps<Headers extends { components: ComponentsConstraint<"pane">, snippets: SnippetsConstraint<"pane"> }> = {
  headers?: Partial<Headers>;
}

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

export const extractCoreOptions = <In extends {}, Out>(props: In, propertyKeys: (keyof In | keyof Out)[]): Out =>
  propertyKeys.reduce((obj, key) => {
    if (key in props)
      obj[key as keyof Out] = props[key as keyof In] as any;
    return obj;
  }, {} as Out);

export const deferred = <T>() => {
  let resolve: (value: T | PromiseLike<T>) => void;
  let reject: (reason?: any) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve: resolve!, reject: reject! };
}

export class MountMechanism {
  private defferedMountMap = new Map<
    ReturnType<typeof this.id>,
    ReturnType<typeof deferred<Record<string, any>>>
  >();

  id = <
    UUID extends number,
    ID extends string,
    Component extends string,
  >(
    uuid: UUID,
    id: ID,
    component: Component,
  ): `${UUID}${ID}${Component}` => `${uuid}${id}${component}`;


  await<Exports extends Record<string, any>>(
    uuid: number,
    id: string,
    component: string,
    reset = false,
  ): Promise<Exports> {
    const mountID = this.id(uuid, id, component);
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

export const prefix = {
  component: "c_",
  snippet: "s_"
} as const;

type Prefix = typeof prefix[keyof typeof prefix];

export const createExtendedAPI = <
  ViewType extends ViewKey, Components extends ComponentsConstraint<ViewType>, Snippets extends SnippetsConstraint<ViewType>
>(
  type: ViewType,
  api: RawViewAPIs[ViewType],
  mount: MountMechanism,
  viewIndex: number,
) => {
  type Target = ExtendedGridAPI<ViewType, Components, Snippets>;
  type CommonArgs =
    | SpreadAddComponentPanelOptions<ViewType, keyof Components, Components, never>
    | SpreadAddSnippetPanelOptions<ViewType, keyof Snippets, Snippets, never>;

  type PaneConfig = CustomizedAddPanelOptions<"pane", { headers: PanePanelHeaderConstraint }>;

  const common = <TExports extends RecordLike = {}>(prefix: Prefix, name: string, ...args: CommonArgs) => {
    const withPrefix = prefix + name;
    const { length } = args;
    const params = length >= 1 ? args[0] : {};
    const config = length === 2 ? args[1] : null;
    const id = length === 2 ? (config?.id ?? withPrefix) : withPrefix;

    const title = (config as any as PaneConfig)?.title ?? name;

    const promise = mount.await<TExports>(viewIndex, id, name);
    const panel = api.addPanel({
      ...(config ?? {}),
      id,
      title,
      component: withPrefix,
      params: params ?? {},
    }) as AddedPanelByView<ViewType>;

    return [promise, panel, id] as const;
  }

  const addComponentPanel: Target["addComponentPanel"] = async (component, ...args) => {
    type Exports = ComponentExports<Components[typeof component]>;
    const [exportsPromise, panel, reference] = common<Exports>(prefix.component, component, ...args);
    const exports = await exportsPromise;
    return { exports, panel, reference, }
  };

  const addSnippetPanel: Target["addSnippetPanel"] = async (name, ...args) => {
    const [mounting, panel, reference] = common(prefix.snippet, name, ...args);
    await mounting;
    return { panel, reference };
  }

  return {
    addComponentPanel,
    addSnippetPanel,
  } satisfies Target;
}

const getSnippetPostProcessor = <ViewType extends ViewKey, Snippets extends SnippetsConstraint<ViewType>>(
  snippets: Snippets,
  name: string,
) => (props: PanelComponentProps) => {
  const snippet = snippets[name];
  if (props?.params?.snippet === snippet) return;
  props.params ??= {};
  props.params.snippet = snippet;
}

const CastedSnippetRender = SnippetRender as any as ConstrainedComponent;

export const getComponentToMount = <ViewType extends ViewKey, Components extends ComponentsConstraint<ViewType>, Snippets extends SnippetsConstraint<ViewType>>(
  type: ViewType,
  components: Components | undefined,
  snippets: Snippets | undefined,
  { name }: Parameters<FrameworkOptions<ViewType>["createComponent"]>[0],
) => {
  const isSnippet = name.startsWith(prefix.snippet);

  if (!isSnippet && !name.startsWith(prefix.component)) {
    const component = components?.[name] as ConstrainedComponent | undefined;
    const snippet = snippets?.[name];

    if (component && snippet)
      throw new Error(`Component '${name}' is both a component and a snippet`);
    else if (component)
      return { component, propsPostProcessor: undefined, name };
    else if (snippet) {
      const propsPostProcessor = getSnippetPostProcessor<ViewType, Snippets>(snippets!, name);
      return { name, component: CastedSnippetRender, propsPostProcessor };
    }
    else throw new Error(`Component '${name}' not found`);
  }

  const { length } = isSnippet ? prefix.snippet : prefix.component;
  const sanitized = name.slice(length);
  const component = isSnippet ? CastedSnippetRender : components?.[sanitized]! as ConstrainedComponent;
  const propsPostProcessor = isSnippet
    ? getSnippetPostProcessor<ViewType, Snippets>(snippets!, sanitized)
    : undefined;

  return { component, propsPostProcessor, name: sanitized };
}

export class PanelRendererBase<Props extends RecordLike, InitOptions extends RecordLike> {
  protected readonly svelteComponent: Component<Props>;
  protected readonly _element: HTMLElement;

  protected instance?: Mounted<Props>;
  protected propsUpdater?: PropsUpdater<Props>;
  protected readonly initOptionsToProps: (options: InitOptions) => Props;
  protected readonly propsPostProcessor?: PropsPostProcessor<Props>;
  protected readonly propsHasParams: boolean;

  get element(): HTMLElement {
    return this._element;
  }

  constructor(
    initOptionsToProps: (options: InitOptions) => Props,
    propsHasParams: boolean,
    svelteComponent: Component<Props>,
    propsPostProcessor?: PropsPostProcessor<Props>,
  ) {
    this.svelteComponent = svelteComponent;
    this._element = document.createElement("div");
    this._element.className = "dv-react-part";
    this._element.style.height = "100%";
    this._element.style.width = "100%";
    this.initOptionsToProps = initOptionsToProps;
    this.propsPostProcessor = propsPostProcessor;
    this.propsHasParams = propsHasParams;
  }

  public init(options: InitOptions): void {
    this.propsUpdater = new PropsUpdater(
      this.initOptionsToProps(options),
      this.propsPostProcessor,
    );

    this.instance = mount(this.svelteComponent, {
      target: this.element,
      props: this.propsUpdater.props,
    });
  }

  dispose(): void {
    if (this.instance) unmount(this.instance);
  }

  update({ params }: PanelUpdateEvent): void {
    for (const key in params)
      this.propsUpdater?.updateSingle(
        ...((this.propsHasParams
          ? ["params", key, params[key]]
          : [key, params[key]]) as any),
      );
  }
}

export type Renderables<ViewType extends ViewKey> =
  Record<string,
    | ComponentsConstraint<ViewType>[string]
    | SnippetsConstraint<ViewType>[string]
  >;

export type ExtractComponentsFromRenderables<ViewType extends ViewKey, TRenderables extends Renderables<ViewType>> =
  OmitNever<
    { [k in keyof TRenderables]: TRenderables[k] extends Snippet<any>
      ? never : TRenderables[k] extends ComponentsConstraint<ViewType>[string] ? TRenderables[k] : never }
  >

export type ExtractSnippetsFromRenderables<ViewType extends ViewKey, TRenderables extends Renderables<ViewType>> =
  OmitNever<
    { [k in keyof TRenderables]: TRenderables[k] extends Snippet<any>
      ? TRenderables[k] : never }
  >;