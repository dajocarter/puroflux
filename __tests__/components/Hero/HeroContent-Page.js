import React from 'react'
import renderer from 'react-test-renderer'

import HeroContentPage from '../../../src/components/Hero/HeroContent-Page'

const sampleHTML = '<p>Some HTML</p>'
const sampleButtons = [
  {
    button_link: {
      target: '_blank',
      title: 'External Link',
      url: 'https://helloworld.com'
    }
  },
  {
    button_link: {
      target: '',
      title: 'Local Link',
      url: '/page'
    }
  }
]

describe('Hero Content', () => {
  it('renders nothing without props', () => {
    const tree = renderer
      .create(<HeroContentPage />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders HTML', () => {
    const tree = renderer
      .create(<HeroContentPage html={sampleHTML} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders buttons', () => {
    const tree = renderer
      .create(<HeroContentPage buttons={sampleButtons} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders both HTML and buttons', () => {
    const tree = renderer
      .create(<HeroContentPage html={sampleHTML} buttons={sampleButtons} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
