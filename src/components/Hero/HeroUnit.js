import React from 'react'
import { node, bool } from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

const HeroUnit = ({ children, isHome }) => {
  const { homeHero, defaultHero } = useStaticQuery(
    graphql`
      query HeroUnitQuery {
        defaultHero: wordpressWpMedia(
          slug: { eq: "puroflux_home_hero_sample" }
        ) {
          localFile {
            childImageSharp {
              fluid(maxHeight: 450) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        homeHero: wordpressWpMedia(
          slug: { eq: "puroflux_home_hero_pf_4060" }
        ) {
          localFile {
            childImageSharp {
              fluid(maxHeight: 450) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    `
  )
  return (
    <Background isHome={isHome}>
      {isHome ? (
        homeHero && <HeroImg fluid={homeHero.localFile.childImageSharp.fluid} />
      ) : (
        defaultHero && <HeroImg fluid={defaultHero.localFile.childImageSharp.fluid} />
      )}
      <Content>{children}</Content>
    </Background>
  )
}

HeroUnit.propTypes = {
  children: node,
  isHome: bool
}

export default HeroUnit

const Background = styled.div`
  height: 450px;
  width: 100%;
  position: relative;
`

const HeroImg = styled(Img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  height: 450px;
  & > img {
    object-fit: cover !important;
    object-position: 50% 50% !important;
    font-family: 'object-fit: cover !important; object-position: 0% 0% !important;'; // needed for IE9+ polyfill
  }
`

const Content = styled.div`
  color: white;
  font-size: 1.25rem;
  letter-spacing: 1px;
  line-height: 38px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 700px;

  .content {
    margin-bottom: 2rem;
    text-align: center;

    h1 {
      font-size: 2rem;
    }

    .alignleft {
      float: left;
    }

    .alignright {
      float: right;
    }

    a {
      color: white;
      font-size: 1.5rem;

      &:hover {
        color: white;
      }
    }
  }
`
