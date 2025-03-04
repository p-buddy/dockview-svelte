<script lang="ts">
  import {
    type PanelProps,
    SplitView,
    themes,
    type Theme,
  } from "$lib/index.js";

  let theme = $state<Theme>("light");
</script>

<div></div>

{#snippet a({ params }: PanelProps<"split", {}>)}
  <div>a</div>
{/snippet}

{#snippet b({ params }: PanelProps<"split", {}>)}
  <div>b</div>
{/snippet}

<div
  style:width="100vw"
  style:height="100vh"
  style:display="flex"
  style:flex-direction="column"
>
  <div>
    <select bind:value={theme}>
      {#each themes as t}
        <option value={t}>{t}</option>
      {/each}
    </select>
  </div>
  <div style:flex="1">
    <SplitView
      {theme}
      orientation="HORIZONTAL"
      snippets={{ a, b }}
      onReady={async ({ api }) => {
        const { panel } = await api.addSnippetPanel("a", {});
        api.addSnippetPanel("b", {});
        //api.removePanel(panel);
      }}
    />
  </div>
</div>
