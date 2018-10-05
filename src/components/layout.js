import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import styled, { injectGlobal, ThemeProvider } from 'styled-components'
import styledNormalize from 'styled-normalize'

import Header from './header'
import Footer from './footer'

injectGlobal`
  ${styledNormalize}
`

const theme = {
  primary: '#ffa200',
  secondary: '#05c6c7',
  alt: '#000000',
}

const Main = styled.main`
  font-family: 'Lato', sans-serif;
`

const Layout = ({ children, data }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
        logo: wordpressWpMedia(slug: { eq: "purofluxlogo_white_2x" }) {
          localFile {
            childImageSharp {
              fixed(width: 267, height: 56) {
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
        <>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: 'Sample' },
              { name: 'keywords', content: 'sample, something' },
            ]}
          >
            <html lang="en" />
          </Helmet>
          <Header
            logo={data.logo}
            siteTitle={data.site.siteMetadata.title}
            menu={data.mainMenu}
          />
          <Main>{children}</Main>
          <Footer productsMenu={data.productsMenu} pagesMenu={data.pagesMenu} />
        </>
      </ThemeProvider>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
