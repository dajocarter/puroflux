import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

const Container = styled.header`
  background: black;
`
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`
const NavBrand = styled.span`
  margin: 0;
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

const Header = props => (
  <Container>
    <Nav role={`navigation`} aria-label={props.menu.name}>
      <NavBrand>
        <Link to="/" title={props.siteTitle}>
          <Img fixed={props.logo.localFile.childImageSharp.fixed} />
        </Link>
      </NavBrand>
      <NavMenu>
        {props.menu.items.map(item => (
          <NavItem key={item.wordpress_id}>
            <NavLink
              activeClassName={`active`}
              className={item.object_slug === 'rep-login' ? `alt` : ``}
              to={item.object_slug === 'home' ? `/` : `/${item.object_slug}`}
            >
              {item.title}
            </NavLink>
          </NavItem>
        ))}
      </NavMenu>
    </Nav>
  </Container>
)

export default Header
