import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

const Background = styled.div`
  height: 420px;
  width: 100%;
  position: relative;
  background-color: #097e72;
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
`

const Links = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`

const ButtonLink = styled(Link)`
  border-width: 3px;
  border-style: solid;
  background-color: transparent;
  color: white;
  display: inline-block;
  letter-spacing: 1px;
  margin: 1rem;
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.15s ease-in;

  &:nth-child(odd) {
    border-color: #ffa200;
    &:hover,
    &:focus {
      background-color: #ffa200;
    }
  }

  &:nth-child(even) {
    border-color: #05c6c7;
    &:hover,
    &:focus {
      background-color: #05c6c7;
    }
  }
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
        <HeroImg
          fluid={
            props.isHome
              ? data.homeHero.localFile.childImageSharp.fluid
              : data.defaultHero.localFile.childImageSharp.fluid
          }
        />
        <Content>
          <div dangerouslySetInnerHTML={{ __html: props.html }} />
          {props.links && (
            <Links>
              {props.links.map((link, i) => (
                <ButtonLink
                  key={i}
                  to={link.button_link.url}
                  target={link.button_link.target}
                >
                  {link.button_link.title}
                </ButtonLink>
              ))}
            </Links>
          )}
        </Content>
      </Background>
    )}
  />
)

export default Hero
