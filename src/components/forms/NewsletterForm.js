import React, { Component } from 'react'
import { FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.css'

export default class NewsletterForm extends Component {
  render() {
    return (
      <form
        name="newsletter"
        method="POST"
        action="https://formspree.io/dajocarter@gmail.com"
      >
        <FormGroup controlId="name">
          <FormLabel>Name</FormLabel>
          <FormControl type="text" name="name" placeholder="Your name" />
        </FormGroup>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl type="email" name="_replyto" placeholder="Your email" />
        </FormGroup>
        <input
          type="hidden"
          name="_subject"
          value="New Newsletter Signup Form Submission"
        />
        <div className="text-center">
          <Button type="submit" variant="light">
            Submit
          </Button>
        </div>
      </form>
    )
  }
}
