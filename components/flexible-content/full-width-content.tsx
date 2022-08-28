import Image from 'next/image'
import styled from 'styled-components'
import { StyledButtonLink } from '../links'

export interface FullWidthContentProps {
  acf_fc_layout: 'full_width_content'
  background_image: {
    alt: string
    sizes: {
      medium_large: string
      'medium_large-height': number
      'medium_large-width': number
    }
  }
  content: string
  link: {
    url: string
    target: string
    title: string
  }
}

export default function FullWidthContent(props: FullWidthContentProps) {
  return (
    <Row>
      <Container>
        {props.background_image && (
          <BGimg
            alt={props.background_image.alt}
            src={props.background_image.sizes.medium_large}
            height={props.background_image.sizes['medium_large-height']}
            width={props.background_image.sizes['medium_large-width']}
          />
        )}
        <Content dangerouslySetInnerHTML={{ __html: props.content }} />
        {props.link && (
          <StyledButtonLink
            secondary
            href={`/${props.link.url}/`}
            target={props.link.target}
          >
            {props.link.title}
          </StyledButtonLink>
        )}
      </Container>
    </Row>
  )
}

const Row = styled.div`
  background-color: rgba(127, 127, 127, 0.1);
`

const Container = styled.div`
  margin: 0 auto;
  max-width: 480px;
  padding: 1.45rem 1.0875rem;
  text-align: center;
`

const BGimg = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  height: 420px;
`

const Content = styled.div`
  font-size: 24px;
  letter-spacing: 1px;
`
