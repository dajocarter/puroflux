import React, { Fragment } from 'react'

const FileOutput = ({ title, files }) => (
  <div>
    <span>{title}: </span>
    {files && files.length ? (
      <ul>
        {files.map(({ file }) => (
          <li key={file.wordpress_id}>
            <a
              href={`${process.env.SOURCE_URL}${file.url.source_url}`}
              target='_blank'
              rel='noopener noreferrer'
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

const ModelInstallationFiles = ({ slipStream, sweeperPiping, fullFlow, sideStream }) => {
  return (
    <Fragment>
      {slipStream && (
        <FileOutput title='Slip Stream' files={slipStream} />
      )}
      {sweeperPiping && (
        <FileOutput title='Sweeper Piping' files={sweeperPiping} />
      )}
      {fullFlow && (
        <FileOutput title='Full Flow' files={fullFlow} />
      )}
      {sideStream && (
        <FileOutput title='Side Stream' files={sideStream} />
      )}
    </Fragment>
  )
}

export default ModelInstallationFiles
