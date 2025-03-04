<script lang="ts">
  import type {
    ExpectedComponentProps,
    ExpectedComponentExports,
  } from "./index.test.js";

  export let stringProp: string;
  export let numberProp: number;
  export let optionalRecordProp: Record<string, any> = {};

  ({
    stringProp,
    numberProp,
    optionalRecordProp,
  }) satisfies ExpectedComponentProps;

  export const exportedVariable: ExpectedComponentExports["exportedVariable"] =
    "hello";
  export const exportedFunction: ExpectedComponentExports["exportedFunction"] =
    () => exportedVariable;

  ({ exportedVariable, exportedFunction }) satisfies ExpectedComponentExports;
</script>

<div>
  <h1>Legacy</h1>
  <p>{stringProp}</p>
  <p>{numberProp}</p>
  <p>{optionalRecordProp}</p>
</div>
