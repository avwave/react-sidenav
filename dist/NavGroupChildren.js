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
exports.NavGroupChildren = void 0;
var React = require("react");
var SideNav_1 = require("./SideNav");
var types_1 = require("./types");
var react_dom_1 = require("react-dom");
var StyleCollapsed = Object.freeze({
    maxHeight: 0,
    transition: 'max-height 0.3s ease-out',
    overflow: 'hidden',
});
var StyleExpanded = Object.freeze({
    overflow: 'hidden',
    maxHeight: '1000px',
    transition: 'max-height 0.5s ease-in'
});
exports.NavGroupChildren = function (props) {
    var context = React.useContext(SideNav_1.SideNavContext);
    React.useEffect(function () {
        var eventListener;
        if (context.mode === types_1.ViewMode.compact) {
            eventListener = function () {
                props.toggleCollapsed();
            };
            window.addEventListener('click', eventListener);
        }
        return function () {
            if (eventListener) {
                window.removeEventListener('click', eventListener);
            }
        };
    }, [props.toggleCollapsed, context.mode]);
    if (context.mode === types_1.ViewMode.compact) {
        if (props.state === types_1.NavGroupState.expanded) {
            var current = props.rootRef.current;
            if (current) {
                var boundingRect = current.getBoundingClientRect();
                var screenHeight = window.innerHeight;
                var subStyle = {};
                if (boundingRect.bottom + boundingRect.height > screenHeight) {
                    subStyle = {
                        bottom: (screenHeight - boundingRect.bottom),
                    };
                }
                else {
                    subStyle = {
                        top: boundingRect.top,
                    };
                }
                return (React.createElement(CompactNavGroupChildrenCont, null,
                    React.createElement("div", { style: __assign({ background: current ? current.style.background : '#FFF', position: 'absolute', zIndex: 99999, left: boundingRect.right }, subStyle) }, props.children)));
            }
            return null;
        }
    }
    else {
        var style = props.state === types_1.NavGroupState.collapsed ? StyleCollapsed : StyleExpanded;
        return (React.createElement("div", { "data-navgroupstate": props.state, style: style }, props.children));
    }
    return null;
};
var mountPoint = document.createElement('div');
document.body.appendChild(mountPoint);
/**
 * Render on body
 */
var CompactNavGroupChildrenCont = function (props) {
    return react_dom_1.createPortal(props.children, mountPoint);
};
