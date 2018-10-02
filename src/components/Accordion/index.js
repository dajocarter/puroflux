import React from 'react'
import styled from 'styled-components'
import AccordionItem from './item'

const Wrapper = styled.div`
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
`

const Accordion = props => (
  <Wrapper>
    {props.files.map(({ node }, i) => (
      <AccordionItem key={node.id} idx={i} {...props} node={node} />
    ))}
  </Wrapper>
)
export default Accordion
