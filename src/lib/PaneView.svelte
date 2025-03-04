<script module lang="ts">
  import {
    type IPanePart,
    type PanePanelComponentInitParameter,
    PROPERTY_KEYS_PANEVIEW,
    type PaneviewFrameworkOptions,
    createPaneview,
  } from "dockview-core";
  import {
    type ComponentsConstraint,
    type SelectivelyRequiredPanelComponentPropsByView,
    type SnippetsConstraint,
    type ModifiedProps,
    type ViewAPI,
    type AdditionalPaneProps,
    extractCoreOptions,
    createExtendedAPI,
    getComponentToMount,
    type PanelComponentProps,
  } from "./utils/index.js";
  import PanelRendererBase, {
    type ConstructorConfigWithout,
  } from "./utils/PanelRendererBase.js";

  let paneCount = 0;

  type PanelProps = PanelComponentProps<"pane">;

  class SveltePanePanelRenderer<Props extends PanelProps>
    extends PanelRendererBase<Props, PanePanelComponentInitParameter>
    implements IPanePart
  {
    private readonly id: string;

    constructor(
      config: ConstructorConfigWithout<
        Props,
        PanePanelComponentInitParameter,
        "initOptionsToProps"
      >,
    ) {
      super({
        ...config,
        initOptionsToProps: ({ params, api, title, containerApi }) =>
          ({
            params,
            api,
            title,
            containerApi,
          }) as any as Props,
      });
      this.id = config.id;
    }

    public toJSON() {
      return {
        id: this.id,
      };
    }
  }

  export type PanePanelProps<T extends Record<string, any>> =
    SelectivelyRequiredPanelComponentPropsByView<T>["pane"];
</script>

<script
  lang="ts"
  generics="
    const Components extends ComponentsConstraint<`pane`>,
    const Snippets extends SnippetsConstraint<`pane`>,
    const HeaderComponents extends ComponentsConstraint<`pane`>,
    const HeaderSnippets extends SnippetsConstraint<`pane`>,
  "
>
  import { onDestroy, onMount } from "svelte";
  import ViewContainer from "./utils/ViewContainer.svelte";

  type Headers = {
    components: HeaderComponents;
    snippets: HeaderSnippets;
  };

  type Props = AdditionalPaneProps<Headers> &
    ModifiedProps<"pane", Components, Snippets, { headers: Headers }>;

  let {
    components,
    snippets,
    headers,
    onReady,
    onDidDrop,
    theme,
    ...props
  }: Props = $props();

  const index = paneCount++;

  let paneView: ViewAPI<"pane", Components, Snippets>;

  for (const key of PROPERTY_KEYS_PANEVIEW)
    $effect(() => paneView!?.updateOptions({ [key]: props[key] }));

  const frameworkOptions: PaneviewFrameworkOptions = {
    createComponent: (options) => {
      const { component, propsPostProcessor, name } = getComponentToMount(
        "pane",
        components,
        snippets,
        options,
      );

      return new SveltePanePanelRenderer({
        id: options.id,
        name,
        svelteComponent: component!,
        viewIndex: index,
        propsPostProcessor,
        panelTarget: "pane",
      });
    },
    createHeaderComponent: (options) => {
      const { component, propsPostProcessor, name } = getComponentToMount(
        "pane",
        headers?.components,
        headers?.snippets,
        options,
      );

      return new SveltePanePanelRenderer({
        id: options.id,
        name,
        svelteComponent: component!,
        viewIndex: index,
        propsPostProcessor,
        panelTarget: "paneheader",
      });
    },
  };

  let element = $state<HTMLElement>();

  onMount(() => {
    const api = createPaneview(element!, {
      ...extractCoreOptions(props, PROPERTY_KEYS_PANEVIEW),
      ...frameworkOptions,
    });

    paneView = Object.assign(
      api,
      createExtendedAPI<"pane", Components, Snippets>("pane", api, index),
    );

    const { clientWidth, clientHeight } = element!;
    paneView.layout(clientWidth, clientHeight);

    onReady?.({ api: paneView });
  });

  $effect(() => {
    if (onDidDrop) paneView?.onDidDrop(onDidDrop);
  });

  onDestroy(() => {
    paneView?.dispose();
  });
</script>

<ViewContainer id={`pane${index}`} bind:element {theme} />
