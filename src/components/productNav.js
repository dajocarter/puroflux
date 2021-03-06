import React from 'react'
import { bool } from 'prop-types'
import { Link } from 'gatsby'
import styled from 'styled-components'
import useProducts from './useStaticQuery/products'

const ProductNav = ({ light }) => {
  const products = useProducts()
  return (
    <Nav>
      <NavTitle>Products</NavTitle>
      <NavMenu>
        {products.map(({ node }) => (
          <NavItem key={node.id}>
            <NavLink light={light} to={node.slug}>
              {node.title}
            </NavLink>
          </NavItem>
        ))}
      </NavMenu>
    </Nav>
  )
}

ProductNav.propTypes = {
  light: bool
}

export default ProductNav

const Nav = styled.nav`
  text-align: center;
`

const NavTitle = styled.h4`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 1rem;
  text-transform: uppercase;
`

const NavMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: stretch;
`

const NavItem = styled.li`
  margin-bottom: 0.5rem;
`

const NavLink = styled(Link)`
  background-color: transparent;
  border: ${({ light, theme }) =>
    `2px solid ${light ? `white` : theme.primary}`};
  color: ${({ light, theme }) => (light ? `white` : theme.body)};
  display: block;
  height: 100%;
  line-height: 1;
  font-size: ${({ light }) => (light ? `11px` : `1rem`)};
  padding: 0.5rem 0.75rem;
  transition: all 0.15s ease-in-out;
  text-transform: uppercase;

  &:hover {
    background-color: ${({ light, theme }) => (light ? `white` : theme.primary)};
    color: ${({ light, theme }) => (light ? theme.primary : `white`)};
    text-decoration: none;
  }
`
