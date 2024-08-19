import * as React from 'react'
import { SideNavContext } from './SideNav'
import { INavGroupChildrenProp, ViewMode, NavGroupState } from './types'
import { createPortal } from 'react-dom'


const StyleCollapsed = Object.freeze({
  maxHeight: 0,
  transition: 'max-height 0.3s ease-out',
  overflow: 'hidden',
})
const StyleExpanded = Object.freeze({
  overflow: 'hidden',
  maxHeight: '1000px',
  transition: 'max-height 0.5s ease-in'
})

export const NavGroupChildren: React.FC<INavGroupChildrenProp> = (props) => {
  const context = React.useContext(SideNavContext)

  React.useEffect(() => {
    let eventListener: any;

    if (context.mode === ViewMode.compact) {
      eventListener = () => {
        props.toggleCollapsed()
      }
      window.addEventListener('click', eventListener)
    }
    return () => {
      if (eventListener) {
        window.removeEventListener('click', eventListener)
      }
    }
  }, [props.toggleCollapsed, context.mode])

  if (context.mode === ViewMode.compact) {
    if (props.state === NavGroupState.expanded) {
      const { current } = props.rootRef

      if (current) {
        const boundingRect = current.getBoundingClientRect();
        return (
          <CompactNavGroupChildrenCont boundingRect={boundingRect}>
            {props.children}
          </CompactNavGroupChildrenCont>
        )
      }
      return null
    }
  } else {

    const style = props.state === NavGroupState.collapsed ? StyleCollapsed : StyleExpanded
    return (
      <div
        data-navgroupstate={props.state}
        style={style}>
        {props.children}
      </div>
    )
  }

  return null;
}

interface ICompactNavGroupChildrenProps {
  children: React.ReactNode
  boundingRect: DOMRect
}

const CompactNavGroupChildrenCont: React.FC<ICompactNavGroupChildrenProps> = ({ children, boundingRect }) => {
  const [portalElement, setPortalElement] = React.useState<HTMLDivElement | null>(null);

  React.useEffect(
    () => {
      const portal = document.createElement('div');
      document.body.appendChild(portal);
      setPortalElement(portal);

      return () => {
        document.body.removeChild(portal);
      }
    }, []
  );

  React.useEffect(() => {
    if (portalElement) {
      const { x: hoverBoxX, y: hoverBoxY, width: hoverBoxWidth } = boundingRect;
      const { height: portalHeight } = portalElement.getBoundingClientRect();

      const { innerHeight } = window;

      const newX = hoverBoxX + hoverBoxWidth;
      let newY = hoverBoxY;

      if (hoverBoxY + portalHeight > innerHeight) {
        newY = innerHeight - portalHeight;
      }
      portalElement.style.left = `${newX}px`;
      portalElement.style.top = `${newY}px`;
      portalElement.style.position = 'fixed';
      portalElement.style.zIndex = '9999';
    }
  }, [portalElement, boundingRect]);

  return portalElement ? createPortal(children, portalElement) : null

}