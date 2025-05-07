<script lang="ts" module>
  import type { HTMLAttributes } from "svelte/elements";
  import { onDestroy, type Snippet } from "svelte";
  import type {
    IDockviewPanelHeaderProps,
    DockviewIDisposable,
    DockviewPanelApi,
  } from "dockview-core";
  /**
   * Unused but included to easily navigate to (since these are the appropriate Prop types for this component,
   * but the type becomes `any`, likely because it relies on `React.DOMAttributes<...>`)
   */
  import type { IDockviewDefaultTabProps } from "dockview";

  class ReactiveTitle implements DockviewIDisposable {
    title = $state("");
    private disposable?: DockviewIDisposable;

    set api(api: DockviewPanelApi) {
      this.disposable = api.onDidTitleChange(
        ({ title }) => (this.title = title),
      );
    }

    dispose() {
      this.disposable?.dispose();
    }
  }

  /** Should be implemented the same as `IDockviewDefaultTabProps` */
  type DockviewDefaultTabProps = IDockviewPanelHeaderProps & {
    hideClose?: boolean;
    closeActionOverride?: () => void;
  } & HTMLAttributes<HTMLDivElement>;

  type CustomProps = {
    content?: Snippet<[title: string]>;
  };

  export type Props = DockviewDefaultTabProps & CustomProps;
</script>

<script lang="ts">
  let {
    api,
    containerApi: _containerApi,
    params,
    hideClose,
    closeActionOverride,
    children: _,
    content,
    ...rest
  }: Props = $props();

  const reactive = new ReactiveTitle();

  $effect.pre(() => {
    reactive.api = api;
  });

  const onClose = (
    event: (KeyboardEvent | MouseEvent) & {
      currentTarget: EventTarget & HTMLDivElement;
    },
  ) => {
    event.preventDefault();
    closeActionOverride ? closeActionOverride() : api.close();
  };

  onDestroy(() => reactive.dispose());
</script>

<div data-testid="dockview-dv-default-tab" {...rest} class="dv-default-tab">
  <span class="dv-default-tab-content">
    {#if content}
      {@render content(reactive.title)}
    {:else}
      {reactive.title}
    {/if}
  </span>
  {#if !hideClose}
    <div
      role="button"
      tabindex="0"
      class="dv-default-tab-action"
      onpointerdown={(e) => e.preventDefault()}
      onkeydown={onClose}
      onclick={onClose}
    >
      <svg
        height="11"
        width="11"
        viewBox="0 0 28 28"
        aria-hidden={"false"}
        focusable={"false"}
        class="dv-svg"
      >
        <path
          d="M2.1 27.3L0 25.2L11.55 13.65L0 2.1L2.1 0L13.65 11.55L25.2 0L27.3 2.1L15.75 13.65L27.3 25.2L25.2 27.3L13.65 15.75L2.1 27.3Z"
        ></path>
      </svg>
    </div>
  {/if}
</div>
