import React from 'react'
import { node, bool, object } from 'prop-types'
import Img from 'gatsby-image'
import styled from 'styled-components'

import useHomeHero from '../useStaticQuery/homeHero'
import useDefaultHero from '../useStaticQuery/defaultHero'
import usePFIndustrialHero from '../useStaticQuery/pfIndustrialHero'

export const HeroUnitComponent = ({ children, isHome, isPFIndustrial, homeHero, defaultHero, pfIndustrialHero }) => (
  <Background isHome={isHome}>
    {isHome ? (
      homeHero && <HeroImg fit='cover' fluid={homeHero.localFile.childImageSharp.fluid} />
    ) : isPFIndustrial ? (
      pfIndustrialHero && <HeroImg fit='contain' fluid={pfIndustrialHero.localFile.childImageSharp.fluid} />
    ) : (
      defaultHero && <HeroImg fit='cover' fluid={defaultHero.localFile.childImageSharp.fluid} />
    )}
    <Content>{children}</Content>
  </Background>
)

HeroUnitComponent.propTypes = {
  children: node,
  isHome: bool,
  homeHero: object,
  defaultHero: object
}

const HeroUnit = props => {
  const homeHero = useHomeHero()
  const defaultHero = useDefaultHero()
  const pfIndustrialHero = usePFIndustrialHero()

  return (
    <HeroUnitComponent
      {...props}
      homeHero={homeHero}
      defaultHero={defaultHero}
      pfIndustrialHero={pfIndustrialHero}
    />
  )
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
  & img {
    object-fit: ${({ fit }) => fit} !important;
    object-position: 50% 50% !important;
    font-family: 'object-fit: ${({ fit }) => fit} !important; object-position: 0% 0% !important;'; // needed for IE9+ polyfill
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
