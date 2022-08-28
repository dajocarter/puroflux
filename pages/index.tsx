import type { GetStaticProps, GetStaticPropsContext } from 'next'
import Head from 'next/head'
import getLayoutData from '../data/layout'
import Layout from '../components/layout'
import { HeaderProps } from '../components/header'
import { FooterProps } from '../components/footer'
import { getHomePageData } from '../data/page'
import {
  HeroUnit,
  HeroContent,
  HeroContentProps
} from '../components/hero-unit'
import { Col, Container, Row } from 'react-bootstrap'
import styled from 'styled-components'
import Image from 'next/image'
import { StyledButtonLink } from '../components/links'
import FlexibleContent, { Layouts } from '../components/flexible-content'

interface HomePageProps {
  header: HeaderProps
  footer: FooterProps
  heroImg: {
    media_details: {
      sizes: {
        full: {
          source_url: string
        }
      }
    }
  }
  page: {
    acf: HeroContentProps & {
      featured_image: {
        alt: string
        sizes: {
          medium_large: string
          'medium_large-height': number
          'medium_large-width': number
        }
      }
      featured_content: string
      layouts: Layouts[]
    }
  }
}

export default function Home(props: HomePageProps) {
  const hasFeaturedImage = !!props.page.acf.featured_image
  return (
    <Layout {...props}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <HeroUnit imgSrc={props.heroImg.media_details.sizes.full.source_url}>
        <HeroContent
          content={props.page.acf.content}
          buttons={props.page.acf.buttons}
        />
      </HeroUnit>
      <FeatureContainer>
        <Row>
          <Col>
            <FeatureTitle hasFeaturedImage={hasFeaturedImage}>
              Featured
            </FeatureTitle>
          </Col>
        </Row>
        <Row>
          {hasFeaturedImage && (
            <Column xs={12} lg={6}>
              <Image
                src={props.page.acf.featured_image.sizes.medium_large}
                alt={props.page.acf.featured_image.alt}
                width={
                  props.page.acf.featured_image.sizes['medium_large-width']
                }
                height={
                  props.page.acf.featured_image.sizes['medium_large-height']
                }
              />
            </Column>
          )}
          <Column xs={12} lg={hasFeaturedImage ? 6 : 12}>
            <WPcontent
              dangerouslySetInnerHTML={{
                __html: props.page.acf.featured_content
              }}
            />
            <StyledButtonLink secondary href='/gallery/'>
              View Gallery
            </StyledButtonLink>
          </Column>
        </Row>
      </FeatureContainer>
      {props.page.acf.layouts && (
        <FlexibleContent layouts={props.page.acf.layouts} />
      )}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const layoutData = await getLayoutData()
  const pageData = await getHomePageData()
  return {
    props: {
      ...layoutData,
      ...pageData
    }
  }
}

const FeatureContainer = styled(Container)`
  margin-top: 45px;
  margin-bottom: 45px;

  > .row > .col {
    position: relative;
    height: 73px;
  }
`

const Column = styled(Col)`
  blockquote {
    border-left: ${({ theme }) => `0.5rem solid ${theme.primary}`};
    padding: 1rem;
    background: #f7f7f7;
    font-style: italic;

    > p:last-child {
      margin-bottom: 0;
    }
  }

  &:first-of-type {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 991px) {
    &:last-of-type {
      margin-top: 2rem;
    }
  }
`

const FeatureTitle = styled.h2<{ hasFeaturedImage: boolean }>`
  border-bottom: ${({ theme }) => `3px solid ${theme.primary}`};
  color: #7f7f7f;
  padding: 0 0.5rem 0.5rem;
  font-family: 'Josefin Sans', sans-serif;
  text-transform: uppercase;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  ${({ hasFeaturedImage }) =>
    hasFeaturedImage
      ? `
    @media (min-width: 992px) {
      left: 75%;
      transform: translateX(-75%);
    }
  `
      : ``}
`

const WPcontent = styled.div`
  color: ${({ theme }) => theme.body};
`
