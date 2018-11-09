import React, {Component} from 'react'
import styled from 'styled-components'
import AccordionItem from './item'

const Wrapper = styled.div`
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
`

export default class Accordion extends Component {
	constructor(props) {
		super(props)

		this.state = {openItem: 0}

		this.handleOpening = this.handleOpening.bind(this)
	}

	handleOpening(index) {
		this.setState({openItem: index})
	}

	render() {
		return (
			<Wrapper>
				{this.props.files.map(({ node }, i) => (
					<AccordionItem key={node.id} idx={i} isOpen={this.state.openItem === i} handleOpening={this.handleOpening} node={node} {...this.props} />
				))}
			</Wrapper>
		)
	}
}
