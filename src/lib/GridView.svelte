<script module lang="ts">
  import {
    createGridview,
    GridviewApi,
    GridviewPanel,
    PROPERTY_KEYS_GRIDVIEW,
    type GridviewInitParameters,
    type IFrameworkPart,
    type GridviewComponent,
    type GridviewFrameworkOptions,
  } from "dockview-core";
  import {
    extractCoreOptions,
    type ComponentsConstraint,
    type SnippetsConstraint,
    type ModifiedProps,
    type ViewAPI,
    type SelectivelyRequiredPanelComponentPropsByView,
    createExtendedAPI,
    getComponentToMount,
  } from "./utils/index.js";
  import PanelRendererBase, {
    type ConstructorConfigWithout,
  } from "./utils/PanelRendererBase.js";

  let gridCount = 0;

  class SvelteGridviewPanel<
    Props extends Record<string, any>,
  > extends GridviewPanel {
    private render: PanelRendererBase<Props, GridviewInitParameters>;

    constructor(
      config: ConstructorConfigWithout<Props, GridviewInitParameters>,
    ) {
      super(config.id, config.name);
      const self = this;
      this.render = new PanelRendererBase({
        ...config,
        element: this.element,
        panelTarget: "grid",
        initOptionsToProps: (options) =>
          ({
            params: options?.params ?? {},
            api: self.api,
            containerApi: new GridviewApi(
              options.accessor as GridviewComponent,
            ),
          }) as any as Props,
      });
    }

    getComponent(): IFrameworkPart {
      this.render.init(this._params as GridviewInitParameters);
      return this.render;
    }
  }

  export type GridPanelProps<T extends Record<string, any>> =
    SelectivelyRequiredPanelComponentPropsByView<T>["grid"];
</script>

<script
  lang="ts"
  generics="
    const Components extends ComponentsConstraint<`grid`>,
    const Snippets extends SnippetsConstraint<`grid`>,
  "
>
  import ViewContainer from "./utils/ViewContainer.svelte";
  import { onDestroy } from "svelte";

  let {
    components,
    snippets,
    theme,
    onReady,
    ...props
  }: ModifiedProps<"grid", Components, Snippets> = $props();

  const index = gridCount++;

  let gridView: ViewAPI<"grid", Components, Snippets>;

  for (const key of PROPERTY_KEYS_GRIDVIEW)
    $effect(() => gridView!?.updateOptions({ [key]: props[key] }));

  const frameworkOptions: GridviewFrameworkOptions = {
    createComponent: (options) => {
      const { component, propsPostProcessor, name } = getComponentToMount(
        "grid",
        components,
        snippets,
        options,
      );
      return new SvelteGridviewPanel({
        id: options.id,
        name,
        svelteComponent: component,
        viewIndex: index,
        propsPostProcessor,
      });
    },
  };

  let element = $state<HTMLElement>();

  $effect(() => {
    const api = createGridview(element!, {
      ...extractCoreOptions(props, PROPERTY_KEYS_GRIDVIEW),
      ...frameworkOptions,
    });
    gridView = Object.assign(
      api,
      createExtendedAPI<"grid", Components, Snippets>("grid", api, index),
    );

    const { clientWidth, clientHeight } = element!;
    gridView.layout(clientWidth, clientHeight);

    onReady?.({ api: gridView });
  });

  onDestroy(() => {
    gridView?.dispose();
  });
</script>

<ViewContainer id={`grid${index}`} bind:element {theme} />
