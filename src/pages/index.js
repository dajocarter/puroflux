import React from 'react'
import Img from 'gatsby-image'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import useHomePage from '../components/useStaticQuery/homePage'
import Layout from '../components/layout'
import HeroUnit from '../components/Hero/HeroUnit'
import HeroContent from '../components/Hero/HeroContent-Page'
import FlexibleContent from '../components/flexible-content'
import Btn from '../components/styled/button'

const IndexPage = () => {
  const { title, acf } = useHomePage()
  const hasFeaturedImage = !!acf.featured_image.localFile

  return (
    <Layout pageTitle={title}>
      <HeroUnit isHome>
        <HeroContent
          html={acf.content}
          buttons={acf.buttons}
        />
      </HeroUnit>
      <FeatureContainer>
        <Row>
          <Col>
            <FeatureTitle hasFeaturedImage={hasFeaturedImage}>Featured</FeatureTitle>
          </Col>
        </Row>
        <Row>
          {hasFeaturedImage && (
            <Column xs={12} lg={6}>
              <FeatureImage
                fluid={
                  acf.featured_image.localFile.childImageSharp.fluid
                }
              />
            </Column>
          )}
          <Column xs={12} lg={hasFeaturedImage ? 6 : 12}>
            <WPcontent
              dangerouslySetInnerHTML={{
                __html: acf.featured_content
              }}
            />
            <Btn secondary='true' to={`/gallery/`}>
              View Gallery
            </Btn>
          </Column>
        </Row>
      </FeatureContainer>
      {acf.layouts_page && (
        <FlexibleContent layouts={acf.layouts_page} />
      )}
    </Layout>
  )
}

export default IndexPage

const FeatureContainer = styled(Container)`
  margin-top: 45px;
  margin-bottom: 45px;

  > .row > .col {
    position: relative;
    height: 73px;
  }
`

const Column = styled(Col)`
  > .gatsby-image-outer-wrapper {
    width: 100%;
  }

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

const FeatureImage = styled(Img)`
  height: auto;
  width: 100%;
`

const FeatureTitle = styled.h2`
  border-bottom: ${({ theme }) => `3px solid ${theme.primary}`};
  color: #7f7f7f;
  padding: 0 0.5rem 0.5rem;
  font-family: 'Josefin Sans', sans-serif;
  text-transform: uppercase;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  ${({ hasFeaturedImage }) => hasFeaturedImage ? `
    @media (min-width: 992px) {
      left: 75%;
      transform: translateX(-75%);
    }
  ` : ``}
`

const WPcontent = styled.div`
  color: ${({ theme }) => theme.body};
`
