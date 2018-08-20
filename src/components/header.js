import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Container = styled.header`
  background: rebeccapurple;
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

const Header = ({ siteTitle }) => (
  <Container>
    <Nav>
      <NavBrand>
        <BrandLink to="/">{siteTitle}</BrandLink>
      </NavBrand>
    </Nav>
  </Container>
)

export default Header
