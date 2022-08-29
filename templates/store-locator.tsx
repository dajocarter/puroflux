import React, { Fragment } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styled from 'styled-components'
import { formatPhoneNumber } from '../data'
import Layout from '../components/layout'
import {
  HeroContent,
  HeroContentProps,
  HeroUnit
} from '../components/hero-unit'
import Accordion, {
  AccordionContent,
  AccordionTitle
} from '../components/accordion'
import { PageProps } from '../pages/[slug]'
import { RepPostType, StatePostType } from '../data/types'

const groupRepsByState = (reps: RepPostType[], states: StatePostType[]) => {
  const statesExtracted = reps.reduce(
    (acc: RepPostType[], rep: RepPostType) => {
      const newNode = Object.assign({}, rep)
      if (rep.states) {
        const state = states.find((state) => state.id === rep.states[0])
        newNode.state = state?.name || ''
      } else {
        newNode.state = ''
      }
      acc.push(newNode)
      return acc
    },
    []
  )
  const sortedReps = statesExtracted.sort((a, b) => {
    let stateA = a.state || ''
    let stateB = b.state || ''
    if (stateA > stateB) {
      return 1
    } else if (stateA < stateB) {
      return -1
    } else {
      return 0
    }
  })
  const repsByState = sortedReps.reduce(
    (acc: { [key: string]: RepPostType[] }, node: RepPostType) => {
      var key = node.state || ''
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(node)
      return acc
    },
    {}
  )
  const html = Object.entries(repsByState).map(([state, firms], i) => (
    <Fragment key={i}>
      <AccordionTitle accordionIndex={i}>{state}</AccordionTitle>
      <AccordionContent accordionIndex={i}>
        <Firms>
          {firms.map(
            (
              {
                title,
                acf: { territory, phone_number, fax_number, address, website }
              },
              j
            ) => (
              <ul key={j}>
                <li>
                  <span>Territory:</span> <span>{territory || state}</span>
                </li>
                <li>
                  <span>Phone:</span>{' '}
                  {phone_number && (
                    <a href={`tel:${formatPhoneNumber(phone_number, 'back')}`}>
                      {formatPhoneNumber(phone_number, 'front')}
                    </a>
                  )}
                </li>
                <li>
                  <span>Firm:</span>{' '}
                  <span dangerouslySetInnerHTML={{ __html: title.rendered }} />
                </li>
                <li>
                  <span>Fax:</span>{' '}
                  {fax_number && (
                    <a href={`fax:${formatPhoneNumber(fax_number, 'back')}`}>
                      {formatPhoneNumber(fax_number, 'front')}
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
            )
          )}
        </Firms>
      </AccordionContent>
    </Fragment>
  ))
  return html
}

export interface StoreLocatorProps extends PageProps {
  page: {
    template: 'page_store-locator.php'
    content: {
      rendered: string
    }
    acf: HeroContentProps
  }
  reps: RepPostType[]
  states: StatePostType[]
}

export default function StoreLocatorTemplate(props: StoreLocatorProps) {
  const sortedReps = groupRepsByState(props.reps, props.states)
  return (
    <Layout {...props}>
      <HeroUnit imgSrc={props.heroImg.media_details.sizes.full.source_url}>
        <HeroContent
          content={props.page.acf.content}
          buttons={props.page.acf.buttons}
        />
      </HeroUnit>
      <Main>
        {props.page.content.rendered && (
          <Row>
            <Col>
              <div
                dangerouslySetInnerHTML={{
                  __html: props.page.content.rendered
                }}
              />
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
