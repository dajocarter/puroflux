import { Link } from 'gatsby'
import styled from 'styled-components'

const Button = styled(Link)`
  border-width: 3px;
  border-style: solid;
  border-color: ${props =>
    props.primary === 'true'
      ? props.theme.primary
      : props.secondary === 'true'
        ? props.theme.secondary
        : props.theme.alt};
  background-color: transparent;
  color: black;
  display: inline-block;
  font-size: 18px;
  letter-spacing: 1px;
  line-height: 38px;
  padding: 0.25rem 1.5rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition-property: background-color, border-color, color;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86);

  &:hover,
  &:focus {
    background-color: ${props =>
    props.primary === 'true'
      ? props.theme.primary
      : props.secondary === 'true'
        ? props.theme.secondary
        : props.theme.alt};
    color: white;
    text-decoration: none;
  }
`

export default Button
