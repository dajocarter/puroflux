import React, { Fragment } from 'react'
import styled from 'styled-components'

import Btn from '../styled/button'

const Buttons = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: ${props => (props.single ? `center` : `space-between`)};
  align-items: center;
`

const Button = styled(Btn)`
  color: white;
  margin: 0.5rem;
`

const HeroContentPage = props => (
  <Fragment>
    {props.html && (
      <div
        className='content'
        dangerouslySetInnerHTML={{ __html: props.html }}
      />
    )}
    {props.buttons && (
      <Buttons single={props.buttons.length > 1 ? `false` : `true`}>
        {props.buttons.map((link, i) => {
          return link.button_link.target ? (
            <Button
              key={i}
              as='a'
              href={link.button_link.url}
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
              to={`/${link.button_link.url}/`}
              primary={i % 2 === 0 ? `true` : `false`}
              secondary={i % 2 === 1 ? `true` : `false`}
            >
              {link.button_link.title}
            </Button>
          )
        })}
      </Buttons>
    )}
  </Fragment>
)

export default HeroContentPage
