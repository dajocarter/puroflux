import React, { Component } from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { Container, Row, Col } from 'react-bootstrap'
import { FaBars, FaTimes } from 'react-icons/fa'
import styled from 'styled-components'

const Wrapper = styled(Container)`
  background: black;
  position: relative;
`

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`
const NavBrand = styled.div`
  margin: 6px 0 0;

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

const NavItem = styled.li`
  flex: 0 0 auto;

  &:not(:last-child) {
    margin-right: 10px;
  }
`

const NavLink = styled(Link)`
  color: #fff;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.8rem;
  font-style: italic;
  text-decoration: none;
  text-transform: uppercase;

  &.alt {
    color: #ffa200; // orange
  }

  &:hover,
  &:focus,
  &.active {
    color: #05c6c7; // teal
  }
`

const MenuToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    color: ${props =>
      props.menuIsOpen ? props.theme.primary : props.theme.secondary};
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
    padding-left: 3rem;

    ul {
      flex-flow: column nowrap;
      align-items: flex-start;

      li {
        margin-bottom: 2.5rem;
      }

      a {
        font-size: 2rem;
        font-style: normal;
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
      <Wrapper fluid as="header">
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
      </Wrapper>
    )
  }
}
