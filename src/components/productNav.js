import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'

const Nav = styled.nav`
  text-align: center;
`
const NavTitle = styled.h4`
  text-transform: uppercase;
`
const NavMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
const NavItem = styled.li``
const NavLink = styled(Link)`
  background-color: white;
  color: ${props => props.theme.primary};
  display: block;
  padding: 0.5rem 0.75rem;

  &:hover {
    background-color: ${props => props.theme.primary};
    color: white;
  }
`

const ProductNav = () => (
  <StaticQuery
    query={graphql`
      query {
        products: allWordpressWpProducts {
          edges {
            node {
              title
              slug
            }
          }
        }
      }
    `}
    render={({ products }) => (
      <Nav>
        <NavTitle>Products</NavTitle>
        <NavMenu>
          {products.edges.map(({ node }) => (
            <NavItem>
              <NavLink to={node.slug}>{node.title}</NavLink>
            </NavItem>
          ))}
        </NavMenu>
      </Nav>
    )}
  />
)

export default ProductNav
