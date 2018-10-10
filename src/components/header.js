import React, { Component } from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { Container, Row, Col } from 'react-bootstrap'
import { FaBars, FaTimes } from 'react-icons/fa'
import styled from 'styled-components'

const Wrapper = styled.header`
  background: black;

  .container {
    position: relative;
  }
`

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0 auto;
  max-width: 960px;
`

const NavBrand = styled.div`
  margin: 10px 0;

  a {
    display: block;
  }
`

const NavMenu = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
`

const SubMenu = styled(NavMenu)`
  display: none;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  position: absolute;
  border-top: ${props => `4px solid ${props.theme.primary}`};
  width: max-content;
  min-width: 120px;
  z-index: 20;

  li {
    padding-right: 0.5rem;
    width: 100%;

    &:not(:last-child) {
      margin-right: 0;
    }
  }

  a {
    padding: 0.45rem 0 0.45rem 0.45rem;
  }
`

const ChildMenu = styled(SubMenu)`
  background-color: white;
  top: 100%;
  left: 0;
  padding-top: 1rem;

  a {
    color: ${props => props.theme.primary};
  }
`

const GrandChildMenu = styled(SubMenu)`
  background-color: ${props => props.theme.primary};
  border-top: 0;
  top: 0;
  left: 100%;

  li {
    &:hover {
      background-color: #ccc;
    }
  }

  a {
    color: white;

    &:hover {
      color: white;
    }
  }
`

const NavItem = styled.li`
  flex: 0 0 auto;
  position: relative;

  &:not(:last-child) {
    margin-right: 10px;
  }

  &:hover {
    > ul {
      display: flex;
    }
  }
`

const SubMenuItem = styled(NavItem)``

const NavLink = styled(Link)`
  color: #fff;
  display: block;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.8rem;
  font-style: italic;
  text-decoration: none;
  text-transform: uppercase;
  padding: 24.5px 0;

  &.alt {
    color: #ffa200; // orange
  }

  &:hover,
  &:focus,
  &.active {
    color: #05c6c7; // teal
  }
`

const SubMenuLink = styled(NavLink)``

const MenuToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    color: ${props =>
      props.menuIsOpen ? props.theme.secondary : props.theme.primary};
    font-size: 2rem;
    cursor: pointer;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
`

const Overlay = styled.div`
  position: ${props => (props.menuIsOpen ? `fixed` : `absolute`)};
  top: 0;
  right: 0;
  width: ${props => (props.menuIsOpen ? `100vw` : `0px`)};
  height: ${props => (props.menuIsOpen ? `100vh` : `0px`)};
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 10;
  transition: all 0.15s ease-in-out;

  ${Nav} {
    display: ${props => (props.menuIsOpen ? `flex` : `none`)};
    justify-content: flex-start;
    padding: 1rem 3rem;
    height: 100%;

    ul {
      height: 100%;
      flex-flow: column nowrap;
      align-items: flex-start;

      a {
        font-size: 2rem;
        font-style: normal;
        padding: 0;
      }
    }
  }
`

export default class Header extends Component {
  constructor(props) {
    super(props)

    this.state = { menuIsOpen: false }
  }
  render() {
    const { logo, siteTitle, menu } = this.props
    const { menuIsOpen } = this.state

    return (
      <Wrapper>
        <Container>
          <Row>
            {logo && (
              <Col xs={9} lg={3}>
                <NavBrand>
                  <Link to="/" title={siteTitle}>
                    <Img fixed={logo.localFile.childImageSharp.fixed} />
                  </Link>
                </NavBrand>
              </Col>
            )}
            {menu && (
              <>
                <Col className="d-none d-lg-block" lg={9}>
                  <Nav role={`navigation`} aria-label={menu.name}>
                    <NavMenu>
                      {menu.items.map(item => (
                        <NavItem key={item.wordpress_id}>
                          <NavLink
                            activeClassName={`active`}
                            className={
                              item.object_slug === 'rep-login' ? `alt` : ``
                            }
                            to={
                              item.object_slug === 'home'
                                ? `/`
                                : `/${item.object_slug}`
                            }
                          >
                            {item.title}
                          </NavLink>
                          {item.wordpress_children && (
                            <ChildMenu>
                              {item.wordpress_children.map(child => (
                                <SubMenuItem key={child.wordpress_id}>
                                  <SubMenuLink
                                    activeClassName={`active`}
                                    to={child.object_slug}
                                  >
                                    {child.title}
                                  </SubMenuLink>
                                  {child.wordpress_children && (
                                    <GrandChildMenu>
                                      {child.wordpress_children.map(
                                        grandchild => (
                                          <SubMenuItem
                                            key={grandchild.wordpress_id}
                                          >
                                            <SubMenuLink
                                              activeClassName={`active`}
                                              to={grandchild.object_slug}
                                            >
                                              {grandchild.title}
                                            </SubMenuLink>
                                          </SubMenuItem>
                                        )
                                      )}
                                    </GrandChildMenu>
                                  )}
                                </SubMenuItem>
                              ))}
                            </ChildMenu>
                          )}
                        </NavItem>
                      ))}
                    </NavMenu>
                  </Nav>
                </Col>
                <Overlay className="d-lg-none" menuIsOpen={menuIsOpen}>
                  <MenuToggle
                    menuIsOpen={menuIsOpen}
                    onClick={() => this.setState({ menuIsOpen: !menuIsOpen })}
                  >
                    {menuIsOpen ? <FaTimes /> : <FaBars />}
                  </MenuToggle>
                  <Nav role={`navigation`} aria-label={menu.name}>
                    <NavMenu>
                      {menu.items.map(item => (
                        <NavItem key={item.wordpress_id}>
                          <NavLink
                            activeClassName={`active`}
                            className={
                              item.object_slug === 'rep-login' ? `alt` : ``
                            }
                            to={
                              item.object_slug === 'home'
                                ? `/`
                                : `/${item.object_slug}`
                            }
                          >
                            {item.title}
                          </NavLink>
                        </NavItem>
                      ))}
                    </NavMenu>
                  </Nav>
                </Overlay>
              </>
            )}
          </Row>
        </Container>
      </Wrapper>
    )
  }
}
