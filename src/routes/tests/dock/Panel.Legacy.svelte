<script lang="ts">
  import Legacy from "$lib/utils.test/Legacy.test.svelte";
  import type { ExpectedDockPanelProps } from "./index.js";

  export let params: ExpectedDockPanelProps["params"];
  export let api: ExpectedDockPanelProps["api"];
  export let containerApi: ExpectedDockPanelProps["containerApi"];
</script>

<Legacy {...params} />
