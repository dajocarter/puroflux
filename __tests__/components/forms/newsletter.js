import React from 'react'
import renderer from 'react-test-renderer'

import NewsletterForm from '../../../src/components/forms/newsletter'

describe('Newsletter Form', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<NewsletterForm />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
