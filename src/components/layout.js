import React, { Fragment } from 'react'
import { node, string } from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import styledNormalize from 'styled-normalize'

import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './header'
import Footer from './footer'
import Seo from './SEO'

const Layout = ({ children, pageTitle, pageSlug }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        settings: wordpressWpSettings {
          title
        }
        logo: wordpressWpMedia(slug: { eq: "purofluxlogo_white_2x" }) {
          localFile {
            childImageSharp {
              fixed(width: 200, height: 42) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
        }
        mainMenu: wordpressWpApiMenusMenusItems(slug: { eq: "main-menu" }) {
          wordpress_id
          name
          slug
          count
          items {
            wordpress_id
            order
            wordpress_parent
            title
            attr
            target
            classes
            object_id
            object_slug
            wordpress_children {
              wordpress_id
              order
              wordpress_parent
              title
              attr
              target
              classes
              object_id
              object_slug
              wordpress_children {
                wordpress_id
                order
                wordpress_parent
                title
                attr
                target
                classes
                object_id
                object_slug
              }
            }
          }
        }
        pagesMenu: wordpressWpApiMenusMenusItems(slug: { eq: "explore" }) {
          wordpress_id
          name
          slug
          count
          items {
            wordpress_id
            order
            wordpress_parent
            title
            attr
            target
            classes
            object_id
            object_slug
            wordpress_children {
              wordpress_id
              order
              wordpress_parent
              title
              attr
              target
              classes
              object_id
              object_slug
            }
          }
        }
        productsMenu: wordpressWpApiMenusMenusItems(slug: { eq: "products" }) {
          wordpress_id
          name
          slug
          count
          items {
            wordpress_id
            order
            wordpress_parent
            title
            attr
            target
            classes
            object_id
            object_slug
            wordpress_children {
              wordpress_id
              order
              wordpress_parent
              title
              attr
              target
              classes
              object_id
              object_slug
            }
          }
        }
      }
    `}
    render={data => (
      <ThemeProvider theme={theme}>
        <Fragment>
          <Seo pageTitle={pageTitle} pageSlug={pageSlug} />
          <GlobalStyles />
          <Header
            logo={data.logo}
            siteTitle={data.settings.title}
            menu={data.mainMenu}
          />
          <Main>{children}</Main>
          <Footer productsMenu={data.productsMenu} pagesMenu={data.pagesMenu} />
        </Fragment>
      </ThemeProvider>
    )}
  />
)

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
