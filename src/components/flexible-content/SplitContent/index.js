import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

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
    object-fit: cover !important; // or whatever
    object-position: 50% 50% !important; // or whatever
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

const Title = styled.h2``

const ButtonLink = styled(Link)`
  border: 3px solid #ffa200;
  background-color: transparent;
  color: white;
  display: inline-block;
  letter-spacing: 1px;
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.15s ease-in;
  &:hover,
  &:focus {
    background-color: #ffa200;
  }
`

const LeftLink = styled(ButtonLink)`
  border-color: #05c6c7;
  &:hover,
  &:focus {
    background-color: #05c6c7;
  }
`

const SplitContent = props => {
  return (
    <Row>
      <LeftSide>
        {props.acf.left_background_image && (
          <BGimage
            fluid={
              props.acf.left_background_image.localFile.childImageSharp.fluid
            }
          />
        )}
        <LeftContainer>
          <Title>{props.acf.left_title}</Title>
          <Content
            dangerouslySetInnerHTML={{ __html: props.acf.left_content }}
          />
          {props.acf.left_link && (
            <LeftLink
              to={props.acf.left_link.url}
              target={props.acf.left_link.target}
            >
              {props.acf.left_link.title}
            </LeftLink>
          )}
        </LeftContainer>
      </LeftSide>
      <RightSide>
        {props.acf.right_background_image && (
          <BGimage
            fluid={
              props.acf.right_background_image.localFile.childImageSharp.fluid
            }
          />
        )}
        <RightContainer>
          <Title>{props.acf.right_title}</Title>
          <Content
            dangerouslySetInnerHTML={{ __html: props.acf.right_content }}
          />
          {props.acf.right_link && (
            <ButtonLink
              to={props.acf.right_link.url}
              target={props.acf.right_link.target}
            >
              {props.acf.right_link.title}
            </ButtonLink>
          )}
        </RightContainer>
      </RightSide>
    </Row>
  )
}

export default SplitContent
