import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Container = styled.header`
  background: black;
  margin-bottom: 1.45rem;
`
const Nav = styled.nav`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`
const NavBrand = styled.h1`
  margin: 0;
`
const BrandLink = styled(Link)`
  color: white;
  text-decoration: none;
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
`

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  &.active {
    color: #05c6c7;
  }
`

const Header = props => (
  <Container>
    <Nav role={`navigation`} aria-label={props.menu.name}>
      <NavBrand>
        <BrandLink to="/">{props.siteTitle}</BrandLink>
      </NavBrand>
      <NavMenu>
        {props.menu.items.map(item => (
          <NavItem key={item.wordpress_id}>
            <NavLink
              activeClassName={`active`}
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
