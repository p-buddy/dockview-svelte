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

<style>
  /** Copied from 'dockview/dist/styles/dockview.css' with extra `div` scoping */
  div :global(.dv-svg) {
    display: inline-block;
    fill: currentcolor;
    line-height: 1;
    stroke: currentcolor;
    stroke-width: 0;
  }
  div :global(.dockview-theme-dark) {
    --dv-paneview-active-outline-color: dodgerblue;
    --dv-tabs-and-actions-container-font-size: 13px;
    --dv-tabs-and-actions-container-height: 35px;
    --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
    --dv-drag-over-border-color: white;
    --dv-tabs-container-scrollbar-color: #888;
    --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
    --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
    --dv-overlay-z-index: 999;
    --dv-active-sash-transition-duration: 0.1s;
    --dv-active-sash-transition-delay: 0.5s;
    --dv-group-view-background-color: #1e1e1e;
    --dv-tabs-and-actions-container-background-color: #252526;
    --dv-activegroup-visiblepanel-tab-background-color: #1e1e1e;
    --dv-activegroup-hiddenpanel-tab-background-color: #2d2d2d;
    --dv-inactivegroup-visiblepanel-tab-background-color: #1e1e1e;
    --dv-inactivegroup-hiddenpanel-tab-background-color: #2d2d2d;
    --dv-tab-divider-color: #1e1e1e;
    --dv-activegroup-visiblepanel-tab-color: white;
    --dv-activegroup-hiddenpanel-tab-color: #969696;
    --dv-inactivegroup-visiblepanel-tab-color: #8f8f8f;
    --dv-inactivegroup-hiddenpanel-tab-color: #626262;
    --dv-separator-border: rgb(68, 68, 68);
    --dv-paneview-header-border-color: rgba(204, 204, 204, 0.2);
  }

  div :global(.dockview-theme-light) {
    --dv-paneview-active-outline-color: dodgerblue;
    --dv-tabs-and-actions-container-font-size: 13px;
    --dv-tabs-and-actions-container-height: 35px;
    --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
    --dv-drag-over-border-color: white;
    --dv-tabs-container-scrollbar-color: #888;
    --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
    --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
    --dv-overlay-z-index: 999;
    --dv-active-sash-transition-duration: 0.1s;
    --dv-active-sash-transition-delay: 0.5s;
    --dv-group-view-background-color: white;
    --dv-tabs-and-actions-container-background-color: #f3f3f3;
    --dv-activegroup-visiblepanel-tab-background-color: white;
    --dv-activegroup-hiddenpanel-tab-background-color: #ececec;
    --dv-inactivegroup-visiblepanel-tab-background-color: white;
    --dv-inactivegroup-hiddenpanel-tab-background-color: #ececec;
    --dv-tab-divider-color: white;
    --dv-activegroup-visiblepanel-tab-color: rgb(51, 51, 51);
    --dv-activegroup-hiddenpanel-tab-color: rgba(51, 51, 51, 0.7);
    --dv-inactivegroup-visiblepanel-tab-color: rgba(51, 51, 51, 0.7);
    --dv-inactivegroup-hiddenpanel-tab-color: rgba(51, 51, 51, 0.35);
    --dv-separator-border: rgba(128, 128, 128, 0.35);
    --dv-paneview-header-border-color: rgb(51, 51, 51);
  }

  div :global(.dockview-theme-vs) {
    --dv-paneview-active-outline-color: dodgerblue;
    --dv-tabs-and-actions-container-font-size: 13px;
    --dv-tabs-and-actions-container-height: 35px;
    --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
    --dv-drag-over-border-color: white;
    --dv-tabs-container-scrollbar-color: #888;
    --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
    --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
    --dv-overlay-z-index: 999;
    --dv-active-sash-transition-duration: 0.1s;
    --dv-active-sash-transition-delay: 0.5s;
    --dv-group-view-background-color: #1e1e1e;
    --dv-tabs-and-actions-container-background-color: #252526;
    --dv-activegroup-visiblepanel-tab-background-color: #1e1e1e;
    --dv-activegroup-hiddenpanel-tab-background-color: #2d2d2d;
    --dv-inactivegroup-visiblepanel-tab-background-color: #1e1e1e;
    --dv-inactivegroup-hiddenpanel-tab-background-color: #2d2d2d;
    --dv-tab-divider-color: #1e1e1e;
    --dv-activegroup-visiblepanel-tab-color: white;
    --dv-activegroup-hiddenpanel-tab-color: #969696;
    --dv-inactivegroup-visiblepanel-tab-color: #8f8f8f;
    --dv-inactivegroup-hiddenpanel-tab-color: #626262;
    --dv-separator-border: rgb(68, 68, 68);
    --dv-paneview-header-border-color: rgba(204, 204, 204, 0.2);
    --dv-tabs-and-actions-container-background-color: #2d2d30;
    --dv-tabs-and-actions-container-height: 20px;
    --dv-tabs-and-actions-container-font-size: 11px;
    --dv-activegroup-visiblepanel-tab-background-color: #007acc;
    --dv-inactivegroup-visiblepanel-tab-background-color: #3f3f46;
    --dv-activegroup-visiblepanel-tab-color: white;
    --dv-activegroup-hiddenpanel-tab-color: white;
    --dv-inactivegroup-visiblepanel-tab-color: white;
    --dv-inactivegroup-hiddenpanel-tab-color: white;
  }
  div
    :global(
      .dockview-theme-vs
        .dv-groupview.dv-active-group
        > .dv-tabs-and-actions-container
    ) {
    box-sizing: content-box;
    border-bottom: 2px solid
      var(--dv-activegroup-visiblepanel-tab-background-color);
  }
  div
    :global(
      .dockview-theme-vs
        .dv-groupview.dv-active-group
        > .dv-tabs-and-actions-container
        .dv-tab.dv-active-tab
    ) {
    border-top: 2px solid
      var(--dv-activegroup-visiblepanel-tab-background-color);
  }
  div
    :global(
      .dockview-theme-vs
        .dv-groupview.dv-active-group
        > .dv-tabs-and-actions-container
        .dv-tab.dv-inactive-tab
    ) {
    border-top: 2px solid var(--dv-activegroup-hiddenpanel-tab-background-color);
  }
  div
    :global(
      .dockview-theme-vs
        .dv-groupview.dv-inactive-group
        > .dv-tabs-and-actions-container
    ) {
    box-sizing: content-box;
    border-bottom: 2px solid
      var(--dv-inactivegroup-visiblepanel-tab-background-color);
  }
  div
    :global(
      .dockview-theme-vs
        .dv-groupview.dv-inactive-group
        > .dv-tabs-and-actions-container
        .dv-tab.dv-active-tab
    ) {
    border-top: 2px solid
      var(--dv-inactivegroup-visiblepanel-tab-background-color);
  }
  div
    :global(
      .dockview-theme-vs
        .dv-groupview.dv-inactive-group
        > .dv-tabs-and-actions-container
        .dv-tab.dv-inactive-tab
    ) {
    border-top: 2px solid
      var(--dv-inactivegroup-hiddenpanel-tab-background-color);
  }

  div :global(.dockview-theme-abyss) {
    --dv-paneview-active-outline-color: dodgerblue;
    --dv-tabs-and-actions-container-font-size: 13px;
    --dv-tabs-and-actions-container-height: 35px;
    --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
    --dv-drag-over-border-color: white;
    --dv-tabs-container-scrollbar-color: #888;
    --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
    --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
    --dv-overlay-z-index: 999;
    --dv-active-sash-transition-duration: 0.1s;
    --dv-active-sash-transition-delay: 0.5s;
    --dv-group-view-background-color: #000c18;
    --dv-tabs-and-actions-container-background-color: #1c1c2a;
    --dv-activegroup-visiblepanel-tab-background-color: #000c18;
    --dv-activegroup-hiddenpanel-tab-background-color: #10192c;
    --dv-inactivegroup-visiblepanel-tab-background-color: #000c18;
    --dv-inactivegroup-hiddenpanel-tab-background-color: #10192c;
    --dv-tab-divider-color: #2b2b4a;
    --dv-activegroup-visiblepanel-tab-color: white;
    --dv-activegroup-hiddenpanel-tab-color: rgba(255, 255, 255, 0.5);
    --dv-inactivegroup-visiblepanel-tab-color: rgba(255, 255, 255, 0.5);
    --dv-inactivegroup-hiddenpanel-tab-color: rgba(255, 255, 255, 0.25);
    --dv-separator-border: #2b2b4a;
    --dv-paneview-header-border-color: #2b2b4a;
    --dv-paneview-active-outline-color: #596f99;
  }

  div :global(.dockview-theme-dracula) {
    --dv-paneview-active-outline-color: dodgerblue;
    --dv-tabs-and-actions-container-font-size: 13px;
    --dv-tabs-and-actions-container-height: 35px;
    --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
    --dv-drag-over-border-color: white;
    --dv-tabs-container-scrollbar-color: #888;
    --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
    --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
    --dv-overlay-z-index: 999;
    --dv-active-sash-transition-duration: 0.1s;
    --dv-active-sash-transition-delay: 0.5s;
    --dv-group-view-background-color: #282a36;
    --dv-tabs-and-actions-container-background-color: #191a21;
    --dv-activegroup-visiblepanel-tab-background-color: #282a36;
    --dv-activegroup-hiddenpanel-tab-background-color: #21222c;
    --dv-inactivegroup-visiblepanel-tab-background-color: #282a36;
    --dv-inactivegroup-hiddenpanel-tab-background-color: #21222c;
    --dv-tab-divider-color: #191a21;
    --dv-activegroup-visiblepanel-tab-color: rgb(248, 248, 242);
    --dv-activegroup-hiddenpanel-tab-color: rgb(98, 114, 164);
    --dv-inactivegroup-visiblepanel-tab-color: rgba(248, 248, 242, 0.5);
    --dv-inactivegroup-hiddenpanel-tab-color: rgba(98, 114, 164, 0.5);
    --dv-separator-border: #bd93f9;
    --dv-paneview-header-border-color: #bd93f9;
    --dv-paneview-active-outline-color: #6272a4;
  }
  div
    :global(
      .dockview-theme-dracula
        .dv-groupview.dv-active-group
        > .dv-tabs-and-actions-container
        > .dv-tabs-container
        > .dv-tab.dv-active-tab
    ) {
    position: relative;
  }
  div
    :global(
      .dockview-theme-dracula
        .dv-groupview.dv-active-group
        > .dv-tabs-and-actions-container
        > .dv-tabs-container
        > .dv-tab.dv-active-tab::after
    ) {
    position: absolute;
    left: 0px;
    top: 0px;
    content: "";
    width: 100%;
    height: 1px;
    background-color: #94527e;
    z-index: 999;
  }
  div
    :global(
      .dockview-theme-dracula
        .dv-groupview.dv-inactive-group
        > .dv-tabs-and-actions-container
        > .dv-tabs-container
        > .dv-tab.dv-active-tab
    ) {
    position: relative;
  }
  div
    :global(
      .dockview-theme-dracula
        .dv-groupview.dv-inactive-group
        > .dv-tabs-and-actions-container
        > .dv-tabs-container
        > .dv-tab.dv-active-tab::after
    ) {
    position: absolute;
    left: 0px;
    bottom: 0px;
    content: "";
    width: 100%;
    height: 1px;
    background-color: #5e3d5a;
    z-index: 999;
  }

  div :global(.dockview-theme-replit) {
    --dv-paneview-active-outline-color: dodgerblue;
    --dv-tabs-and-actions-container-font-size: 13px;
    --dv-tabs-and-actions-container-height: 35px;
    --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
    --dv-drag-over-border-color: white;
    --dv-tabs-container-scrollbar-color: #888;
    --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
    --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
    --dv-overlay-z-index: 999;
    --dv-active-sash-transition-duration: 0.1s;
    --dv-active-sash-transition-delay: 0.5s;
    --dv-group-view-background-color: #ebeced;
    --dv-tabs-and-actions-container-background-color: #fcfcfc;
    --dv-activegroup-visiblepanel-tab-background-color: #f0f1f2;
    --dv-activegroup-hiddenpanel-tab-background-color: #fcfcfc;
    --dv-inactivegroup-visiblepanel-tab-background-color: #f0f1f2;
    --dv-inactivegroup-hiddenpanel-tab-background-color: #fcfcfc;
    --dv-tab-divider-color: transparent;
    --dv-activegroup-visiblepanel-tab-color: rgb(51, 51, 51);
    --dv-activegroup-hiddenpanel-tab-color: rgb(51, 51, 51);
    --dv-inactivegroup-visiblepanel-tab-color: rgb(51, 51, 51);
    --dv-inactivegroup-hiddenpanel-tab-color: rgb(51, 51, 51);
    --dv-separator-border: transparent;
    --dv-paneview-header-border-color: rgb(51, 51, 51);
    --dv-separator-handle-background-color: #cfd1d3;
    --dv-separator-handle-hover-background-color: #babbbb;
  }
  div
    :global(.dockview-theme-replit .dv-resize-container:has(> .dv-groupview)) {
    border-radius: 8px;
  }
  div :global(.dockview-theme-replit .dv-groupview) {
    overflow: hidden;
    border-radius: 10px;
  }
  div
    :global(
      .dockview-theme-replit .dv-groupview .dv-tabs-and-actions-container
    ) {
    border-bottom: 1px solid rgba(128, 128, 128, 0.35);
  }
  div
    :global(
      .dockview-theme-replit
        .dv-groupview
        .dv-tabs-and-actions-container
        .dv-tab
    ) {
    margin: 4px;
    border-radius: 8px;
  }
  div
    :global(
      .dockview-theme-replit
        .dv-groupview
        .dv-tabs-and-actions-container
        .dv-tab
        .dv-svg
    ) {
    height: 8px;
    width: 8px;
  }
  div
    :global(
      .dockview-theme-replit
        .dv-groupview
        .dv-tabs-and-actions-container
        .dv-tab:hover
    ) {
    background-color: #e4e5e6 !important;
  }
  div :global(.dockview-theme-replit .dv-groupview .dv-content-container) {
    background-color: #fcfcfc;
  }
  div :global(.dockview-theme-replit .dv-groupview.dv-active-group) {
    border: 1px solid rgba(128, 128, 128, 0.35);
  }
  div :global(.dockview-theme-replit .dv-groupview.dv-inactive-group) {
    border: 1px solid transparent;
  }
  div
    :global(
      .dockview-theme-replit
        .dv-vertical
        > .dv-sash-container
        > .dv-sash:not(.disabled)::after
    ) {
    content: "";
    height: 4px;
    width: 40px;
    border-radius: 2px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--dv-separator-handle-background-color);
    position: absolute;
  }
  div
    :global(
      .dockview-theme-replit
        .dv-vertical
        > .dv-sash-container
        > .dv-sash:not(.disabled):hover::after
    ) {
    background-color: var(--dv-separator-handle-hover-background-color);
  }
  div
    :global(
      .dockview-theme-replit
        .dv-horizontal
        > .dv-sash-container
        > .dv-sash:not(.disabled)::after
    ) {
    content: "";
    height: 40px;
    width: 4px;
    border-radius: 2px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--dv-separator-handle-background-color);
    position: absolute;
  }
  div
    :global(
      .dockview-theme-replit
        .dv-horizontal
        > .dv-sash-container
        > .dv-sash:not(.disabled):hover::after
    ) {
    background-color: var(--dv-separator-handle-hover-background-color);
  }
  div :global(.dv-drop-target) {
    position: relative;
  }
  div :global(.dv-drop-target > .dv-drop-target-dropzone) {
    position: absolute;
    left: 0px;
    top: 0px;
    height: 100%;
    width: 100%;
    z-index: 1000;
    pointer-events: none;
  }
  div
    :global(
      .dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection
    ) {
    position: relative;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    background-color: var(--dv-drag-over-background-color);
    transition:
      top 70ms ease-out,
      left 70ms ease-out,
      width 70ms ease-out,
      height 70ms ease-out,
      opacity 0.15s ease-out;
    will-change: transform;
    pointer-events: none;
  }
  div
    :global(
      .dv-drop-target
        > .dv-drop-target-dropzone
        > .dv-drop-target-selection.dv-drop-target-top.dv-drop-target-small-vertical
    ) {
    border-top: 1px solid var(--dv-drag-over-border-color);
  }
  div
    :global(
      .dv-drop-target
        > .dv-drop-target-dropzone
        > .dv-drop-target-selection.dv-drop-target-bottom.dv-drop-target-small-vertical
    ) {
    border-bottom: 1px solid var(--dv-drag-over-border-color);
  }
  div
    :global(
      .dv-drop-target
        > .dv-drop-target-dropzone
        > .dv-drop-target-selection.dv-drop-target-left.dv-drop-target-small-horizontal
    ) {
    border-left: 1px solid var(--dv-drag-over-border-color);
  }
  div
    :global(
      .dv-drop-target
        > .dv-drop-target-dropzone
        > .dv-drop-target-selection.dv-drop-target-right.dv-drop-target-small-horizontal
    ) {
    border-right: 1px solid var(--dv-drag-over-border-color);
  }
  div :global(.dv-dockview) {
    position: relative;
    background-color: var(--dv-group-view-background-color);
  }
  div :global(.dv-dockview .dv-watermark-container) {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    z-index: 1;
  }
  div :global(.dv-dockview .dv-overlay-render-container) {
    position: relative;
  }

  div
    :global(
      .dv-groupview.dv-active-group
        > .dv-tabs-and-actions-container
        > .dv-tabs-container
        > .dv-tab.dv-active-tab
    ) {
    background-color: var(--dv-activegroup-visiblepanel-tab-background-color);
    color: var(--dv-activegroup-visiblepanel-tab-color);
  }
  div
    :global(
      .dv-groupview.dv-active-group
        > .dv-tabs-and-actions-container
        > .dv-tabs-container
        > .dv-tab.dv-inactive-tab
    ) {
    background-color: var(--dv-activegroup-hiddenpanel-tab-background-color);
    color: var(--dv-activegroup-hiddenpanel-tab-color);
  }
  div
    :global(
      .dv-groupview.dv-inactive-group
        > .dv-tabs-and-actions-container
        > .dv-tabs-container
        > .dv-tab.dv-active-tab
    ) {
    background-color: var(--dv-inactivegroup-visiblepanel-tab-background-color);
    color: var(--dv-inactivegroup-visiblepanel-tab-color);
  }
  div
    :global(
      .dv-groupview.dv-inactive-group
        > .dv-tabs-and-actions-container
        > .dv-tabs-container
        > .dv-tab.dv-inactive-tab
    ) {
    background-color: var(--dv-inactivegroup-hiddenpanel-tab-background-color);
    color: var(--dv-inactivegroup-hiddenpanel-tab-color);
  }

  /**
 * when a tab is dragged we lose the above stylings because they are conditional on parent elements
 * therefore we also set some stylings for the dragging event
 **/
  div :global(.dv-tab.dv-tab-dragging) {
    background-color: var(--dv-activegroup-visiblepanel-tab-background-color);
    color: var(--dv-activegroup-visiblepanel-tab-color);
  }
  div :global(.dv-groupview) {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--dv-group-view-background-color);
    overflow: hidden;
  }
  div :global(.dv-groupview:focus) {
    outline: none;
  }
  div :global(.dv-groupview > .dv-content-container) {
    flex-grow: 1;
    min-height: 0;
    outline: none;
  }
  div :global(.dv-root-wrapper) {
    height: 100%;
    width: 100%;
  }
  div :global(.dv-grid-view),
  div :global(.dv-branch-node) {
    height: 100%;
    width: 100%;
  }
  div :global(.dv-debug .dv-resize-container .dv-resize-handle-top) {
    background-color: red;
  }
  div :global(.dv-debug .dv-resize-container .dv-resize-handle-bottom) {
    background-color: green;
  }
  div :global(.dv-debug .dv-resize-container .dv-resize-handle-left) {
    background-color: yellow;
  }
  div :global(.dv-debug .dv-resize-container .dv-resize-handle-right) {
    background-color: blue;
  }
  div :global(.dv-debug .dv-resize-container .dv-resize-handle-topleft),
  div :global(.dv-debug .dv-resize-container .dv-resize-handle-topright),
  div :global(.dv-debug .dv-resize-container .dv-resize-handle-bottomleft),
  div :global(.dv-debug .dv-resize-container .dv-resize-handle-bottomright) {
    background-color: cyan;
  }

  div :global(.dv-resize-container) {
    --dv-overlay-z-index: var(--dv-overlay-z-index, 999);
    position: absolute;
    z-index: calc(var(--dv-overlay-z-index) - 2);
    border: 1px solid var(--dv-tab-divider-color);
    box-shadow: var(--dv-floating-box-shadow);
  }
  div :global(.dv-resize-container.dv-hidden) {
    display: none;
  }
  div :global(.dv-resize-container.dv-resize-container-dragging) {
    opacity: 0.5;
  }
  div :global(.dv-resize-container .dv-resize-handle-top) {
    height: 4px;
    width: calc(100% - 8px);
    left: 4px;
    top: -2px;
    z-index: var(--dv-overlay-z-index);
    position: absolute;
    cursor: ns-resize;
  }
  div :global(.dv-resize-container .dv-resize-handle-bottom) {
    height: 4px;
    width: calc(100% - 8px);
    left: 4px;
    bottom: -2px;
    z-index: var(--dv-overlay-z-index);
    position: absolute;
    cursor: ns-resize;
  }
  div :global(.dv-resize-container .dv-resize-handle-left) {
    height: calc(100% - 8px);
    width: 4px;
    left: -2px;
    top: 4px;
    z-index: var(--dv-overlay-z-index);
    position: absolute;
    cursor: ew-resize;
  }
  div :global(.dv-resize-container .dv-resize-handle-right) {
    height: calc(100% - 8px);
    width: 4px;
    right: -2px;
    top: 4px;
    z-index: var(--dv-overlay-z-index);
    position: absolute;
    cursor: ew-resize;
  }
  div :global(.dv-resize-container .dv-resize-handle-topleft) {
    height: 4px;
    width: 4px;
    top: -2px;
    left: -2px;
    z-index: var(--dv-overlay-z-index);
    position: absolute;
    cursor: nw-resize;
  }
  div :global(.dv-resize-container .dv-resize-handle-topright) {
    height: 4px;
    width: 4px;
    right: -2px;
    top: -2px;
    z-index: var(--dv-overlay-z-index);
    position: absolute;
    cursor: ne-resize;
  }
  div :global(.dv-resize-container .dv-resize-handle-bottomleft) {
    height: 4px;
    width: 4px;
    left: -2px;
    bottom: -2px;
    z-index: var(--dv-overlay-z-index);
    position: absolute;
    cursor: sw-resize;
  }
  div :global(.dv-resize-container .dv-resize-handle-bottomright) {
    height: 4px;
    width: 4px;
    right: -2px;
    bottom: -2px;
    z-index: var(--dv-overlay-z-index);
    position: absolute;
    cursor: se-resize;
  }
  div :global(.dv-render-overlay) {
    --dv-overlay-z-index: var(--dv-overlay-z-index, 999);
    position: absolute;
    z-index: 1;
    height: 100%;
  }
  div :global(.dv-render-overlay.dv-render-overlay-float) {
    z-index: calc(var(--dv-overlay-z-index) - 1);
  }

  div :global(.dv-debug .dv-render-overlay) {
    outline: 1px solid red;
    outline-offset: -1;
  }
  div :global(.dv-pane-container) {
    height: 100%;
    width: 100%;
  }
  div :global(.dv-pane-container.dv-animated .dv-view) {
    transition-duration: 0.15s;
    transition-timing-function: ease-out;
  }
  div :global(.dv-pane-container .dv-view) {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 0px !important;
  }
  div :global(.dv-pane-container .dv-view:not(:first-child)::before) {
    background-color: transparent !important;
  }
  div
    :global(
      .dv-pane-container .dv-view:not(:first-child) .dv-pane > .dv-pane-header
    ) {
    border-top: 1px solid var(--dv-paneview-header-border-color);
  }
  div :global(.dv-pane-container .dv-view .dv-default-header) {
    background-color: var(--dv-group-view-background-color);
    color: var(--dv-activegroup-visiblepanel-tab-color);
    display: flex;
    padding: 0px 8px;
    cursor: pointer;
  }
  div
    :global(
      .dv-pane-container .dv-view .dv-default-header .dv-pane-header-icon
    ) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  div :global(.dv-pane-container .dv-view .dv-default-header > span) {
    padding-left: 8px;
    flex-grow: 1;
  }
  div :global(.dv-pane-container:first-of-type > .dv-pane > .dv-pane-header) {
    border-top: none !important;
  }
  div :global(.dv-pane-container .dv-pane) {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
  }
  div :global(.dv-pane-container .dv-pane .dv-pane-header) {
    box-sizing: border-box;
    user-select: none;
    position: relative;
    outline: none;
  }
  div :global(.dv-pane-container .dv-pane .dv-pane-header.dv-pane-draggable) {
    cursor: pointer;
  }
  div :global(.dv-pane-container .dv-pane .dv-pane-header:focus:before),
  div :global(.dv-pane-container .dv-pane .dv-pane-header:focus-within:before) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    content: "";
    pointer-events: none;
    outline: 1px solid;
    outline-width: -1px;
    outline-style: solid;
    outline-offset: -1px;
    outline-color: var(--dv-paneview-active-outline-color);
  }
  div :global(.dv-pane-container .dv-pane .dv-pane-body) {
    overflow-y: auto;
    overflow-x: hidden;
    flex-grow: 1;
    position: relative;
    outline: none;
  }
  div :global(.dv-pane-container .dv-pane .dv-pane-body:focus:before),
  div :global(.dv-pane-container .dv-pane .dv-pane-body:focus-within:before) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    content: "";
    pointer-events: none;
    outline: 1px solid;
    outline-width: -1px;
    outline-style: solid;
    outline-offset: -1px;
    outline-color: var(--dv-paneview-active-outline-color);
  }
  div
    :global(
      .dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-enabled
    ) {
    background-color: black;
  }
  div
    :global(
      .dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-disabled
    ) {
    background-color: orange;
  }
  div
    :global(
      .dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-maximum
    ) {
    background-color: green;
  }
  div
    :global(
      .dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-minimum
    ) {
    background-color: red;
  }

  div :global(.dv-split-view-container) {
    position: relative;
    overflow: hidden;
    height: 100%;
    width: 100%;
  }
  div
    :global(
      .dv-split-view-container.dv-splitview-disabled
        > .dv-sash-container
        > .dv-sash
    ) {
    pointer-events: none;
  }
  div :global(.dv-split-view-container.dv-animation .dv-view),
  div :global(.dv-split-view-container.dv-animation .dv-sash) {
    transition-duration: 0.15s;
    transition-timing-function: ease-out;
  }
  div :global(.dv-split-view-container.dv-horizontal) {
    height: 100%;
  }
  div
    :global(
      .dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash
    ) {
    height: 100%;
    width: 4px;
  }
  div
    :global(
      .dv-split-view-container.dv-horizontal
        > .dv-sash-container
        > .dv-sash.dv-enabled
    ) {
    cursor: ew-resize;
  }
  div
    :global(
      .dv-split-view-container.dv-horizontal
        > .dv-sash-container
        > .dv-sash.dv-disabled
    ) {
    cursor: default;
  }
  div
    :global(
      .dv-split-view-container.dv-horizontal
        > .dv-sash-container
        > .dv-sash.dv-maximum
    ) {
    cursor: w-resize;
  }
  div
    :global(
      .dv-split-view-container.dv-horizontal
        > .dv-sash-container
        > .dv-sash.dv-minimum
    ) {
    cursor: e-resize;
  }
  div
    :global(
      .dv-split-view-container.dv-horizontal
        > .dv-view-container
        > .dv-view:not(:first-child)::before
    ) {
    height: 100%;
    width: 1px;
  }
  div :global(.dv-split-view-container.dv-vertical) {
    width: 100%;
  }
  div
    :global(
      .dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash
    ) {
    width: 100%;
    height: 4px;
  }
  div
    :global(
      .dv-split-view-container.dv-vertical
        > .dv-sash-container
        > .dv-sash.dv-enabled
    ) {
    cursor: ns-resize;
  }
  div
    :global(
      .dv-split-view-container.dv-vertical
        > .dv-sash-container
        > .dv-sash.dv-disabled
    ) {
    cursor: default;
  }
  div
    :global(
      .dv-split-view-container.dv-vertical
        > .dv-sash-container
        > .dv-sash.dv-maximum
    ) {
    cursor: n-resize;
  }
  div
    :global(
      .dv-split-view-container.dv-vertical
        > .dv-sash-container
        > .dv-sash.dv-minimum
    ) {
    cursor: s-resize;
  }
  div
    :global(
      .dv-split-view-container.dv-vertical > .dv-view-container > .dv-view
    ) {
    width: 100%;
  }
  div
    :global(
      .dv-split-view-container.dv-vertical
        > .dv-view-container
        > .dv-view:not(:first-child)::before
    ) {
    height: 1px;
    width: 100%;
  }
  div :global(.dv-split-view-container .dv-sash-container) {
    height: 100%;
    width: 100%;
    position: absolute;
  }
  div :global(.dv-split-view-container .dv-sash-container .dv-sash) {
    position: absolute;
    z-index: 99;
    outline: none;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    touch-action: none;
  }
  div
    :global(
      .dv-split-view-container .dv-sash-container .dv-sash:not(.disabled):active
    ),
  div
    :global(
      .dv-split-view-container .dv-sash-container .dv-sash:not(.disabled):hover
    ) {
    background-color: var(--dv-active-sash-color, transparent);
    transition-property: background-color;
    transition-timing-function: ease-in-out;
    transition-duration: var(--dv-active-sash-transition-duration, 0.1s);
    transition-delay: var(--dv-active-sash-transition-delay, 0.5s);
  }
  div :global(.dv-split-view-container .dv-view-container) {
    position: relative;
    height: 100%;
    width: 100%;
  }
  div :global(.dv-split-view-container .dv-view-container .dv-view) {
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    position: absolute;
  }
  div
    :global(
      .dv-split-view-container.dv-separator-border
        .dv-view:not(:first-child)::before
    ) {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    pointer-events: none;
    background-color: var(--dv-separator-border);
  }
  div :global(.dv-dragged) {
    transform: translate3d(
      0px,
      0px,
      0px
    ); /* forces tab to be drawn on a separate layer (see https://github.com/microsoft/vscode/issues/18733) */
  }

  div :global(.dv-tab) {
    flex-shrink: 0;
  }
  div :global(.dv-tab:focus-within),
  div :global(.dv-tab:focus) {
    position: relative;
  }
  div :global(.dv-tab:focus-within::after),
  div :global(.dv-tab:focus::after) {
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    pointer-events: none;
    outline: 1px solid var(--dv-tab-divider-color) !important;
    outline-offset: -1px;
    z-index: 5;
  }
  div :global(.dv-tab.dv-tab-dragging .dv-default-tab-action) {
    background-color: var(--dv-activegroup-visiblepanel-tab-color);
  }
  div :global(.dv-tab.dv-active-tab .dv-default-tab .dv-default-tab-action) {
    visibility: visible;
  }
  div :global(.dv-tab.dv-inactive-tab .dv-default-tab .dv-default-tab-action) {
    visibility: hidden;
  }
  div
    :global(
      .dv-tab.dv-inactive-tab .dv-default-tab:hover .dv-default-tab-action
    ) {
    visibility: visible;
  }
  div :global(.dv-tab .dv-default-tab) {
    position: relative;
    height: 100%;
    display: flex;
    min-width: 80px;
    align-items: center;
    padding: 0px 8px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  div :global(.dv-tab .dv-default-tab .dv-default-tab-content) {
    padding: 0px 8px;
    flex-grow: 1;
  }
  div :global(.dv-tab .dv-default-tab .dv-default-tab-action) {
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
  div :global(.dv-tab .dv-default-tab .dv-default-tab-action:hover) {
    border-radius: 2px;
    background-color: var(--dv-icon-hover-background-color);
  }
  div :global(.dv-tabs-and-actions-container) {
    display: flex;
    background-color: var(--dv-tabs-and-actions-container-background-color);
    flex-shrink: 0;
    box-sizing: border-box;
    height: var(--dv-tabs-and-actions-container-height);
    font-size: var(--dv-tabs-and-actions-container-font-size);
  }
  div
    :global(
      .dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab
        .dv-tabs-container
    ) {
    flex-grow: 1;
  }
  div
    :global(
      .dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab
        .dv-tabs-container
        .dv-tab
    ) {
    flex-grow: 1;
  }
  div
    :global(
      .dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab
        .dv-void-container
    ) {
    flex-grow: 0;
  }
  div :global(.dv-tabs-and-actions-container .dv-void-container) {
    display: flex;
    flex-grow: 1;
    cursor: grab;
  }
  div :global(.dv-tabs-and-actions-container .dv-tabs-container) {
    display: flex;
    overflow-x: overlay;
    overflow-y: hidden;
    scrollbar-width: thin;
    /* Track */
    /* Handle */
  }
  div
    :global(
      .dv-tabs-and-actions-container .dv-tabs-container::-webkit-scrollbar
    ) {
    height: 3px;
  }
  div
    :global(
      .dv-tabs-and-actions-container .dv-tabs-container::-webkit-scrollbar-track
    ) {
    background: transparent;
  }
  div
    :global(
      .dv-tabs-and-actions-container .dv-tabs-container::-webkit-scrollbar-thumb
    ) {
    background: var(--dv-tabs-container-scrollbar-color);
  }
  div :global(.dv-tabs-and-actions-container .dv-tabs-container .dv-tab) {
    -webkit-user-drag: element;
    outline: none;
    min-width: 75px;
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
  }
  div
    :global(
      .dv-tabs-and-actions-container
        .dv-tabs-container
        .dv-tab:not(:first-child)::before
    ) {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    pointer-events: none;
    background-color: var(--dv-tab-divider-color);
    width: 1px;
    height: 100%;
  }
  div :global(.dv-watermark) {
    display: flex;
    height: 100%;
  }
</style>
