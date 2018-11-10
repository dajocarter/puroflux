import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import styledNormalize from 'styled-normalize'

import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './header'
import Footer from './footer'
import favicon from '../images/purofluxlogo.png'

const GlobalStyles = createGlobalStyle`
  ${styledNormalize}
`

const theme = {
  primary: '#05c6c7',
  secondary: '#ffa200',
  alt: '#000000',
  body: '#7F7F7F',
}

const Main = styled.main`
  font-family: 'Lato', sans-serif;
`

const Layout = ({ children }) => (
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
        <>
          <Helmet
            title={data.site.siteMetadata.title}
            link={[
              { rel: 'shortcut icon', type: 'image/png', href: `${favicon}` },
            ]}
            meta={[
              { name: 'description', content: 'Sample' },
              { name: 'keywords', content: 'sample, something' },
            ]}
          >
            <html lang="en" />
          </Helmet>
          <GlobalStyles />
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
