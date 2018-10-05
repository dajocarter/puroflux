import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import Button from './styled/button'

const Background = styled.div`
  height: 420px;
  width: 100%;
  position: relative;
`

const HeroImg = styled(Img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  height: 420px;
  & > img {
    object-fit: cover !important; // or whatever
    object-position: 50% 50% !important; // or whatever
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
  width: 80%;

  a {
    color: white;
  }
`

const Links = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`

const Hero = props => (
  <StaticQuery
    query={graphql`
      query HeroQuery {
        defaultHero: wordpressWpMedia(
          slug: { eq: "puroflux_home_hero_sample" }
        ) {
          localFile {
            childImageSharp {
              fluid(maxHeight: 420) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        homeHero: wordpressWpMedia(slug: { eq: "puroflux_home_hero_pf_4060" }) {
          localFile {
            childImageSharp {
              fluid(maxHeight: 420) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Background isHome={props.isHome}>
        {data.homeHero &&
          data.defaultHero && (
            <HeroImg
              fluid={
                props.isHome
                  ? data.homeHero.localFile.childImageSharp.fluid
                  : data.defaultHero.localFile.childImageSharp.fluid
              }
            />
          )}
        <Content>
          <div dangerouslySetInnerHTML={{ __html: props.html }} />
          {props.links && (
            <Links>
              {props.links.map((link, i) => (
                <Button
                  key={i}
                  to={link.button_link.url}
                  target={link.button_link.target}
                  primary={i % 2 === 0}
                  secondary={i % 2 === 1}
                >
                  {link.button_link.title}
                </Button>
              ))}
            </Links>
          )}
        </Content>
      </Background>
    )}
  />
)

export default Hero
