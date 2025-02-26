import { DockviewCompositeDisposable, DockviewEmitter, DockviewEvent, DockviewMutableDisposable } from "dockview-core";
import type {
  GroupPanelPartInitParameters,
  IContentRenderer,
  IDockviewPanelProps,
  IGroupPanelBaseProps,
  ITabRenderer,
  IWatermarkRenderer,
  IWatermarkPanelProps,
  WatermarkRendererInitParameters,
  DockviewApi,
  DockviewGroupPanelApi,
  IDockviewHeaderActionsProps,
  IHeaderActionsRenderer,
  DockviewGroupPanel,
} from "dockview-core";
import PanelRendererBase, { type ConstructorConfigWithout } from "../utils/PanelRendererBase.js";
import type { PropsUpdater } from "$lib/utils/PropsUpdater.svelte.js";

export class SvelteDockComponentRenderer<Props extends IDockviewPanelProps>
  extends PanelRendererBase<Props, GroupPanelPartInitParameters>
  implements IContentRenderer {

  private readonly _onDidFocus = new DockviewEmitter<void>();
  readonly onDidFocus: DockviewEvent<void> = this._onDidFocus.event;

  private readonly _onDidBlur = new DockviewEmitter<void>();
  readonly onDidBlur: DockviewEvent<void> = this._onDidBlur.event;

  constructor(config: ConstructorConfigWithout<Props, GroupPanelPartInitParameters>) {
    super({
      ...config,
      panelTarget: "dock",
      initOptionsToProps: ({ params, api, containerApi }) => ({ params, api, containerApi } as Props),
    });
  }

  public dispose(): void {
    super.dispose();
    this._onDidFocus.dispose();
    this._onDidBlur.dispose();
  }
}

export class SvelteDockHeaderRenderer<Props extends IGroupPanelBaseProps>
  extends PanelRendererBase<Props, GroupPanelPartInitParameters>
  implements ITabRenderer {

  constructor(config: ConstructorConfigWithout<Props, GroupPanelPartInitParameters>) {
    super({
      ...config,
      panelTarget: "dockheader",
      initOptionsToProps: ({ params, api, containerApi }) => ({ params, api, containerApi } as Props)
    });
  }
}

export class SvelteWatermarkRenderer<Props extends IWatermarkPanelProps>
  extends PanelRendererBase<Props, WatermarkRendererInitParameters>
  implements IWatermarkRenderer {

  constructor(config: ConstructorConfigWithout<Props, WatermarkRendererInitParameters>,
  ) {
    super({
      ...config,
      propsHasParams: false,
      panelTarget: "dockwatermark",
      initOptionsToProps: ({ group, containerApi }) => ({ group, containerApi } as Props),
    })
  }
}


type ActionsHeaderInitParameters = {
  containerApi: DockviewApi;
  api: DockviewGroupPanelApi;
};

export class SvelteDockActionsHeaderRenderer<Props extends IDockviewHeaderActionsProps>
  extends PanelRendererBase<Props, ActionsHeaderInitParameters>
  implements IHeaderActionsRenderer {
  private readonly mutableDisposable = new DockviewMutableDisposable();
  private readonly group: DockviewGroupPanel;

  constructor(group: DockviewGroupPanel, config: ConstructorConfigWithout<Props, ActionsHeaderInitParameters>) {
    super({
      ...config,
      propsHasParams: false,
      panelTarget: "dockactions",
      initOptionsToProps: ({ api, containerApi }) =>
      ({
        api, containerApi, group, panels: group.model.panels,
        activePanel: group.model.activePanel,
        isGroupActive: group.api.isActive,
      } as Props),
    })

    this.group = group;
  }

  init(parameters: {
    containerApi: DockviewApi;
    api: DockviewGroupPanelApi;
  }): void {
    this.mutableDisposable.value = new DockviewCompositeDisposable(
      this.group.model.onDidAddPanel(() => this.updatePanels()),
      this.group.model.onDidRemovePanel(() => this.updatePanels()),
      this.group.model.onDidActivePanelChange(() => this.updateActivePanel()),
      parameters.api.onDidActiveChange(() => this.updateGroupActive()),
    );

    super.init(parameters);
  }

  dispose(): void {
    super.dispose();
    this.mutableDisposable.dispose();
  }

  private updatePanels(): void {
    (this.propsUpdater as unknown as PropsUpdater<IDockviewHeaderActionsProps>)
      ?.updateSingle("panels", this.group.model.panels);
  }

  private updateActivePanel(): void {
    (this.propsUpdater as unknown as PropsUpdater<IDockviewHeaderActionsProps>)
      ?.updateSingle("activePanel", this.group.model.activePanel);
  }

  private updateGroupActive(): void {
    (this.propsUpdater as unknown as PropsUpdater<IDockviewHeaderActionsProps>)
      ?.updateSingle("isGroupActive", this.group.api.isActive);
  }
}