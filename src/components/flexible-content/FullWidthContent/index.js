import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'

import Btn from '../../styled/button'

const FullWidthContent = ({ acf }) => {
  return (
    <Row>
      <Container>
        {acf.background_image && (
          <BGimg fluid={acf.background_image.localFile.childImageSharp.fluid} />
        )}
        <Content dangerouslySetInnerHTML={{ __html: acf.content }} />
        {acf.link && (
          <Btn
            secondary='true'
            to={`/${acf.link.url}/`}
            target={acf.link.target}
          >
            {acf.link.title}
          </Btn>
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
    object-fit: cover !important;
    object-position: 50% 50% !important;
    font-family: 'object-fit: cover !important; object-position: 0% 0% !important;'; // needed for IE9+ polyfill
  }
`

const Content = styled.div`
  font-size: 24px;
  letter-spacing: 1px;
`
