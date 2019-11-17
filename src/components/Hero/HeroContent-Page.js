import React from 'react'
import { string, arrayOf, shape } from 'prop-types'
import styled from 'styled-components'

import Btn from '../styled/button'
import { formatURL } from '../../helpers/formatting'

const HeroContentPage = ({ html, buttons }) => (
  <>
    {html && (
      <div
        className='content'
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )}
    {buttons && (
      <Buttons single={buttons.length > 1 ? `false` : `true`}>
        {buttons.map((link, i) => {
          return link.button_link.target ? (
            <Button
              key={i}
              as='a'
              href={formatURL(link.button_link.url)}
              target={link.button_link.target}
              rel='noopener noreferrer'
              primary={i % 2 === 0 ? `true` : `false`}
              secondary={i % 2 === 1 ? `true` : `false`}
            >
              {link.button_link.title}
            </Button>
          ) : (
            <Button
              key={i}
              to={formatURL(link.button_link.url)}
              primary={i % 2 === 0 ? `true` : `false`}
              secondary={i % 2 === 1 ? `true` : `false`}
            >
              {link.button_link.title}
            </Button>
          )
        })}
      </Buttons>
    )}
  </>
)

HeroContentPage.propTypes = {
  html: string,
  buttons: arrayOf(shape({
    button_link: shape({
      url: string,
      target: string,
      title: string
    })
  }))
}

export default HeroContentPage

const Buttons = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: ${({ single }) => (single ? `center` : `space-between`)};
  align-items: center;
`

const Button = styled(Btn)`
  color: white;
  margin: 0.5rem;
`
