import * as React from 'react'
import { render } from 'react-dom'

import {
  SideNav,
  Nav,
  NavContext,
  ViewMode
} from '../';

import {
  Icon1,
  Icon2,
  Icon3,
  IIconProp
} from './icons';

import styled from 'styled-components'
import { ChildrenToggleMode } from '../types';
import { children } from 'cheerio/lib/api/traversing';
import { ISideNavRef } from '../SideNav';

interface IItemContainerProp {
  selected: boolean
}
const ItemContainer = styled.div<IItemContainerProp>`
  color: ${props => props.selected ? 'pink' : 'inherit '};
  padding: 8px;
  &:hover {
    background-color: pink;
    color: ${props => props.selected ? '#FFF' : 'inherit '};
  }
`
const Item: React.FC = (props) => {

  const context = React.useContext(NavContext)

  return (
    <ItemContainer selected={context.selected}>
      {props.children}
    </ItemContainer>
  )
}

const Flex: React.FC = (props) => {
  return (
    <div style={{ display: 'flex' }}>
      {props.children}
    </div>
  )
}

const Container: React.FC<{ width?: number }> = (props) => {
  return (
    <div
      style={{
        margin: 4,
        width: props.width || 'auto',
        height: '99vh',
        border: '1px solid #E5E5E5',
        
        overflowY: 'scroll',
        overflowX: 'hidden'
      }}>
      {props.children}
    </div>
  )
}

const IconContainer = styled.div`
  padding: 8px;
  &:hover {
    color: blue;
  }
`

const Icon: React.FC<{ icon: React.FC<IIconProp> }> = (props) => {
  const IconComponent = props.icon
  return (
    <IconContainer>
      <IconComponent size={30} />
    </IconContainer>
  )
}
const structure = [
  {
    id: 'page1',
    name: 'Page 1',
    children: [
      {
        id: 'page1-1',
        name: 'Page 1-1',
      },
      {
        id: 'page1-2',
        name: 'Page 1-2'
      }
    ]
  },
  ...Array.from({ length: 35 }, (_, i) => String(i + 1).padStart(3, '0')).map((i) => ({
    id: 'page+' + i,
    name: 'Page+ ' + i,
    children: [
      {
        id: `page-${i}-1`,
        name: `---Page s-${i}-1`
      },
      {
        id: `page-${i}-2`,
        name: `---Page s-${i}-2`
      },
      {
        id: `page-${i}-3`,
        name: `---Page s-${i}-3`
      },
      {
        id: `page-${i}-4`,
        name: `---Page s-${i}-4`
      },

    ]
  })),
  {
    id: 'apeE',
    name: 'Page E',
    children: [
      {
        id: 'pageE-1',
        name: '---Page E-1'
      },
      {
        id: 'pageE-2',
        name: '---Page E-2'
      },
      {
        id: 'pageE-3',
        name: '---Page E-3'
      },
      {
        id: 'pageE-4',
        name: '---Page E-4'
      },
      
    ]
  }
]


const App: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(true);

  const navRef = React.useRef<ISideNavRef>(null)

  React.useEffect(
    () => {
      if (navRef.current) {
        navRef.current.collapseAllNodes()
      }
    }, [collapsed]
  );

  return (
    <Flex>
      <Container width={collapsed?100:300}>
        <SideNav
          mode={collapsed?ViewMode.compact:ViewMode.normal}
          childrenToggleMode={collapsed?ChildrenToggleMode.hover:ChildrenToggleMode.click}
          collapseAutomatically
        >
          {structure.map((item) => (
            <Nav key={item.id} id={item.id}>
              <Item>{item.name}</Item>
              {item.children && item.children.map((child) => (
                <Nav key={child.id} id={child.id}>
                  <Item>{child.name}</Item>
                </Nav>
              ))}
            </Nav>
          ))}
        </SideNav>
      </Container>
      <button onClick={() => setCollapsed(!collapsed)}> toggle</button>
    </Flex>
  );
}

render(
  <App />,
  document.getElementById('app')
)