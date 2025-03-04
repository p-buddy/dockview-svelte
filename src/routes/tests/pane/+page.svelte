<script lang="ts">
  import { type PanelProps, PaneView } from "$lib/index.js";
</script>

{#snippet a({ params }: PanelProps<"pane", {}>)}
  <div>a</div>
{/snippet}

{#snippet b({ params }: PanelProps<"pane", {}>)}
  <div>b</div>
{/snippet}

<div style:width="100vw" style:height="100vh">
  <PaneView
    snippets={{ a, b }}
    onReady={async ({ api }) => {
      const { panel } = await api.addSnippetPanel("a", {});
      api.addSnippetPanel("b", {});
      //api.removePanel(panel);
    }}
  />
</div>
