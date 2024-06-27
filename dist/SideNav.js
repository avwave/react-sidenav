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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SideNav = exports.SideNavContext = exports.SideNavActionContext = void 0;
var React = require("react");
var types_1 = require("./types");
exports.SideNavActionContext = React.createContext(null);
exports.SideNavContext = React.createContext(null);
exports.SideNav = function (props) {
    var _a = React.useState({
        selectedPath: props.defaultSelectedPath || '',
        mode: props.mode || types_1.ViewMode.normal,
        childrenToggleMode: props.childrenToggleMode || types_1.ChildrenToggleMode.hover,
        childrenToggleIndicator: props.childrenToggleIndicator,
        collapseAutomatically: props.collapseAutomatically
    }), state = _a[0], setState = _a[1];
    var onSelectionPathSelected = function (path, selectionData) {
        if (props.onSelection) {
            props.onSelection(path, selectionData);
        }
        setState(function (currentState) {
            return __assign(__assign({}, currentState), { selectedPath: path });
        });
    };
    var onMouseOver = function (e) {
        var mouseOverPathId;
        var current = e.target;
        while (current && current.getAttribute) {
            var pathId = current.getAttribute('data-pathid');
            if (pathId) {
                mouseOverPathId = pathId;
                break;
            }
            current = current.parentNode;
        }
        if (mouseOverPathId && state.mouseOverPathId !== mouseOverPathId) {
            setState(__assign(__assign({}, state), { mouseOverPathId: mouseOverPathId }));
        }
    };
    var onMouseClick = function (e) {
        var mouseClickPathId;
        var current = e.target;
        while (current && current.getAttribute) {
            var pathId = current.getAttribute('data-pathid');
            if (pathId) {
                mouseClickPathId = pathId;
                break;
            }
            current = current.parentNode;
        }
        if (mouseClickPathId && state.mouseClickPathId !== mouseClickPathId) {
            setState(__assign(__assign({}, state), { mouseClickPathId: mouseClickPathId }));
        }
    };
    React.useEffect(function () {
        setState(__assign(__assign({}, state), { mode: props.mode || types_1.ViewMode.normal }));
    }, [props.mode]);
    React.useEffect(function () {
        setState(__assign(__assign({}, state), { selectedPath: props.defaultSelectedPath || '' }));
    }, [props.defaultSelectedPath]);
    React.useEffect(function () {
        setState(__assign(__assign({}, state), { childrenToggleIndicator: props.childrenToggleIndicator }));
    }, [props.childrenToggleIndicator]);
    React.useEffect(function () {
        setState(__assign(__assign({}, state), { childrenToggleMode: props.childrenToggleMode || types_1.ChildrenToggleMode.hover }));
    }, [props.childrenToggleMode]);
    React.useEffect(function () {
        setState(__assign(__assign({}, state), { collapseAutomatically: props.collapseAutomatically }));
    }, [props.collapseAutomatically]);
    return (React.createElement(exports.SideNavContext.Provider, { value: state },
        React.createElement(exports.SideNavActionContext.Provider, { value: { onSelectionPathSelected: onSelectionPathSelected } },
            React.createElement("aside", { onClickCapture: onMouseClick, onMouseOver: onMouseOver, "data-selected-path": state.selectedPath, "data-testid": 'sidenav-root' }, props.children))));
};
