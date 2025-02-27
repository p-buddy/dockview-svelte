<script lang="ts">
  import type {
    ExpectedComponentProps,
    ExpectedComponentExports,
  } from "./index.test.js";

  let props: ExpectedComponentProps = $props();

  export const exportedVariable: ExpectedComponentExports["exportedVariable"] =
    "hello";
  export const exportedFunction: ExpectedComponentExports["exportedFunction"] =
    () => exportedVariable;

  ({ exportedVariable, exportedFunction }) satisfies ExpectedComponentExports;

  console.log(props.numberProp);
</script>

<div>
  <h1>Runes</h1>
  <p>{props.stringProp}</p>
  <p>{props.numberProp}</p>
  <p>{props.optionalRecordProp?.hello}</p>
</div>
