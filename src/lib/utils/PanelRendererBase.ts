import type { GridviewPanel, PanelUpdateEvent } from "dockview-core";
import { type Component, mount, unmount } from "svelte";
import { PropsUpdater, type PropsPostProcessor } from "./PropsUpdater.svelte.js";
import type { RecordLike, Mounted } from "./types.js";
import { MountMechanism, type IdentifierRecipe } from "./MountMechanism.js";
import { prefix } from "./index.js";

export type PanelRendererBaseConfig<Props extends RecordLike, InitOptions extends RecordLike> = {
  /**
   * Function to be invoked when the panel's `init` method is called, 
   * which is responsible for converting the first argument ("options") of `init` 
   * into the props ultimately passed to the Svelte component.
   * @param options 
   * @returns 
   */
  initOptionsToProps: (options: InitOptions) => Props,
  /**
   * The Svelte component to be rendered in the panel.
   */
  svelteComponent: Component<Props>,
  /**
   * An optional function to be invoked after the props are updated.
   * @param props
   */
  propsPostProcessor?: PropsPostProcessor<Props>,
  /**
   * Whether the props have a `params` property.
   * TODO: investigate if this is necessary. 
   *  
   * @default true
   */
  propsHasParams?: boolean,

  element?: HTMLElement,
} & IdentifierRecipe;

export default class PanelRendererBase<Props extends RecordLike, InitOptions extends RecordLike> {
  static Mount = new MountMechanism();
  protected readonly mountID: ReturnType<MountMechanism["id"]>;

  protected readonly svelteComponent: Component<Props>;
  protected readonly _element: HTMLElement;

  protected instance?: Mounted<Props>;
  protected readonly initOptionsToProps: (options: InitOptions) => Props;
  protected readonly propsPostProcessor?: PropsPostProcessor<Props>;
  protected readonly propsHasParams: boolean;

  propsUpdater?: PropsUpdater<Props>;

  get element(): HTMLElement {
    return this._element;
  }

  constructor(config: PanelRendererBaseConfig<Props, InitOptions>) {
    this.mountID = PanelRendererBase.Mount.id(config);
    this.svelteComponent = config.svelteComponent;
    this.initOptionsToProps = config.initOptionsToProps;
    this.propsPostProcessor = config.propsPostProcessor;
    this.propsHasParams = config.propsHasParams ?? true;
    this._element = config.element ?? document.createElement("div");
    this._element.classList.add("dv-react-part");
    this._element.style.height = "100%";
    this._element.style.width = "100%";
    this._element.setAttribute("data-dockview-svelte", PanelRendererBase.ReadableIdentifier(config));
    if (!this._element.id) this._element.id = this.mountID;
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

    PanelRendererBase.Mount.tryResolveAndDrop(
      this.mountID,
      this.instance,
    );
  }

  dispose(): void {
    if (this.instance) unmount(this.instance);
  }

  update({ params }: PanelUpdateEvent): void {
    // TODO: This is only efficient up to a depth of 1, can start recursing on params if `params[key]` is also an object?
    for (const key in params)
      this.propsUpdater?.updateSingle(
        ...((this.propsHasParams
          ? ["params", key, params[key]]
          : [key, params[key]]) as any),
      );
  }

  private static ReadableIdentifier = ({ panelTarget, viewIndex, id, name }: PanelRendererBaseConfig<any, any>) =>
    `${panelTarget}-${viewIndex}-${id.startsWith(prefix.component) ? "component" : "snippet"}-${name}`;
}

export type ConstructorConfigWithout<
  Props extends RecordLike,
  InitOptions extends RecordLike,
  K extends keyof PanelRendererBaseConfig<Props, InitOptions> = "panelTarget" | "initOptionsToProps"
> =
  Omit<PanelRendererBaseConfig<Props, InitOptions>, K>;