import React, { Component } from 'react'
import { FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.css'

export default class Request3dForm extends Component {
  render() {
    return (
      <form
        name="request3D"
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
        <FormGroup controlId="company">
          <FormLabel>Company</FormLabel>
          <FormControl type="text" name="company" placeholder="Your company" />
        </FormGroup>
        <FormGroup controlId="model">
          <FormLabel>Model</FormLabel>
          <FormControl
            type="text"
            name="model"
            placeholder="Requested model name"
          />
        </FormGroup>
        <input
          type="hidden"
          name="_subject"
          value="New 3D Request Form Submission"
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
