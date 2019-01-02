import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'

import Btn from '../../styled/button'

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
          <ButtonLink
            secondary="true"
            to={`/${props.acf.link.url}/`}
            target={props.acf.link.target}
          >
            {props.acf.link.title}
          </ButtonLink>
        )}
      </Container>
    </Row>
  )
}

export default FullWidthContent

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

const ButtonLink = styled(Btn)``
