import React from 'react'
import { Link } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

const FooterWrapper = styled.footer`
  background: black;
  color: white;
  font-family: 'Lato', sans-serif;
`

const CallToAction = styled(Container)`
  background: #ffa200;
  border-top: 1px solid white;
  padding: 0.5rem 0;
  text-transform: uppercase;
`

const CTArow = styled(Row)`
  text-align: center;
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

const Column = styled(Col)`
  text-align: center;
  @media (min-width: 768px) {
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
      <CallToAction fluid>
        <CTArow>
          <Col xs={12} md={5}>
            <Headline>Ready to get started?</Headline>
          </Col>
          <Col xs={12} md={7}>
            <Action>
              Call us at{' '}
              <PhoneNumber href="tel:805-579-0216" title="Dial (805) 579-0216">
                (805) 579-0216
              </PhoneNumber>{' '}
              or <CTAlink to="/contact">Contact Us</CTAlink>
            </Action>
          </Col>
        </CTArow>
      </CallToAction>
      <Container fluid>
        <Row>
          <ProductsColumn xs={12} sm={4}>
            <ColumnTitle>{props.productsMenu.name}</ColumnTitle>
            <Menu>
              {props.productsMenu.items.map((item, index) => (
                <MenuItem key={index}>
                  <MenuLink to={`/${item.object_slug}`}>{item.title}</MenuLink>
                </MenuItem>
              ))}
            </Menu>
          </ProductsColumn>
          <PagesColumn xs={12} sm={4}>
            <ColumnTitle>{props.pagesMenu.name}</ColumnTitle>
            <Menu>
              {props.pagesMenu.items.map((item, index) => (
                <MenuItem key={index}>
                  <MenuLink to={`/${item.object_slug}`}>{item.title}</MenuLink>
                </MenuItem>
              ))}
            </Menu>
          </PagesColumn>
          <SignUpColumn xs={12} sm={4}>
            <ColumnTitle>Sign up for our newsletter</ColumnTitle>
            <SignUpLink to={`#`}>Sign Up</SignUpLink>
          </SignUpColumn>
        </Row>
      </Container>
      <Copyright>
        <p>&copy; Copyright 2018 - PUROFLUX. All rights reserved.</p>
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
