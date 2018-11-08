import React, { Component } from 'react'
import { FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.css'

export default class Form extends Component {
  render() {
    return (
      <form name="contact" method="POST" action="https://formspree.io/dajocarter@gmail.com">
        <FormGroup controlId="name">
          <FormLabel>Name</FormLabel>
          <FormControl type="text" name="name" placeholder="Your name" />
        </FormGroup>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl type="email" name="_replyto" placeholder="Your email" />
        </FormGroup>
        <FormGroup controlId="message">
          <FormLabel>Message</FormLabel>
          <FormControl componentClass="textarea" placeholder="Your message" />
        </FormGroup>
        <FormGroup controlId="location">
          <FormLabel>Location</FormLabel>
          <FormControl type="text" placeholder="Your location" />
        </FormGroup>
        <input type="hidden" name="_subject" value="New Contact Form Submission" />
				<input type="text" name="_gotcha" style={{display: 'none'}} />
        <Button type="submit">Submit</Button>
      </form>
    )
  }
}
