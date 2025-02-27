<script lang="ts">
  import { DockView, type PanelProps, signal } from "$lib/index.js";
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

<div style:height="100vh" style:width="100vw">
  {number}
  <DockView
    components={{ LegacyPanel, RunesPanel }}
    snippets={{ example }}
    onReady={async ({ api }) => {
      await api.addSnippetPanel("example", {
        numberProp,
      });
      await api.addComponentPanel("RunesPanel", {
        stringProp: "test",
        numberProp,
      });
      number = 2;
      number = 3;
    }}
  />
</div>
