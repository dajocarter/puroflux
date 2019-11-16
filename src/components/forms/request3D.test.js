import React from 'react'
import renderer from 'react-test-renderer'

import Request3DForm from './request3D'

describe('Request 3D Form', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Request3DForm />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
