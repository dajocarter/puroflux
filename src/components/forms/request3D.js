import React, { Fragment } from 'react'
import { FormGroup, FormControl, FormLabel } from 'react-bootstrap'

import withForm from './withForm'

const Request3dForm = () => (
  <Fragment>
    <FormGroup controlId='name'>
      <FormLabel>Name</FormLabel>
      <FormControl type='text' name='name' placeholder='Your name' />
    </FormGroup>
    <FormGroup controlId='email'>
      <FormLabel>Email</FormLabel>
      <FormControl type='email' name='_replyto' placeholder='Your email' />
    </FormGroup>
    <FormGroup controlId='company'>
      <FormLabel>Company</FormLabel>
      <FormControl type='text' name='company' placeholder='Your company' />
    </FormGroup>
    <FormGroup controlId='model'>
      <FormLabel>Model</FormLabel>
      <FormControl
        type='text'
        name='model'
        placeholder='Requested model name'
      />
    </FormGroup>
  </Fragment>
)

export default withForm(Request3dForm, '3D Request Form')
