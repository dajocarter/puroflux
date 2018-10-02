import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const FooterWrapper = styled.footer`
  background: black;
  color: white;
  font-family: 'Lato', sans-serif;
`

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
`

const CallToAction = styled(Row)`
  background: #ffa200;
  border-top: 1px solid white;
  text-transform: uppercase;
`

const CTAcontainer = styled(Container)`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
  text-align: center;
  width: 100%;

  @media (max-width: 767px) {
    flex-flow: column nowrap;
    padding: 16px 0 20px 0;
  }
`

const Headline = styled.h2`
  color: black;
`

const Action = styled.p`
  color: white;
`

const PhoneNumber = styled.a`
  color: black;
  font-weight: bold;
  text-decoration: none;
  padding: 0 0.5rem;
`

const ButtonLink = styled(Link)`
  border: 3px solid #ffa200;
  background-color: transparent;
  color: black;
  display: inline-block;
  letter-spacing: 1px;
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.15s ease-in;
  &:hover,
  &:focus {
    background-color: #ffa200;
    color: white;
  }
`

const CTAlink = styled(ButtonLink)`
  background-color: black;
  color: white;
  margin: 0.5rem 0.5rem 0;

  &:hover,
  &:focus {
    background-color: white;
    color: black;
  }
`

const Column = styled.div`
  flex: 0 0 auto;
  width: 100%;
  text-align: center;
  @media (min-width: 768px) {
    width: 30%;
    text-align: left;
  }
`

const ProductsColumn = styled(Column)``

const PagesColumn = styled(Column)``

const SignUpColumn = styled(Column)``

const ColumnTitle = styled.h4`
  color: white;
  text-transform: uppercase;
`

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    align-items: flex-start;
  }
`

const MenuItem = styled.li`
  flex: 0 0 auto;
  padding: 0.5rem 0;
`

const MenuLink = styled(Link)`
  color: #05c6c7;
  letter-spacing: 1px;
  text-decoration: none;
  text-transform: uppercase;

  &:hover,
  &:focus {
    text-decoration: underline;
    text-decoration-color: #ffa200;
  }
`

const SignUpLink = styled(ButtonLink)`
  background-color: #ffa200;
  color: white;
  &:hover,
  &:focus {
    background-color: white;
    border-color: white;
    color: black;
  }
`

const Copyright = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;

  @media (max-width: 479px) {
    justify-content: center;
  }
`

const Footer = props => {
  return (
    <FooterWrapper>
      <CallToAction>
        <CTAcontainer>
          <Headline>Ready to get started?</Headline>
          <Action>
            Call us at{' '}
            <PhoneNumber href="tel:805-579-0216" title="Dial (805) 579-0216">
              (805) 579-0216
            </PhoneNumber>{' '}
            or <CTAlink to="/contact">Contact Us</CTAlink>
          </Action>
        </CTAcontainer>
      </CallToAction>
      <Container>
        <Row>
          <ProductsColumn>
            <ColumnTitle>{props.productsMenu.name}</ColumnTitle>
            <Menu>
              {props.productsMenu.items.map((item, index) => (
                <MenuItem key={index}>
                  <MenuLink to={`/${item.object_slug}`}>{item.title}</MenuLink>
                </MenuItem>
              ))}
            </Menu>
          </ProductsColumn>
          <PagesColumn>
            <ColumnTitle>{props.pagesMenu.name}</ColumnTitle>
            <Menu>
              {props.pagesMenu.items.map((item, index) => (
                <MenuItem key={index}>
                  <MenuLink to={`/${item.object_slug}`}>{item.title}</MenuLink>
                </MenuItem>
              ))}
            </Menu>
          </PagesColumn>
          <SignUpColumn>
            <ColumnTitle>Sign up for our newsletter</ColumnTitle>
            <SignUpLink to={`#`}>Sign Up</SignUpLink>
          </SignUpColumn>
        </Row>
      </Container>
      <Copyright>
        <p>&copy; 2017 - PUROFLUX. All rights reserved.</p>
        <a href="https://www.netlify.com">
          <img
            alt="Deployed by Netlify"
            src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"
          />
        </a>
      </Copyright>
    </FooterWrapper>
  )
}

export default Footer
