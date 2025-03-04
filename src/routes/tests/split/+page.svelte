<script lang="ts">
  import { type PanelProps, SplitView } from "$lib/index.js";
</script>

{#snippet a({ params }: PanelProps<"split", {}>)}
  <div>a</div>
{/snippet}

{#snippet b({ params }: PanelProps<"split", {}>)}
  <div>b</div>
{/snippet}

<div style:width="100vw" style:height="100vh">
  <SplitView
    orientation="HORIZONTAL"
    snippets={{ a, b }}
    onReady={async ({ api }) => {
      const { panel } = await api.addSnippetPanel("a", {});
      api.addSnippetPanel("b", {});
      //api.removePanel(panel);
    }}
  />
</div>
