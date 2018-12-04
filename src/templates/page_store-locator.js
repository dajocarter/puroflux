import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import Layout from '../components/layout'
import HeroUnit from '../components/Hero/HeroUnit'
import HeroContent from '../components/Hero/HeroContent-Page'
import Accordion, {
  AccordionTitle,
  AccordionContent,
} from '../components/Accordion'

const Main = styled(Container)`
  padding: 45px 15px;
`

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
  let html = []
  Object.keys(repsByState).forEach((rep, i) => {
    html.push(
      <>
        <AccordionTitle accordionIndex={i}>{rep}</AccordionTitle>
        <AccordionContent accordionIndex={i}>Hi!</AccordionContent>
      </>
    )
  })
  return html
}

const StoreLocatorTemplate = ({ data: { page, reps } }) => {
  const sortedReps = groupRepsByState(reps.edges)
  return (
    <Layout>
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
