import { Link } from 'gatsby'
import styled from 'styled-components'

const Button = styled(Link)`
  border-width: 3px;
  border-style: solid;
  border-color: ${props =>
    props.primary
      ? props.theme.primary
      : props.secondary
        ? props.theme.secondary
        : props.theme.alt};
  background-color: transparent;
  color: black;
  display: inline-block;
  letter-spacing: 1px;
  padding: 0.25rem 1.5rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.15s ease-in;
  &:hover,
  &:focus {
    background-color: ${props =>
      props.primary
        ? props.theme.primary
        : props.secondary
          ? props.theme.secondary
          : props.theme.alt};
    color: white;
  }
`

export default Button
