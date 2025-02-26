<script lang="ts">
  type Props = {
    element?: HTMLElement;
    id: string;
  };
  let { element = $bindable(), id }: Props = $props();
</script>

<div
  {id}
  style:height={"100%"}
  style:width={"100%"}
  class="outline-none focus:outline-none"
  bind:this={element}
></div>
