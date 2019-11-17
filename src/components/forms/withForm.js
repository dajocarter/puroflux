import React from 'react'
import { Button } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.css'

export default function withForm (InputFields, formName) {
  return function FormInputs () {
    return (
      <form
        name={formName}
        method='POST'
        data-netlify='true'
        data-netlify-honeypot='bot-field'
      >
        <input
          type='hidden'
          name='form-name'
          value={formName}
        />
        <p className='d-none'>
          <label>
            Don’t fill this out:{' '}
            <input type='text' name='bot-field' />
          </label>
        </p>
        <InputFields />
        <input
          type='hidden'
          name='_subject'
          value={`New submission from ${formName} form.`}
        />
        <Button type='submit' variant='light'>
          Submit
        </Button>
      </form>
    )
  }
}
