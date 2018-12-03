import React, { Fragment } from 'react'
import { Collapse } from 'react-bootstrap'
import styled from 'styled-components'

import 'bootstrap/dist/css/bootstrap.css'
import withAccordion from './withAccordion'

const Model = styled.div``

const ModelTitle = styled.h5`
  background-color: ${props => (props['aria-expanded'] ? `black` : `white`)};
  color: ${props => (props['aria-expanded'] ? `white` : `black`)};
  cursor: pointer;
  text-transform: uppercase;
  margin: 0;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background-color: ${props =>
      props['aria-expanded'] ? `black` : `#f2f2f2`};
  }
`

const ModelInfo = styled(Collapse)`
  border-bottom: ${props => (props.in ? `1px solid black` : 0)};
  padding: 0.5rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: flex-start;

  > div {
    padding: 0.5rem;
  }

  span {
    &:first-of-type {
      color: #09a198;
      text-transform: uppercase;
    }
    + span {
      color: #999999;
    }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    a {
      color: #ffa200;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`

const ModelDetails = props => {
  return (
    <Fragment>
      {props.models.map((model, i) => (
        <Model
          key={model.slug}
          isOpen={props.openItem === i}
          handleOpening={props.handleOpening}
        >
          <ModelTitle
            role="button"
            onClick={() => props.handleOpening(i)}
            aria-expanded={props.openItem === i}
            aria-controls={`accordion--content-${i}`}
          >
            {model.title}
          </ModelTitle>
          <ModelInfo in={props.openItem === i}>
            <div id={`accordion--content-${i}`} className="accordion-content">
              <>
                {model.acf.model_stats && (
                  <ul>
                    {model.acf.model_stats.map((stat, s) => (
                      <li key={s}>
                        <span>{stat.title}:</span> <span>{stat.value}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {model.acf.model_files && (
                  <>
                    <strong>{model.acf.file_names}</strong>
                    <ul>
                      {model.acf.model_files.map((mf, f) => (
                        <li key={f}>
                          {mf.title}:
                          <a
                            href={`${process.env.SOURCE_URL}${
                              mf.file.url.source_url
                            }`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            DOWNLOAD
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            </div>
          </ModelInfo>
        </Model>
      ))}
    </Fragment>
  )
}

export default withAccordion(ModelDetails)
