import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'

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
  letter-spacing: 1px;
  line-height: 38px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
`

const Hero = props => {
  return (
    <Background isHome={props.isHome}>
      <HeroImg fluid={props.isHome ? props.homeHero : props.defHero} />
      <Content dangerouslySetInnerHTML={{ __html: props.html }} />
    </Background>
  )
}

export default Hero
