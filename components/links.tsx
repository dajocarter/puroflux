import React, { Children } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'

export const StyledButtonLink = styled.a`
  border-width: 3px;
  border-style: solid;
  border-color: ${(props) =>
    props.primary === 'true'
      ? props.theme.primary
      : props.secondary === 'true'
      ? props.theme.secondary
      : props.theme.alt};
  background-color: transparent;
  color: black;
  display: inline-block;
  font-size: 16px;
  letter-spacing: 1px;
  line-height: 1.5;
  padding: 0.5rem 1.5rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition-property: background-color, border-color, color;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86);

  &:hover,
  &:focus {
    background-color: ${(props) =>
      props.primary === 'true'
        ? props.theme.primary
        : props.secondary === 'true'
        ? props.theme.secondary
        : props.theme.alt};
    color: white;
    cursor: pointer;
    text-decoration: none;
  }
`

export const ActiveLink = ({ children, activeClassName, ...props }) => {
  const { asPath } = useRouter()
  const child = Children.only(children)
  const childClassName = child.props.className || ''

  // pages/index.js will be matched via props.href
  // pages/about.js will be matched via props.href
  // pages/[slug].js will be matched via props.as
  const className =
    asPath === props.href || asPath === props.as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null
      })}
    </Link>
  )
}
