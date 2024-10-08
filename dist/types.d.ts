/**
 * The ViewMode. If a render supports it then
 * rendering of children can be affected by this
 */
export declare enum ViewMode {
    normal = "normal",
    compact = "compact"
}
export interface ISelectionPathData<P = {}> {
    id: string;
    level: number;
    isLeaf: boolean;
    payload?: P;
}
export declare type OnSelectionListener = (selectionPath: string, selectionPathData: ISelectionPathData) => void;
export declare enum NavGroupState {
    expanded = "expanded",
    collapsed = "collapsed"
}
export interface INavGroupProp {
    onClick: (arg: any) => void;
}
export interface INavGroupChildrenProp {
    state: NavGroupState;
    rootRef: React.RefObject<HTMLDivElement>;
    toggleCollapsed: () => void;
}
export interface ISideNavActionContext {
    onSelectionPathSelected: OnSelectionListener;
}
export declare enum ChildrenToggleMode {
    hover = "hover",
    click = "click"
}
export interface ISideNavContext {
    selectedPath: string;
    /**
     * The viewMode. Depending on the renderer, it can change
     * how items are rendered
     */
    mode?: ViewMode;
    /**
     * Path separator to use for selectionPath
     * Default is |
     */
    pathSeparator?: string;
    /**
     * By default, Hover will show children
     */
    childrenToggleMode: ChildrenToggleMode;
    /**
     *
     * Note that in compact mode, toggle indicator is not normally rendered.
     */
    childrenToggleIndicator?: React.ComponentType;
    /**
     *
     */
    mouseOverPathId?: string;
    mouseClickPathId?: string;
    /**
     *
     * If true, then when a nav is clicked, it will collapse other openedbranches automatically
     */
    collapseAutomatically?: boolean;
}
