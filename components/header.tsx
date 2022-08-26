import React, { useState } from 'react'
import { string, object, shape, arrayOf, number, InferProps } from 'prop-types'
import Link from 'next/link'
import { ActiveLink } from './links'
import Image from 'next/image'
import { Container, Row, Col } from 'react-bootstrap'
import { FaBars, FaTimes } from 'react-icons/fa'
import styled from 'styled-components'

export default function Header({
  logo,
  siteTitle,
  navs
}: InferProps<typeof Header.propTypes>) {
  const [menuIsOpen, setMenu] = useState(false)

  return (
    <Wrapper>
      <Container>
        <Row>
          {logo && (
            <Col xs={9} xl={3}>
              <NavBrand>
                <Link href='/'>
                  <a>
                    <Image
                      alt={siteTitle}
                      src={logo.media_details.sizes.medium.source_url}
                      height={42}
                      width={200}
                      layout='fixed'
                    />
                  </a>
                </Link>
              </NavBrand>
            </Col>
          )}
          {navs && (
            <>
              <Col className='d-none d-xl-block' xl={9}>
                <Nav role='navigation' aria-label={navs.desktop.name}>
                  <NavMenu>
                    {navs.desktop.items.map((item) => (
                      <NavItem key={item.object_id}>
                        <ActiveLink
                          href={
                            item.object_slug === 'home'
                              ? `/`
                              : `/${item.object_slug}/`
                          }
                          passHref
                          activeClassName='active'
                        >
                          <NavLink
                            className={
                              item.object_slug === 'rep-login' ? `alt` : ``
                            }
                          >
                            {item.title}
                          </NavLink>
                        </ActiveLink>
                        {item.children && (
                          <ChildMenu>
                            {item.children.map((child) => (
                              <NavItem key={child.object_id}>
                                <ActiveLink
                                  href={`/${child.object_slug}/`}
                                  passHref
                                  activeClassName='active'
                                >
                                  <NavLink>{child.title}</NavLink>
                                </ActiveLink>
                                {child.children && (
                                  <GrandChildMenu>
                                    {child.children.map((grandchild) => (
                                      <NavItem key={grandchild.object_id}>
                                        <ActiveLink
                                          href={`/${grandchild.object_slug}/`}
                                          passHref
                                          activeClassName='active'
                                        >
                                          <NavLink>{grandchild.title}</NavLink>
                                        </ActiveLink>
                                      </NavItem>
                                    ))}
                                  </GrandChildMenu>
                                )}
                              </NavItem>
                            ))}
                          </ChildMenu>
                        )}
                      </NavItem>
                    ))}
                  </NavMenu>
                </Nav>
              </Col>
              <Overlay className='d-xl-none' menuIsOpen={menuIsOpen}>
                <MenuToggle
                  menuIsOpen={menuIsOpen}
                  onClick={() => setMenu((menuIsOpen) => !menuIsOpen)}
                >
                  {menuIsOpen ? <FaTimes /> : <FaBars />}
                </MenuToggle>
                <Nav role={`navigation`} aria-label={navs.mobile.name}>
                  <NavMenu>
                    {navs.mobile.items.map((item) => (
                      <NavItem key={item.object_id}>
                        <ActiveLink
                          href={
                            item.object_slug === 'home'
                              ? `/`
                              : `/${item.object_slug}/`
                          }
                          passHref
                          activeClassName='active'
                        >
                          <NavLink
                            className={
                              item.object_slug === 'rep-login' ? `alt` : ``
                            }
                          >
                            {item.title}
                          </NavLink>
                        </ActiveLink>
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

Header.propTypes = {
  logo: object,
  siteTitle: string,
  menu: shape({
    name: string,
    items: arrayOf(
      shape({
        object_id: number,
        object_slug: string,
        title: string,
        wordpress_children: arrayOf(
          shape({
            object_id: number,
            object_slug: string,
            title: string,
            wordpress_children: arrayOf(
              shape({
                object_id: number,
                object_slug: string,
                title: string
              })
            )
          })
        )
      })
    )
  })
}

const Wrapper = styled.header`
  background: black;

  .container {
    position: relative;
  }
`

const Nav = styled.nav.attrs((props) => ({
  'aria-label': props['aria-label']
}))`
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
  border-top: ${({ theme }) => `4px solid ${theme.primary}`};
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
    color: ${({ theme }) => theme.primary};
  }
`

const GrandChildMenu = styled(SubMenu)`
  background-color: ${({ theme }) => theme.primary};
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

const NavLink = styled.a`
  color: white;
  display: block;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.8rem;
  font-style: italic;
  text-decoration: none;
  text-transform: uppercase;
  padding: 24.5px 0;

  &.alt {
    color: ${({ theme }) => theme.secondary};
  }

  &:hover,
  &:focus,
  &.active {
    color: ${({ theme }) => theme.primary};
  }
`

const MenuToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    color: ${({ menuIsOpen, theme }) =>
      menuIsOpen ? theme.secondary : theme.primary};
    font-size: 2rem;
    cursor: pointer;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
`

const Overlay = styled.div`
  position: ${({ menuIsOpen }) => (menuIsOpen ? `fixed` : `absolute`)};
  top: 0;
  right: 0;
  width: ${({ menuIsOpen }) => (menuIsOpen ? `100vw` : `0px`)};
  height: ${({ menuIsOpen }) => (menuIsOpen ? `100vh` : `0px`)};
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 10;
  transition: all 0.15s ease-in-out;

  ${Nav} {
    display: ${({ menuIsOpen }) => (menuIsOpen ? `flex` : `none`)};
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
