import React, { Component } from 'react'
import { FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap'
import styled from 'styled-components'

import 'bootstrap/dist/css/bootstrap.css'

const HoneyPot = styled.p`
  display: none;
`

export default class Form extends Component {
  render() {
    return (
      <form netlify name="contact" method="POST">
        <FormGroup controlId="name">
          <FormLabel>Name</FormLabel>
          <FormControl type="text" placeholder="Your name" />
        </FormGroup>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl type="email" placeholder="Your email" />
        </FormGroup>
        <FormGroup controlId="message">
          <FormLabel>Message</FormLabel>
          <FormControl componentClass="textarea" placeholder="Your message" />
        </FormGroup>
        <FormGroup controlId="location">
          <FormLabel>Location</FormLabel>
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
