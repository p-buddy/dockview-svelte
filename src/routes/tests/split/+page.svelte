<script lang="ts">
  import type { PanelProps } from "$lib/index.js";
  import SplitView from "$lib/SplitView.svelte";
</script>

{#snippet a({ params }: PanelProps<"split", {}>)}
  <div>a</div>
{/snippet}

{#snippet b({ params }: PanelProps<"split", {}>)}
  <div>b</div>
{/snippet}

<div style:width="100vw" style:height="100vh">
  <SplitView
    snippets={{ a, b }}
    onReady={async ({ api }) => {
      console.log(api);
      const { panel } = await api.addSnippetPanel("a", {});
      api.addSnippetPanel("b", {});
      api.removePanel(panel);
    }}
  />
</div>
