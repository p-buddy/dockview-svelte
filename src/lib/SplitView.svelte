<script lang="ts" module>
  import {
    SplitviewApi,
    type PanelViewInitParameters,
    SplitviewPanel,
    type IFrameworkPart,
    PROPERTY_KEYS_SPLITVIEW,
    type SplitviewFrameworkOptions,
    createSplitview,
  } from "dockview-core";
  import {
    type ComponentsConstraint,
    type SnippetsConstraint,
    type ModifiedProps,
    type ViewAPI,
    getComponentToMount,
    extractCoreOptions,
    createExtendedAPI,
  } from "./utils/index.js";
  import PanelRendererBase, {
    type ConstructorConfigWithout,
  } from "./utils/PanelRendererBase.js";

  let splitCount = 0;

  class SvelteGridviewPanel<
    Props extends Record<string, any>,
  > extends SplitviewPanel {
    private render: PanelRendererBase<Props, PanelViewInitParameters>;

    constructor(
      config: ConstructorConfigWithout<Props, PanelViewInitParameters>,
    ) {
      super(config.id, config.name);
      const self = this;
      this.render = new PanelRendererBase({
        ...config,
        panelTarget: "split",
        initOptionsToProps: (options) =>
          ({
            params: options?.params ?? {},
            api: self.api,
            containerApi: new SplitviewApi(options.accessor),
          }) as any as Props,
      });
    }

    getComponent(): IFrameworkPart {
      this.render.init(this._params as PanelViewInitParameters);
      return this.render;
    }
  }
</script>

<script
  lang="ts"
  generics="
    const Components extends ComponentsConstraint<`split`>,
    const Snippets extends SnippetsConstraint<`split`>,
  "
>
  import { onMount } from "svelte";
  import ViewContainer from "./utils/ViewContainer.svelte";

  let {
    components,
    snippets,
    onReady,
    ...props
  }: ModifiedProps<"split", Components, Snippets> = $props();

  const index = splitCount++;

  let splitView: ViewAPI<"split", Components, Snippets>;

  for (const key of PROPERTY_KEYS_SPLITVIEW)
    $effect(() => splitView!?.updateOptions({ [key]: props[key] }));

  const frameworkOptions: SplitviewFrameworkOptions = {
    createComponent: (options) => {
      const { component, propsPostProcessor, name } = getComponentToMount(
        "split",
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

  onMount(() => {
    const api = createSplitview(element!, {
      ...extractCoreOptions(props, PROPERTY_KEYS_SPLITVIEW),
      ...frameworkOptions,
    });
    splitView = Object.assign(
      api,
      createExtendedAPI<"split", Components, Snippets>("split", api, index),
    );

    const { clientWidth, clientHeight } = element!;
    splitView.layout(clientWidth, clientHeight);

    onReady?.({ api: splitView });
  });
</script>

<ViewContainer id={`split${index}`} bind:element />
