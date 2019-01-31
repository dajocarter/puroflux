import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import Layout from '../components/layout'
import HeroUnit from '../components/Hero/HeroUnit'
import HeroContent from '../components/Hero/HeroContent-Page'
import Accordion, {
  AccordionTitle,
  AccordionContent
} from '../components/Accordion'

const formatPhoneNumber = number => {
  const parts = number.split('-')
  return `(${parts[0]}) ${parts[1]}-${parts[2]}`
}

const groupRepsByState = reps => {
  const statesExtracted = reps.reduce((acc, { node }) => {
    const newNode = Object.assign({}, node)
    newNode.states = newNode.states.length ? newNode.states[0].name : ''
    acc.push(newNode)
    return acc
  }, [])
  const sortedReps = statesExtracted.sort((a, b) => {
    let stateA = a.states
    let stateB = b.states
    if (stateA > stateB) {
      return 1
    } else if (stateA < stateB) {
      return -1
    } else {
      return 0
    }
  })
  const repsByState = sortedReps.reduce((acc, node) => {
    var key = node.states
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(node)
    return acc
  }, [])
  const html = Object.entries(repsByState).map(([state, firms], i) => (
    <Fragment key={i}>
      <AccordionTitle accordionIndex={i}>{state}</AccordionTitle>
      <AccordionContent accordionIndex={i}>
        <Firms>
          {/* eslint-disable camelcase */}
          {firms.map(({ title, acf: { territory, phone_number, fax_number, address, website } }, j) => (
            <ul key={j}>
              <li>
                <span>Territory:</span>{' '}
                <span>{territory || state}</span>
              </li>
              <li>
                <span>Phone:</span>{' '}
                {phone_number && (
                  <a href={`tel:${phone_number}`}>
                    {formatPhoneNumber(phone_number)}
                  </a>
                )}
              </li>
              <li>
                <span>Firm:</span>{' '}
                <span dangerouslySetInnerHTML={{ __html: title }} />
              </li>
              <li>
                <span>Fax:</span>{' '}
                {fax_number && (
                  <a href={`fax:${fax_number}`}>
                    {formatPhoneNumber(fax_number)}
                  </a>
                )}
              </li>
              <li>
                <span>Address:</span>
                <br />
                <span dangerouslySetInnerHTML={{ __html: address }} />
              </li>
              <li>
                <span>Website:</span>{' '}
                <a
                  href={website}
                  target='_blank'
                  rel='noopener noreferrer nofollow'
                >
                  {website}
                </a>
              </li>
            </ul>
          ))}
          {/* eslint-enable */}
        </Firms>
      </AccordionContent>
    </Fragment>
  ))
  return html
}

const StoreLocatorTemplate = ({ data: { page, reps } }) => {
  const sortedReps = groupRepsByState(reps.edges)
  return (
    <Layout pageTitle={page.title} pageSlug={page.slug}>
      <HeroUnit>
        <HeroContent html={page.acf.content} buttons={page.acf.buttons} />
      </HeroUnit>
      <Main>
        {page.content && (
          <Row>
            <Col>
              <div dangerouslySetInnerHTML={{ __html: page.content }} />
            </Col>
          </Row>
        )}
        {sortedReps && (
          <Row>
            <Col>
              <Accordion>{sortedReps}</Accordion>
            </Col>
          </Row>
        )}
      </Main>
    </Layout>
  )
}

export default StoreLocatorTemplate

export const query = graphql`
  query StoreLocatorQuery($slug: String!) {
    page: wordpressPage(slug: { eq: $slug }) {
      title
      slug
      content
      acf {
        buttons {
          button_link {
            title
            target
            url
          }
        }
        content
      }
    }
    reps: allWordpressWpReps {
      edges {
        node {
          title
          acf {
            territory
            website
            location {
              lat
              lng
            }
            address
            phone_number
            fax_number
          }
          states {
            name
          }
        }
      }
    }
  }
`

const Main = styled(Container)`
  padding: 45px 15px;
`

const Firms = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;

  ul {
    padding: 1rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr;

    &:nth-child(even) {
      background: #f2f2f2;
      margin: 0 -1rem;
      padding: 1rem;
    }
  }

  @media (max-width: 575px) {
    ul {
      grid-template-columns: 1fr;
    }

    li {
      &:nth-child(odd) {
        order: 1;
      }

      &:nth-child(even) {
        order: 2;
      }
    }
  }
`
