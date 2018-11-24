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

const ModelInstallationFiles = props => {
  return (
    <Fragment>
      {props.files.map(({ node }, i) => (
        <Model
          key={node.id}
          isOpen={props.openItem === i}
          handleOpening={props.handleOpening}
        >
          <ModelTitle
            role="button"
            onClick={() => props.handleOpening(i)}
            aria-expanded={props.openItem === i}
            aria-controls={`accordion--content-${i}`}
          >
            {node.title}
          </ModelTitle>
          <ModelInfo in={props.openItem === i}>
            <div id={`accordion--content-${i}`} className="accordion-content">
              {props.slipStream && (
                <div>
                  <span>Slip Stream: </span>
                  {node.acf.slip_stream_files ? (
                    <ul>
                      {node.acf.slip_stream_files.map(({ file }) => (
                        <li key={file.wordpress_id}>
                          <a
                            href={`${process.env.SOURCE_URL}${
                              file.url.source_url
                            }`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {file.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
              )}
              {props.sweeperPiping && (
                <div>
                  <span>Sweeper Piping: </span>
                  {node.acf.sweeper_piping_files ? (
                    <ul>
                      {node.acf.sweeper_piping_files.map(({ file }) => (
                        <li key={file.wordpress_id}>
                          <a
                            href={`${process.env.SOURCE_URL}${
                              file.url.source_url
                            }`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {file.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
              )}
              {props.fullFlow && (
                <div>
                  <span>Full Flow: </span>
                  {node.acf.full_flow_files ? (
                    <ul>
                      {node.acf.full_flow_files.map(({ file }) => (
                        <li key={file.wordpress_id}>
                          <a
                            href={`${process.env.SOURCE_URL}${
                              file.url.source_url
                            }`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {file.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
              )}
              {props.sideStream && (
                <div>
                  <span>Side Stream: </span>
                  {node.acf.side_stream_files ? (
                    <ul>
                      {node.acf.side_stream_files.map(({ file }) => (
                        <li key={file.wordpress_id}>
                          <a
                            href={`${process.env.SOURCE_URL}${
                              file.url.source_url
                            }`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {file.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
              )}
            </div>
          </ModelInfo>
        </Model>
      ))}
    </Fragment>
  )
}

export default withAccordion(ModelInstallationFiles)
