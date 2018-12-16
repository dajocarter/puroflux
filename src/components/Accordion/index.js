import React, { Component } from 'react'
import { Collapse } from 'react-bootstrap'
import styled from 'styled-components'

import 'bootstrap/dist/css/bootstrap.css'

const AccordionContext = React.createContext()

export default class Accordion extends Component {
  constructor(props) {
    super(props)

    this.state = { openItem: 0 }

    this.handleOpening = this.handleOpening.bind(this)
  }

  handleOpening(index) {
    this.setState({ openItem: index })
  }

  render() {
    const openItem = this.state.openItem
    const { handleOpening } = this
    return (
      <AccordionContext.Provider
        value={{
          openItem,
          handleOpening,
        }}
      >
        <Wrapper>{this.props.children}</Wrapper>
      </AccordionContext.Provider>
    )
  }
}

export class AccordionTitle extends Component {
  static contextType = AccordionContext

  render() {
    const { accordionIndex, children } = this.props
    const { openItem, handleOpening } = this.context
    return (
      <Title
        role="button"
        onClick={() => handleOpening(accordionIndex)}
        aria-expanded={openItem === accordionIndex}
        aria-controls={`accordion--content-${accordionIndex}`}
      >
        {children}
      </Title>
    )
  }
}

export class AccordionContent extends Component {
  static contextType = AccordionContext

  render() {
    const { accordionIndex, children } = this.props
    const { openItem } = this.context
    return (
      <Content in={openItem === accordionIndex}>
        <div
          id={`accordion--content-${accordionIndex}`}
          className="accordion-content"
        >
          {children}
        </div>
      </Content>
    )
  }
}

const Wrapper = styled.div`
  border: 1px solid black;
`

const Title = styled.h5`
  background-color: ${props => (props['aria-expanded'] ? `black` : `white`)};
  color: ${props => (props['aria-expanded'] ? `white` : `black`)};
  cursor: pointer;
  text-transform: uppercase;
  margin: 0;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background-color: ${props =>
      props['aria-expanded'] ? `black` : `#f2f2f2`};
  }
`

const Content = styled(Collapse)`
  border-bottom: ${props => (props.in ? `1px solid black` : 0)};
  padding: 0.5rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: flex-start;

  > div {
    padding: 0.5rem;
  }

  span {
    &:first-of-type {
      color: #09a198;
      text-transform: uppercase;
    }
    + span {
      color: #999999;
    }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    a {
      color: #ffa200;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`
