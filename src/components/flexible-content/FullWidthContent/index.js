import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

const Row = styled.div`
  background-color: rgba(127, 127, 127, 0.1);
`

const Container = styled.div`
  margin: 0 auto;
  max-width: 480px;
  padding: 1.45rem 1.0875rem;
  text-align: center;
`

const BGimg = styled(Img)`
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
  font-size: 24px;
  letter-spacing: 1px;
`

const ButtonLink = styled(Link)`
  border: 3px solid #ffa200;
  background-color: transparent;
  color: black;
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
    color: white;
  }
`

const FullWidthContent = props => {
  return (
    <Row>
      <Container>
        {props.acf.background_image && (
          <BGimg
            fluid={props.acf.background_image.localFile.childImageSharp.fluid}
          />
        )}
        <Content dangerouslySetInnerHTML={{ __html: props.acf.content }} />
        {props.acf.link && (
          <ButtonLink to={props.acf.link.url} target={props.acf.link.target}>
            {props.acf.link.title}
          </ButtonLink>
        )}
      </Container>
    </Row>
  )
}

export default FullWidthContent
