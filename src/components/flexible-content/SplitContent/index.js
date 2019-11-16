import React from 'react'
import { shape, string, object } from 'prop-types'
import Img from 'gatsby-image'
import styled from 'styled-components'

import Btn from '../../styled/button'

const SplitContent = ({ acf }) => (
  <Row>
    <LeftSide>
      {acf.left_background_image && (
        <BGimage
          fluid={
            acf.left_background_image.localFile.childImageSharp.fluid
          }
        />
      )}
      <LeftContainer>
        <h2>{acf.left_title}</h2>
        <Content
          dangerouslySetInnerHTML={{ __html: acf.left_content }}
        />
        {acf.left_link && (
          <ButtonLink
            primary='true'
            to={`/${acf.left_link.url}/`}
            target={acf.left_link.target}
          >
            {acf.left_link.title}
          </ButtonLink>
        )}
      </LeftContainer>
    </LeftSide>
    <RightSide>
      {acf.right_background_image && (
        <BGimage
          fluid={
            acf.right_background_image.localFile.childImageSharp.fluid
          }
        />
      )}
      <RightContainer>
        <h2>{acf.right_title}</h2>
        <Content
          dangerouslySetInnerHTML={{ __html: acf.right_content }}
        />
        {acf.right_link && (
          <ButtonLink
            secondary='true'
            to={`/${acf.right_link.url}/`}
            target={acf.right_link.target}
          >
            {acf.right_link.title}
          </ButtonLink>
        )}
      </RightContainer>
    </RightSide>
  </Row>
)

SplitContent.propTypes = {
  acf: shape({
    left_background_image: object,
    right_background_image: object,
    left_title: string,
    right_title: string,
    left_content: string,
    right_content: string,
    left_link: shape({
      url: string,
      target: string,
      title: string
    }),
    right_link: shape({
      url: string,
      target: string,
      title: string
    })
  })
}

export default SplitContent

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`

const Side = styled.div`
  flex: 0 0 auto;
  width: 100%;
  position: relative;
  height: 420px;

  @media (min-width: 768px) {
    width: 50%;
  }
`

const LeftSide = styled(Side)`
  text-align: right;
`

const RightSide = styled(Side)`
  text-align: left;
`

const BGimage = styled(Img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  height: 420px;
  & > img {
    object-fit: cover !important;
    object-position: 50% 50% !important;
    font-family: 'object-fit: cover !important; object-position: 0% 0% !important;'; // needed for IE9+ polyfill
  }
`

const Container = styled.div`
  margin: 0 auto;
  max-width: 480px;
  padding: 1.45rem 1.0875rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  width: 80%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`

const Content = styled.div`
  text-align: center;
  margin-bottom: 1.25rem;
`

const LeftContainer = styled(Container)`
  @media (min-width: 768px) {
    align-items: flex-end;
    & ${Content} {
      text-align: right;
    }
  }
`

const RightContainer = styled(Container)`
  @media (min-width: 768px) {
    align-items: flex-start;
    & ${Content} {
      text-align: left;
    }
  }
`

const ButtonLink = styled(Btn)`
  color: white;
`
