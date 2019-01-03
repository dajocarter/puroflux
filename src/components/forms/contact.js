import React, { Fragment } from 'react'
import { FormGroup, FormControl, FormLabel } from 'react-bootstrap'

import withForm from './withForm'

const ContactForm = () => (
  <Fragment>
    <FormGroup controlId='name'>
      <FormLabel>Name</FormLabel>
      <FormControl type='text' name='name' placeholder='Your name' />
    </FormGroup>
    <FormGroup controlId='email'>
      <FormLabel>Email</FormLabel>
      <FormControl type='email' name='_replyto' placeholder='Your email' />
    </FormGroup>
    <FormGroup controlId='message'>
      <FormLabel>Message</FormLabel>
      <FormControl as='textarea' placeholder='Your message' />
    </FormGroup>
    <FormGroup controlId='location'>
      <FormLabel>Location</FormLabel>
      <FormControl type='text' placeholder='Your location' />
    </FormGroup>
  </Fragment>
)

export default withForm(ContactForm)
