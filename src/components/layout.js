import React, { Fragment } from 'react'
import { node, string } from 'prop-types'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import styledNormalize from 'styled-normalize'

import 'bootstrap/dist/css/bootstrap.min.css'
import useSiteLayout from './useStaticQuery/siteLayout'
import Header from './header'
import Footer from './footer'
import Seo from './SEO'

const Layout = ({ children, pageTitle, pageSlug }) => {
  const { logo, mainMenu, pagesMenu, productsMenu } = useSiteLayout()
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Seo pageTitle={pageTitle} pageSlug={pageSlug} />
        <GlobalStyles />
        <Header
          logo={logo}
          siteTitle='Puroflux Corporation'
          menu={mainMenu}
        />
        <Main>{children}</Main>
        <Footer productsMenu={productsMenu} pagesMenu={pagesMenu} />
      </Fragment>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: node.isRequired,
  pageTitle: string.isRequired,
  pageSlug: string
}

export default Layout

const GlobalStyles = createGlobalStyle`
  ${styledNormalize}
  
  .modal-backdrop.show {
    opacity: 0.9 !important;
  }
`

const theme = {
  primary: '#09A198',
  secondary: '#ffa200',
  alt: '#000000',
  body: '#7F7F7F'
}

const Main = styled.main`
  font-family: 'Lato', sans-serif;
`
