import styled from 'styled-components'
import Header, { HeaderProps } from './header'
import Footer, { FooterProps } from './footer'
import { ReactNode } from 'react'

export default function Layout(props: {
  header: HeaderProps
  children: ReactNode
  footer: FooterProps
}) {
  return (
    <>
      <Header {...props.header} />
      <Main>{props.children}</Main>
      <Footer {...props.footer} />
    </>
  )
}

const Main = styled.main`
  font-family: 'Lato', sans-serif;
`
