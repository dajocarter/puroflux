import React from 'react'
import renderer from 'react-test-renderer'

import ContactForm from '../../../src/components/forms/contact'

describe('Contact Form', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<ContactForm />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
