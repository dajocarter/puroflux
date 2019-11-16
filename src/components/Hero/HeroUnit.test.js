import React from 'react'
import renderer from 'react-test-renderer'

import { HeroUnitComponent as HeroUnit } from './HeroUnit'

describe('Hero Unit', () => {
  const homeHero = {
    'localFile': {
      'childImageSharp': {
        'fluid': {
          'base64': 'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAHABQDASIAAhEBAxEB/8QAFwABAAMAAAAAAAAAAAAAAAAAAAEDBP/EABcBAAMBAAAAAAAAAAAAAAAAAAABAgT/2gAMAwEAAhADEAAAAccl4qwP/8QAFhAAAwAAAAAAAAAAAAAAAAAAABAR/9oACAEBAAEFAlD/xAAVEQEBAAAAAAAAAAAAAAAAAAAAEf/aAAgBAwEBPwFX/8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAgEBPwE//8QAFBABAAAAAAAAAAAAAAAAAAAAEP/aAAgBAQAGPwJ//8QAGRAAAQUAAAAAAAAAAAAAAAAAAAERMUGB/9oACAEBAAE/IaFjBx//2gAMAwEAAgADAAAAEH/P/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAIAQMBAT8QU//EABURAQEAAAAAAAAAAAAAAAAAAAEQ/9oACAECAQE/EGf/xAAZEAEAAgMAAAAAAAAAAAAAAAABACERgZH/2gAIAQEAAT8QHaLmMlhU/9k=',
          'aspectRatio': 2.7729636048526864,
          'src': '/static/c1fabd29bf37bbd2513391955d7ee25c/5fd0a/puroflux_home_hero_pf_4060.jpg',
          'srcSet': '/static/c1fabd29bf37bbd2513391955d7ee25c/82399/puroflux_home_hero_pf_4060.jpg 313w,\n/static/c1fabd29bf37bbd2513391955d7ee25c/80a7f/puroflux_home_hero_pf_4060.jpg 624w,\n/static/c1fabd29bf37bbd2513391955d7ee25c/5fd0a/puroflux_home_hero_pf_4060.jpg 1248w,\n/static/c1fabd29bf37bbd2513391955d7ee25c/2e0c6/puroflux_home_hero_pf_4060.jpg 1600w',
          'sizes': '(max-width: 1248px) 100vw, 1248px'
        }
      }
    }
  }
  const defaultHero = {
    'localFile': {
      'childImageSharp': {
        'fluid': {
          'base64': 'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAHABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAIE/8QAFwEAAwEAAAAAAAAAAAAAAAAAAAECBP/aAAwDAQACEAMQAAABzWXhkC//xAAVEAEBAAAAAAAAAAAAAAAAAAABEP/aAAgBAQABBQIb/8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAwEBPwE//8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAgEBPwE//8QAFBABAAAAAAAAAAAAAAAAAAAAEP/aAAgBAQAGPwJ//8QAFhABAQEAAAAAAAAAAAAAAAAAAAER/9oACAEBAAE/IRqv/9oADAMBAAIAAwAAABCD/wD/xAAVEQEBAAAAAAAAAAAAAAAAAAABEP/aAAgBAwEBPxBn/8QAFREBAQAAAAAAAAAAAAAAAAAAARD/2gAIAQIBAT8QSf/EABgQAAMBAQAAAAAAAAAAAAAAAAABESEx/9oACAEBAAE/EIqCvpDeH//Z',
          'aspectRatio': 2.7729636048526864,
          'src': '/static/92968298086d2e2ffc2294df60e687ef/5fd0a/puroflux_home_hero_sample.jpg',
          'srcSet': '/static/92968298086d2e2ffc2294df60e687ef/82399/puroflux_home_hero_sample.jpg 313w,\n/static/92968298086d2e2ffc2294df60e687ef/80a7f/puroflux_home_hero_sample.jpg 624w,\n/static/92968298086d2e2ffc2294df60e687ef/5fd0a/puroflux_home_hero_sample.jpg 1248w,\n/static/92968298086d2e2ffc2294df60e687ef/2e0c6/puroflux_home_hero_sample.jpg 1600w',
          'sizes': '(max-width: 1248px) 100vw, 1248px'
        }
      }
    }
  }
  it('renders correctly for the home page', () => {
    const tree = renderer.create(<HeroUnit isHome homeHero={homeHero} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders correctly elsewhere', () => {
    const tree = renderer.create(<HeroUnit defaultHero={defaultHero} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
