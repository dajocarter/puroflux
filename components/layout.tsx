import styled from 'styled-components'
import Header from './header'
import Footer from './footer'

export default function Layout(props) {
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
