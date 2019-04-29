import React, { Fragment, PureComponent } from 'react'
import { Modal } from 'react-bootstrap'
import styled from 'styled-components'

import Btn from '../styled/button'
import Request3dForm from '../forms/request3D'
import { formatURL } from '../../helpers/formatting'

class ModalButton extends PureComponent {
  constructor (props, context) {
    super(props, context)

    this.toggleForm = this.toggleForm.bind(this)

    this.state = {
      showForm: false
    }
  }

  toggleForm () {
    this.setState(prevState => ({ showForm: !prevState.showForm }))
  }

  render () {
    const { primary, secondary } = this.props
    const { showForm } = this.state

    return (
      <Fragment>
        <Button
          as='button'
          primary={primary}
          secondary={secondary}
          onClick={this.toggleForm}
        >
          Request 3D
        </Button>
        <FormModal centered show={showForm} onHide={this.toggleForm}>
          <Modal.Header closeButton>
            <Modal.Title>3D Drawing Request</Modal.Title>
            <h6 className='text-center text-uppercase'>
              Enter your name and email to request a 3D drawing
            </h6>
          </Modal.Header>
          <Modal.Body>
            <Request3dForm />
          </Modal.Body>
        </FormModal>
      </Fragment>
    )
  }
}

const FormModal = styled(Modal)`
  .modal-content {
    background: transparent;
    border: 0;
    color: #fff;
  }

  .modal-header {
    border-bottom: 0;
    text-transform: uppercase;
    display: grid;
    grid-template-columns: 1fr;
    text-align: center;

    .h4 {
      margin-bottom: 1rem;
    }

    .close {
      position: absolute;
      top: 0;
      right: 0;
      color: ${({ theme }) => theme.secondary};
      font-size: 2rem;
      opacity: 1;
      text-shadow: none;

      &:not(:disabled) {
        &:not(.disabled) {
          &:hover,
          &:focus {
            color: ${({ theme }) => theme.primary};
            opacity: 1;
          }
        }
      }
    }
  }
`

const HeroContentPage = props => (
  <Fragment>
    {props.html && (
      <div
        className='content'
        dangerouslySetInnerHTML={{ __html: props.html }}
      />
    )}
    {props.buttons && (
      <Buttons single={props.buttons.length > 1 ? `false` : `true`}>
        {props.buttons.map((link, i) => {
          return link.button_link.target ? (
            <Button
              key={i}
              as='a'
              href={formatURL(link.button_link.url)}
              target={link.button_link.target}
              rel='noopener noreferrer'
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
              to={formatURL(link.button_link.url)}
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

const Buttons = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: ${({ single }) => (single ? `center` : `space-between`)};
  align-items: center;
`

const Button = styled(Btn)`
  color: white;
  margin: 0.5rem;
`
