import React, { ReactNode } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { StyledButtonLink } from './links'
import { formatURL } from '../data'

export function HeroUnit({
  imgSrc,
  isPFIndustrial = false,
  children
}: {
  imgSrc: string
  isPFIndustrial?: boolean
  children: ReactNode
}) {
  return (
    <Background isPFIndustrial={isPFIndustrial}>
      <HeroImg
        ispfindustrial={isPFIndustrial ? isPFIndustrial : undefined}
        src={imgSrc}
        layout='fill'
        priority
      />
      <Content>{children}</Content>
    </Background>
  )
}

export interface HeroContentProps {
  content: string
  buttons: {
    button_link: {
      url: string
      target: string
      title: string
    }
  }[]
}

export function HeroContent({ content, buttons }: HeroContentProps) {
  return (
    <>
      {content && (
        <div
          className='content'
          dangerouslySetInnerHTML={{ __html: content }}
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
                primary={i % 2 === 0}
                secondary={i % 2 === 1}
              >
                {link.button_link.title}
              </Button>
            ) : (
              <Button
                key={i}
                href={formatURL(link.button_link.url)}
                primary={i % 2 === 0}
                secondary={i % 2 === 1}
              >
                {link.button_link.title}
              </Button>
            )
          })}
        </Buttons>
      )}
    </>
  )
}

const Buttons = styled.div<{ single: string }>`
  display: flex;
  flex-flow: row wrap;
  justify-content: ${({ single }) => (single ? `center` : `space-between`)};
  align-items: center;
`

const Button = styled(StyledButtonLink)`
  color: white;
  margin: 0.5rem;
`

const Background = styled.div<{ isPFIndustrial: boolean }>`
  height: ${({ isPFIndustrial }) => (isPFIndustrial ? '265px' : '450px')};
  width: 100%;
  position: relative;
`

const HeroImg = styled(Image)<{ ispfindustrial: true | undefined }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  height: ${({ ispfindustrial }) => (ispfindustrial ? '265px' : '450px')};
`

const Content = styled.div`
  color: white;
  font-size: 1.25rem;
  letter-spacing: 1px;
  line-height: 38px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 700px;

  .content {
    margin-bottom: 2rem;
    text-align: center;

    h1 {
      font-size: 2rem;
    }

    .alignleft {
      float: left;
    }

    .alignright {
      float: right;
    }

    a {
      color: white;
      font-size: 1.5rem;

      &:hover {
        color: white;
      }
    }
  }
`
