import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
`

export default function withAccordion(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props)

      this.state = { openItem: 0 }

      this.handleOpening = this.handleOpening.bind(this)
    }

    handleOpening(index) {
      this.setState({ openItem: index })
    }

    render() {
      return (
        <Wrapper>
          <WrappedComponent
            openItem={this.state.openItem}
            handleOpening={this.handleOpening}
            {...this.props}
          />
        </Wrapper>
      )
    }
  }
}
