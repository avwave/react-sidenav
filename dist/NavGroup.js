"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavGroup = void 0;
var React = require("react");
var Nav_1 = require("./Nav");
var _1 = require("./");
var NavGroupChildren_1 = require("./NavGroupChildren");
var types_1 = require("./types");
var ChildrenIndicatorIcon = function (props) {
    var style = { width: props.size || 16, height: props.size || 16 };
    return (React.createElement("i", { style: style },
        React.createElement("svg", __assign({ fill: "currentColor", style: style, viewBox: "0 0 24 24", width: "1em", height: "1em" }, props),
            React.createElement("path", { d: "M8.59 16.58L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42z" }))));
};
var ToggleIndicatorStyle = {
    top: 0,
    right: 8,
    width: 4,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
    transition: "all 0.2s linear"
};
var ToggleIndicator = function (props) {
    var transform = props.collapsed === types_1.NavGroupState.collapsed ? "rotate(0deg)" : "rotate(90deg)";
    return (React.createElement("div", { style: __assign(__assign({}, ToggleIndicatorStyle), { transform: transform }) },
        React.createElement(ChildrenIndicatorIcon, null)));
};
exports.NavGroup = function (props) {
    var children = props.children, onClick = props.onClick, others = __rest(props, ["children", "onClick"]);
    var context = React.useContext(_1.SideNavContext);
    var navContext = React.useContext(_1.NavContext);
    var childSelected = navContext.pathId && context.selectedPath.indexOf(navContext.pathId) === 0;
    var _a = React.useState(childSelected ? types_1.NavGroupState.expanded : types_1.NavGroupState.collapsed), state = _a[0], setState = _a[1];
    var isCompact = context.mode === _1.ViewMode.compact;
    var rootRef = React.useRef(null);
    var isHoverToggleMode = context.childrenToggleMode === types_1.ChildrenToggleMode.hover;
    var ToggleIndicatorComp = context.childrenToggleIndicator || ToggleIndicator;
    React.useEffect(function () {
        if (context.collapseAutomatically) {
            if (context.childrenToggleMode === types_1.ChildrenToggleMode.hover) {
                // @ts-ignore
                setState((context.mouseOverPathId && (context.mouseOverPathId.includes(navContext.pathId) || navContext.pathId.includes(context.mouseOverPathId))) || context.selectedPath.includes(navContext.pathId) ? types_1.NavGroupState.expanded : types_1.NavGroupState.collapsed);
            }
            else {
                // @ts-ignore
                var st = (context.mouseClickPathId && (context.mouseClickPathId.includes(navContext.pathId) || navContext.pathId.includes(context.mouseClickPathId))) || context.selectedPath.includes(navContext.pathId) ? types_1.NavGroupState.expanded : types_1.NavGroupState.collapsed;
                setState(st);
            }
        }
        if (navContext.pathId &&
            context.mouseOverPathId && (isHoverToggleMode || isCompact)) {
            if (navContext.pathId === context.mouseOverPathId && state === types_1.NavGroupState.collapsed) {
                setState(function () { return types_1.NavGroupState.expanded; });
            }
            else if (!context.mouseOverPathId.startsWith(navContext.pathId) && isCompact) {
                // collapsed if we are in compact mode only
                setState(function () { return types_1.NavGroupState.collapsed; });
            }
        }
    }, [context.mouseClickPathId, context.mouseOverPathId, navContext.pathId, types_1.ChildrenToggleMode.hover]);
    var toggleState = function () {
        setState(function (currentState) {
            return currentState === types_1.NavGroupState.expanded ? types_1.NavGroupState.collapsed : currentState;
        });
    };
    var onHandleClick = function (e) {
        if (context.childrenToggleMode === types_1.ChildrenToggleMode.click) {
            if (e) {
                e.stopPropagation();
            }
            setState(function (currentState) {
                return currentState === types_1.NavGroupState.collapsed ? types_1.NavGroupState.expanded : types_1.NavGroupState.collapsed;
            });
        }
    };
    // we would want to render the main items but
    // not the children. The children will be taken cared
    // of navGroup
    var navChildren = [];
    var nonNavChildren = [];
    React.Children.toArray(children).forEach(function (child) {
        var childEl = child;
        if (childEl.type === Nav_1.Nav) {
            navChildren.push(child);
        }
        else {
            nonNavChildren.push(child);
        }
    });
    return (React.createElement("div", __assign({}, others, { 
        // onMouseEnter={onMouseEnter}
        onClick: onHandleClick, ref: rootRef, style: { position: 'relative' } }),
        React.createElement("div", { style: { position: 'relative' } },
            nonNavChildren,
            isCompact ? null : React.createElement(ToggleIndicatorComp, { collapsed: state })),
        React.createElement(NavGroupChildren_1.NavGroupChildren, { toggleCollapsed: toggleState, rootRef: rootRef, state: state }, navChildren)));
};
