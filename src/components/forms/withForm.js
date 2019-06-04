import React, { PureComponent } from 'react'
import { Button } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.css'

export default function withForm (FormInputs, formName, formSubject = 'New Form Submission') {
  return class ContactForm extends PureComponent {
    render () {
      return (
        <form
          name={formName}
          method='POST'
          action='https://formspree.io/djamison@puroflux.com'
        >
          <FormInputs />
          <input
            type='hidden'
            name='_subject'
            value={formSubject}
          />
          <Button type='submit' variant='light'>
            Submit
          </Button>
        </form>
      )
    }
  }
}
