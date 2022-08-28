import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styled from 'styled-components'

import { StyledButtonLink } from './links'
import { WordPressMenu } from '../data'

export interface FooterProps {
  navs: {
    explore: WordPressMenu
    pages: WordPressMenu
  }
}

export default function Footer({ navs }: FooterProps) {
  const pagesMenuName = navs.pages.name
  const pagesMenuItems = navs.pages.items
  const exploreMenuName = navs.explore.name
  const exploreMenuItems = navs.explore.items

  return (
    <FooterWrapper>
      <CallToAction>
        <Container>
          <Row>
            <Col xs={12} md={6} lg={5}>
              <Headline>Ready to get started?</Headline>
            </Col>
            <Col xs={12} md={6} lg={7}>
              <Action>
                Call us at{' '}
                <PhoneNumber
                  href='tel:805-579-0216'
                  title='Dial (805) 579-0216'
                >
                  (805) 579-0216
                </PhoneNumber>{' '}
                or{' '}
                <Link href='/contact' passHref>
                  <CTAlink>Contact Us</CTAlink>
                </Link>
              </Action>
            </Col>
          </Row>
        </Container>
      </CallToAction>
      <Container>
        <MenusRow>
          <Column xs={12} sm={4} md={3}>
            <ColumnTitle>{pagesMenuName}</ColumnTitle>
            <Menu>
              {pagesMenuItems.map((item, index) => (
                <MenuItem key={index}>
                  <Link href={`/${item.object_slug}`} passHref>
                    <MenuLink>{item.title}</MenuLink>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Column>
          <Column xs={12} sm={4} md={{ span: 3, offset: 1 }}>
            <ColumnTitle>{exploreMenuName}</ColumnTitle>
            <Menu>
              {exploreMenuItems.map((item, index) => (
                <MenuItem key={index}>
                  <Link href={`/${item.object_slug}`} passHref>
                    <MenuLink
                      className={item.object_slug === 'rep-login' ? `alt` : ``}
                    >
                      {item.title}
                    </MenuLink>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Column>
          <SignUpColumn xs={12} sm={4} md={5}>
            <Row>
              <Col sm={12} md={6} lg={7} xl={8}>
                <ColumnTitle>Sign up for our newsletter</ColumnTitle>
              </Col>
              <Col sm={12} md={6} lg={5} xl={4}>
                <Link href='/newsletter' passHref>
                  <SignUpLink>Sign up</SignUpLink>
                </Link>
              </Col>
            </Row>
          </SignUpColumn>
        </MenusRow>
      </Container>
      <Copyright>
        <p>&copy; Copyright 2018 - PUROFLUX. All rights reserved.</p>
      </Copyright>
    </FooterWrapper>
  )
}

const FooterWrapper = styled.footer`
  background: black;
  color: white;
  font-family: 'Lato', sans-serif;
`

const CallToAction = styled.div`
  background: ${(props) => props.theme.secondary};
  border-top: 1px solid white;
  padding: 0.5rem 0;
  text-transform: uppercase;
`

const Headline = styled.h2`
  color: black;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 32px 0;
  text-align: left;

  @media (max-width: 767px) {
    text-align: center;
  }

  @media (min-width: 992px) {
    margin: 20px 0;
  }
`

const Action = styled.p`
  color: white;
  margin-bottom: 0;
  text-align: right;

  @media (max-width: 767px) {
    text-align: center;
  }
`

const PhoneNumber = styled.a`
  color: black;
  font-weight: bold;
  text-decoration: none;
  padding: 0 0.5rem;

  &:hover {
    color: black;
  }
`

const CTAlink = styled(StyledButtonLink)`
  background-color: black;
  color: white;
  margin: 0.5rem 0 0.5rem 0.5rem;

  &:hover,
  &:focus {
    background-color: white;
    border-color: white;
    color: black;
  }

  @media (min-width: 768px) and (max-width: 840px) {
    margin-bottom: 0;
  }

  @media (max-width: 767px) {
    margin-bottom: 25px;
  }
`

const MenusRow = styled(Row)`
  margin-top: 2rem;
`

const Column = styled(Col)`
  text-align: left;

  @media (max-width: 575px) {
    text-align: center;
  }
`

const SignUpColumn = styled(Column)`
  @media (min-width: 576px) {
    text-align: right;
  }
`

const ColumnTitle = styled.h4`
  color: white;
  text-transform: uppercase;
  font-size: 18px;
`

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;

  @media (max-width: 575px) {
    align-items: center;
  }
`

const MenuItem = styled.li`
  flex: 0 0 auto;
  padding: 0.5rem 0 0;
`

const MenuLink = styled.a`
  color: ${(props) => props.theme.primary};
  font-size: 14px;
  letter-spacing: 1px;
  text-decoration: none;
  text-transform: uppercase;

  &.alt {
    color: ${(props) => props.theme.secondary};
  }

  &:hover,
  &:focus {
    color: ${(props) => props.theme.primary};
    text-decoration: underline;
    text-decoration-color: ${(props) => props.theme.secondary};
  }
`

const SignUpLink = styled.a`
  background-color: ${(props) => props.theme.secondary};
  border: 3px solid ${(props) => props.theme.secondary};
  color: white;
  display: inline-block;
  letter-spacing: 1px;
  max-width: 100%;
  padding: 0.5rem 1.25rem;
  text-decoration: none;
  text-transform: uppercase;

  &:hover,
  &:focus {
    background-color: white;
    text-decoration: none;
    border-color: white;
    color: black;
  }
`

const Copyright = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-end;
  padding: 1rem 2rem;
  letter-spacing: 2px;
  font-size: 11px;

  @media (max-width: 537px) {
    justify-content: center;
  }

  @media (min-width: 538px) {
    p {
      margin-bottom: 0;
    }
  }
`
