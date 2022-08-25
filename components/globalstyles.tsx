import { createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'

const GlobalStyles = createGlobalStyle`
  ${styledNormalize}
  
  .modal-backdrop.show {
    opacity: 0.9 !important;
  }
`

export default GlobalStyles