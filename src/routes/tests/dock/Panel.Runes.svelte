<script lang="ts">
  import Runes from "$lib/utils/Runes.test.svelte";
  import type { ExpectedDockPanelProps } from "./index.js";

  let props: ExpectedDockPanelProps = $props();

  let numberProp = $derived(props.params.numberProp);

  $effect(() => {
    console.log("numberProp", numberProp);
  });
</script>

<Runes {...props.params} {numberProp} />
