import React from 'react'
import { Collapse } from 'react-bootstrap'
import Img from 'gatsby-image'
import styled from 'styled-components'

import Btn from '../styled/button'
import 'bootstrap/dist/css/bootstrap.css'

const Item = styled.div`
  flex-basis: 30%;

  @media (max-width: 768px) {
    flex-basis: 45%;
  }

  @media (max-width: 480px) {
    flex-basis: 100%;
  }
`
const BtnImg = styled(Img)`
  cursor: pointer;
`
const Excerpt = styled(Collapse)``
const ItemTitle = styled.h2``
const ItemContent = styled.div``

const ExpanderItem = props => (
  <Item>
    <div
      role="button"
      onClick={() => props.handleOpening(props.idx)}
      aria-expanded={props.isOpen}
      aria-controls={`expander--content-${props.idx}`}
    >
      <BtnImg
        fluid={props.node.featured_media.localFile.childImageSharp.fluid}
      />
    </div>
    <Excerpt in={props.isOpen}>
      <div id={`expander--content-${props.idx}`}>
        <Img
          fluid={props.node.featured_media.localFile.childImageSharp.fluid}
        />
        <ItemTitle>{props.node.title}</ItemTitle>
        <ItemContent
          dangerouslySetInnerHTML={{
            __html: props.node.excerpt || props.node.acf.excerpt,
          }}
        />
        <Btn to={props.node.slug}>Learn More</Btn>
      </div>
    </Excerpt>
  </Item>
)

export default ExpanderItem
