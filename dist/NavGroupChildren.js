"use strict";
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
                return (React.createElement(CompactNavGroupChildrenCont, { boundingRect: boundingRect }, props.children));
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
var CompactNavGroupChildrenCont = function (_a) {
    var children = _a.children, boundingRect = _a.boundingRect;
    var _b = React.useState(null), portalElement = _b[0], setPortalElement = _b[1];
    React.useEffect(function () {
        var portal = document.createElement('div');
        document.body.appendChild(portal);
        setPortalElement(portal);
        return function () {
            document.body.removeChild(portal);
        };
    }, []);
    React.useEffect(function () {
        if (portalElement) {
            var hoverBoxX = boundingRect.x, hoverBoxY = boundingRect.y, hoverBoxWidth = boundingRect.width;
            var portalHeight = portalElement.getBoundingClientRect().height;
            var innerHeight_1 = window.innerHeight;
            var newX = hoverBoxX + hoverBoxWidth;
            var newY = hoverBoxY;
            if (hoverBoxY + portalHeight > innerHeight_1) {
                newY = innerHeight_1 - portalHeight;
            }
            portalElement.style.left = newX + "px";
            portalElement.style.top = newY + "px";
            portalElement.style.position = 'fixed';
            portalElement.style.zIndex = '9999';
        }
    }, [portalElement, boundingRect]);
    return portalElement ? react_dom_1.createPortal(children, portalElement) : null;
};
