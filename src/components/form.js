import React, { Component } from 'react'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import styled from 'styled-components'

const HoneyPot = styled.p`
  display: none;
`

export default class Form extends Component {
  render() {
    return (
      <form netlify name="contact" method="POST">
        <FormGroup controlId="name">
          <ControlLabel>Name</ControlLabel>
          <FormControl type="text" placeholder="Your name" />
        </FormGroup>
        <FormGroup controlId="email">
          <ControlLabel>Email</ControlLabel>
          <FormControl type="email" placeholder="Your email" />
        </FormGroup>
        <FormGroup controlId="message">
          <ControlLabel>Message</ControlLabel>
          <FormControl componentClass="textarea" placeholder="Your message" />
        </FormGroup>
        <FormGroup controlId="location">
          <ControlLabel>Location</ControlLabel>
          <FormControl type="text" placeholder="Your location" />
        </FormGroup>
        <HoneyPot>
          <label>
            Don’t fill this out if you're human: <input name="bot-field" />
          </label>
        </HoneyPot>
        <div data-netlify-recaptcha />
        <Button type="submit">Submit</Button>
      </form>
    )
  }
}
