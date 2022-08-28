import styled from 'styled-components'
import Image from 'next/image'
import { StyledButtonLink } from '../links'

export interface SplitContentProps {
  acf_fc_layout: 'split_content'
  left_background_image: {
    alt: string
    sizes: {
      medium_large: string
      'medium_large-height': number
      'medium_large-width': number
    }
  }
  right_background_image: {
    alt: string
    sizes: {
      medium_large: string
      'medium_large-height': number
      'medium_large-width': number
    }
  }
  left_title: string
  right_title: string
  left_content: string
  right_content: string
  left_link: {
    url: string
    target: string
    title: string
  }
  right_link: {
    url: string
    target: string
    title: string
  }
}

export default function SplitContent(props: SplitContentProps) {
  return (
    <Row>
      <LeftSide>
        {props.left_background_image && (
          <BGimage
            alt={props.left_background_image.alt}
            src={props.left_background_image.sizes.medium_large}
            height={props.left_background_image.sizes['medium_large-height']}
            width={props.left_background_image.sizes['medium_large-width']}
            layout='fill'
          />
        )}
        <LeftContainer>
          <h2>{props.left_title}</h2>
          <Content dangerouslySetInnerHTML={{ __html: props.left_content }} />
          {props.left_link && (
            <ButtonLink
              primary
              href={`/${props.left_link.url}/`}
              target={props.left_link.target}
            >
              {props.left_link.title}
            </ButtonLink>
          )}
        </LeftContainer>
      </LeftSide>
      <RightSide>
        {props.right_background_image && (
          <BGimage
            alt={props.left_background_image.alt}
            src={props.right_background_image.sizes.medium_large}
            height={props.right_background_image.sizes['medium_large-height']}
            width={props.right_background_image.sizes['medium_large-width']}
            layout='fill'
          />
        )}
        <RightContainer>
          <h2>{props.right_title}</h2>
          <Content dangerouslySetInnerHTML={{ __html: props.right_content }} />
          {props.right_link && (
            <ButtonLink
              secondary
              href={`/${props.right_link.url}/`}
              target={props.right_link.target}
            >
              {props.right_link.title}
            </ButtonLink>
          )}
        </RightContainer>
      </RightSide>
    </Row>
  )
}

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`

const Side = styled.div`
  flex: 0 0 auto;
  width: 100%;
  position: relative;
  height: 420px;

  @media (min-width: 768px) {
    width: 50%;
  }
`

const LeftSide = styled(Side)`
  text-align: right;
`

const RightSide = styled(Side)`
  text-align: left;
`

const BGimage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  height: 420px;
`

const Container = styled.div`
  margin: 0 auto;
  max-width: 480px;
  padding: 1.45rem 1.0875rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  width: 80%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`

const Content = styled.div`
  text-align: center;
  margin-bottom: 1.25rem;
`

const LeftContainer = styled(Container)`
  @media (min-width: 768px) {
    align-items: flex-end;
    & ${Content} {
      text-align: right;
    }
  }
`

const RightContainer = styled(Container)`
  @media (min-width: 768px) {
    align-items: flex-start;
    & ${Content} {
      text-align: left;
    }
  }
`

const ButtonLink = styled(StyledButtonLink)`
  color: white;
`
