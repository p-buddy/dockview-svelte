<script
  lang="ts"
  generics="
    T extends [SelectivelyRequiredPanelComponentPropsByView<Params>[keyof SelectivelyRequiredPanelComponentPropsByView]],
    Params extends { [index: string]: any; }
  "
>
  import type { Snippet } from "svelte";
  import type { SelectivelyRequiredPanelComponentPropsByView } from "./index.js";

  let {
    params: paramsWithSnippet,
    api,
    containerApi,
    ...rest
  }: SelectivelyRequiredPanelComponentPropsByView<{
    snippet: Snippet<T>;
  }>[keyof SelectivelyRequiredPanelComponentPropsByView] = $props();

  type Arg = T[0];
  type Args = [Arg];
  type Fn = (...args: Args) => ReturnType<Snippet<Args>>;

  let { snippet, ...params } = $derived(paramsWithSnippet);

  let arg = $derived({ params, api, containerApi, ...rest }) as Arg;
</script>

{@render (snippet as Fn)(arg)}
