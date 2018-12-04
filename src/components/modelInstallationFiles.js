import React, { Fragment } from 'react'

const FileOutput = props => (
  <div>
    <span>{props.title}: </span>
    {props.files.length ? (
      <ul>
        {props.files.map(({ file }) => (
          <li key={file.wordpress_id}>
            <a
              href={`${process.env.SOURCE_URL}${file.url.source_url}`}
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
)

const ModelInstallationFiles = props => {
  return (
    <Fragment>
      {props.slipStream && (
        <FileOutput title="Slip Stream" files={props.slipStream} />
      )}
      {props.sweeperPiping && (
        <FileOutput title="Sweeper Piping" files={props.sweeperPiping} />
      )}
      {props.fullFlow && (
        <FileOutput title="Full Flow" files={props.fullFlow} />
      )}
      {props.sideStream && (
        <FileOutput title="Side Stream" files={props.sideStream} />
      )}
    </Fragment>
  )
}

export default ModelInstallationFiles
