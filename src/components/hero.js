import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import Btn from './styled/button'

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
  max-width: 480px;

  .content {
    margin-bottom: 2rem;

    h1 {
      font-size: 2rem;
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

const Links = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: ${props => (props.single ? `center` : `space-between`)};
  align-items: center;
`

const Button = styled(Btn)`
  color: white;
  margin: 0.5rem;
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
              fluid(maxHeight: 450) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        homeHero: wordpressWpMedia(slug: { eq: "puroflux_home_hero_pf_4060" }) {
          localFile {
            childImageSharp {
              fluid(maxHeight: 450) {
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
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: props.html }}
          />
          {props.links && (
            <Links single={props.links.length > 1 ? `false` : `true`}>
              {props.links.map((link, i) => (
                <Button
                  key={i}
                  to={`/${link.button_link.url}/`}
                  target={link.button_link.target}
                  primary={i % 2 === 0 ? `true` : `false`}
                  secondary={i % 2 === 1 ? `true` : `false`}
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
