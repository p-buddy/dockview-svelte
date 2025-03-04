<script lang="ts" module>
  import {
    createDockview,
    DockviewGroupPanel,
    PROPERTY_KEYS_DOCKVIEW,
    type DockviewFrameworkOptions,
    type IHeaderActionsRenderer,
  } from "dockview-core";
  import type { RecursivePartial } from "./utils/types.js";
  import {
    createExtendedAPI,
    extractCoreOptions,
    getComponentToMount,
    type ComponentsConstraint,
    type DockviewSpecificComponentConstraint,
    type DockviewTabConstraint,
    type ModifiedProps,
    type SnippetsConstraint,
    type ViewAPI,
  } from "./utils/index.js";
  import SnippetRender from "./utils/SnippetRender.svelte";
  import {
    SvelteDockActionsHeaderRenderer,
    SvelteDockHeaderRenderer,
    SvelteWatermarkRenderer,
    SvelteDockComponentRenderer,
  } from "./dock/index.js";

  let dockCount = 0;

  type GroupControlElementKey =
    | "leftHeaderActions"
    | "rightHeaderActions"
    | "prefixHeaderActions";

  type CreateGroupControlElement =
    | ((groupPanel: DockviewGroupPanel) => IHeaderActionsRenderer)
    | undefined;

  const createGroupControlElement = <Type extends GroupControlElementKey>(
    detail?: DockviewSpecificComponentConstraint[Type],
  ): CreateGroupControlElement =>
    detail
      ? (groupPanel: DockviewGroupPanel) => {
          if ("component" in detail)
            return new SvelteDockActionsHeaderRenderer(groupPanel, {
              viewIndex: dockCount,
              id: groupPanel.id,
              name: detail.component.name,
              svelteComponent: detail.component,
            });

          if ("snippet" in detail)
            return new SvelteDockActionsHeaderRenderer(groupPanel, {
              viewIndex: dockCount,
              id: groupPanel.id,
              name: detail.snippet.name,
              svelteComponent: SnippetRender as any,
              propsPostProcessor: (props: any) =>
                (props.snippet = detail.snippet),
            });

          throw new Error("Invalid component and/or snippet");
        }
      : undefined;
</script>

<script
  lang="ts"
  generics="
  const Components extends ComponentsConstraint<`dock`>,
  const Snippets extends SnippetsConstraint<`dock`>,
  const TabComponent extends DockviewTabConstraint[`components`],
  const TabSnippet extends DockviewTabConstraint[`snippets`],
  const Watermark extends DockviewSpecificComponentConstraint[`watermark`],
  const DefaultTab extends DockviewSpecificComponentConstraint[`defaultTab`],
  const RightHeaderActions extends DockviewSpecificComponentConstraint[`rightHeaderActions`],
  const LeftHeaderActions extends DockviewSpecificComponentConstraint[`leftHeaderActions`],
  const PrefixHeaderActions extends DockviewSpecificComponentConstraint[`prefixHeaderActions`],
"
>
  import { onDestroy, onMount } from "svelte";
  import ViewContainer from "./utils/ViewContainer.svelte";

  type DockSpecific = {
    tabs: {
      components: TabComponent;
      snippets: TabSnippet;
    };
    watermark: Watermark;
    defaultTab: DefaultTab;
    rightHeaderActions: RightHeaderActions;
    leftHeaderActions: LeftHeaderActions;
    prefixHeaderActions: PrefixHeaderActions;
  };

  type Props = RecursivePartial<DockSpecific> &
    ModifiedProps<"dock", Components, Snippets, DockSpecific>;

  const index = dockCount++;

  let {
    components,
    snippets,
    tabs,
    theme,
    watermark,
    defaultTab,
    rightHeaderActions,
    leftHeaderActions,
    prefixHeaderActions,
    onReady,
    onDidDrop,
    onWillDrop,
    ...props
  }: Props = $props();

  let dockView: ViewAPI<"dock", Components, Snippets>;

  for (const key of PROPERTY_KEYS_DOCKVIEW)
    $effect(() => dockView!?.updateOptions({ [key]: props[key] }));

  const frameworkOptions: DockviewFrameworkOptions = {
    createLeftHeaderActionComponent: createGroupControlElement(
      leftHeaderActions as LeftHeaderActions,
    ),
    createRightHeaderActionComponent: createGroupControlElement(
      rightHeaderActions as RightHeaderActions,
    ),
    createPrefixHeaderActionComponent: createGroupControlElement(
      prefixHeaderActions as PrefixHeaderActions,
    ),
    createComponent: (options) => {
      const { component, propsPostProcessor, name } = getComponentToMount(
        "dock",
        components,
        snippets,
        options,
      );

      return new SvelteDockComponentRenderer({
        name,
        id: options.id,
        viewIndex: index,
        svelteComponent: component,
        propsPostProcessor,
      });
    },
    createTabComponent: tabs
      ? (options) => {
          const { component, propsPostProcessor, name } = getComponentToMount(
            "dock",
            tabs.components as ComponentsConstraint<"dock">,
            tabs.snippets as SnippetsConstraint<"dock">,
            options,
          );

          return new SvelteDockHeaderRenderer({
            name,
            id: options.id,
            viewIndex: index,
            svelteComponent: component,
            propsPostProcessor,
          });
        }
      : undefined,
    createWatermarkComponent: watermark
      ? () => {
          if ("component" in watermark)
            return new SvelteWatermarkRenderer({
              name: watermark.component.name,
              id: "watermark",
              viewIndex: index,
              svelteComponent: watermark.component,
            });

          if ("snippet" in watermark)
            return new SvelteWatermarkRenderer({
              name: "watermark",
              id: "watermark",
              viewIndex: index,
              svelteComponent: SnippetRender as any,
              propsPostProcessor: (props: any) =>
                (props.snippet = watermark.snippet),
            });

          throw new Error("Invalid watermark component and/or snippet");
        }
      : undefined,
  };

  let element = $state<HTMLElement>();

  onMount(() => {
    const api = createDockview(element!, {
      ...extractCoreOptions(props, PROPERTY_KEYS_DOCKVIEW),
      ...frameworkOptions,
    });

    dockView = Object.assign(
      api,
      createExtendedAPI<"dock", Components, Snippets>("dock", api, index),
    );

    const { clientWidth, clientHeight } = element!;
    dockView.layout(clientWidth, clientHeight);

    onReady?.({ api: dockView });
  });

  $effect(() => {
    if (onDidDrop) dockView?.onDidDrop(onDidDrop);
  });

  $effect(() => {
    if (onWillDrop) dockView?.onWillDrop(onWillDrop);
  });

  onDestroy(() => {
    dockView?.dispose();
  });
</script>

<ViewContainer id={`dock${index}`} bind:element {theme} />
