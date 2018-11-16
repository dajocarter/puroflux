import React, { Component } from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'

import Btn from './styled/button'

const Items = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`
const Item = styled.div``
const Excerpt = styled.div`
  display: none;
`
const ItemTitle = styled.h2``
const ItemContent = styled.div``

export default class ExcerptExpander extends Component {
  render() {
    const { items } = this.props

    return (
      <Items>
        {items.map(({ node }) => (
          <Item key={node.slug}>
            <Img fluid={node.featured_media.localFile.childImageSharp.fluid} />
            <Excerpt>
              <Img
                fluid={node.featured_media.localFile.childImageSharp.fluid}
              />
              <ItemTitle>{node.title}</ItemTitle>
              <ItemContent
                dangerouslySetInnerHTML={{ __html: node.acf.excerpt }}
              />
              <Btn to={node.slug}>Learn More</Btn>
            </Excerpt>
          </Item>
        ))}
      </Items>
    )
  }
}
