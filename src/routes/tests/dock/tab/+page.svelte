<script lang="ts">
  import {
    DefaultDockTab,
    DockView,
    type PanelProps,
    type DefaultDockTabProps,
    signal,
  } from "$lib/index.js";
  import LegacyPanel from "../Panel.Legacy.svelte";
  import RunesPanel from "../Panel.Runes.svelte";

  let number = $state(1);

  const numberProp = signal(() => number);
</script>

{#snippet example(x: PanelProps<"dock", { numberProp: number }>)}
  <span>
    {x.params.numberProp}
  </span>
{/snippet}

{#snippet hi(title: string)}
  <span style:color="red">
    {title}
  </span>
{/snippet}

{#snippet tab(props: DefaultDockTabProps)}
  <DefaultDockTab {...props} content={hi} />
{/snippet}

<div style:height="100vh" style:width="100vw">
  {number}
  <DockView
    tabs={{
      snippets: {
        tab: tab,
      },
    }}
    components={{ LegacyPanel, RunesPanel }}
    snippets={{ example }}
    onReady={async ({ api }) => {
      await api.addSnippetPanel(
        "example",
        {
          numberProp,
        },
        {
          tabComponent: "tab",
        },
      );
      await api.addComponentPanel("RunesPanel", {
        stringProp: "test",
        numberProp,
      });
      number = 2;
      number = 3;
    }}
  />
</div>
