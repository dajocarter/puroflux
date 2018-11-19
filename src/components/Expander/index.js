import React, { Component } from 'react'
import styled from 'styled-components'

import ExpanderItem from './item'

const Items = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`
export default class ExcerptExpander extends Component {
  constructor(props) {
    super(props)

    this.state = { openItem: null }

    this.handleOpening = this.handleOpening.bind(this)
  }

  handleOpening(index) {
    this.setState({ openItem: index })
  }

  render() {
    let items = [],
      addlItem = {}
    if (this.props.addlItem) {
      addlItem = { node: this.props.addlItem }
    }
    if (this.props.products) {
      items = Array.from(this.props.products)
      if (addlItem) items.push(addlItem)
    }
    return (
      <Items>
        {items.map(({ node }, i) => (
          <ExpanderItem
            key={node.id}
            idx={i}
            isOpen={this.state.openItem === i}
            handleOpening={this.handleOpening}
            node={node}
            {...this.props}
          />
        ))}
      </Items>
    )
  }
}
