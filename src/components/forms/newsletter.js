import React, { Fragment } from 'react'
import { FormGroup, FormControl, FormLabel } from 'react-bootstrap'

import withForm from './withForm'

const NewsletterForm = () => (
  <Fragment>
    <FormGroup controlId='name'>
      <FormLabel>Name</FormLabel>
      <FormControl type='text' name='name' placeholder='Your name' />
    </FormGroup>
    <FormGroup controlId='email'>
      <FormLabel>Email</FormLabel>
      <FormControl type='email' name='_replyto' placeholder='Your email' />
    </FormGroup>
  </Fragment>
)

export default withForm(NewsletterForm, 'Newsletter')
