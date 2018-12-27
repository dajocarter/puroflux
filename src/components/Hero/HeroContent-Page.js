import React, { Fragment, Component } from 'react'
import { Modal } from 'react-bootstrap'
import styled from 'styled-components'

import Btn from '../styled/button'
import Request3dForm from '../forms/Request3dForm'

const Buttons = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: ${props => (props.single ? `center` : `space-between`)};
  align-items: center;
`

const Button = styled(Btn)`
  color: white;
  margin: 0.5rem;
`

const HeroContentPage = props => (
  <Fragment>
    {props.html && (
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: props.html }}
      />
    )}
    {props.buttons && (
      <Buttons single={props.buttons.length > 1 ? `false` : `true`}>
        {props.buttons.map((link, i) => {
          return link.button_link.target ? (
            <Button
              key={i}
              as="a"
              href={link.button_link.url}
              target={link.button_link.target}
              rel="noopener noreferrer"
              primary={i % 2 === 0 ? `true` : `false`}
              secondary={i % 2 === 1 ? `true` : `false`}
            >
              {link.button_link.title}
            </Button>
          ) : link.button_link.url === '#3Dform' ? (
            <ModalButton
              key={i}
              primary={i % 2 === 0 ? `true` : `false`}
              secondary={i % 2 === 1 ? `true` : `false`}
            />
          ) : (
            <Button
              key={i}
              to={`/${link.button_link.url}/`}
              primary={i % 2 === 0 ? `true` : `false`}
              secondary={i % 2 === 1 ? `true` : `false`}
            >
              {link.button_link.title}
            </Button>
          )
        })}
      </Buttons>
    )}
  </Fragment>
)

export default HeroContentPage

class ModalButton extends Component {
  constructor(props, context) {
    super(props, context)

    this.toggleForm = this.toggleForm.bind(this)

    this.state = {
      showForm: false,
    }
  }

  toggleForm() {
    this.setState(prevState => ({ showForm: !prevState.showForm }))
  }

  render() {
    const { primary, secondary } = this.props
    const { showForm } = this.state

    return (
      <Fragment>
        <Button
          as="button"
          primary={primary}
          secondary={secondary}
          onClick={this.toggleForm}
        >
          Request 3D
        </Button>
        <Modal centered show={showForm} onHide={this.toggleForm}>
          <Modal.Header closeButton>
            <Modal.Title>3D DRAWING REQUEST</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Request3dForm />
          </Modal.Body>
        </Modal>
      </Fragment>
    )
  }
}
