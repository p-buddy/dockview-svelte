<script lang="ts">
  import Legacy from "$lib/utils/Legacy.test.svelte";
  import type { ExpectedDockPanelProps } from "./index.js";

  export let params: ExpectedDockPanelProps["params"];
  export let api: ExpectedDockPanelProps["api"];
  export let containerApi: ExpectedDockPanelProps["containerApi"];
</script>

<Legacy {...params} />
