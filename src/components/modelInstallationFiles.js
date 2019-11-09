import React from 'react'
import {
  string,
  oneOfType,
  bool,
  arrayOf,
  shape,
  number,
  array
} from 'prop-types'

const FileOutput = ({ title, files }) => (
  <div>
    <span>{title}: </span>
    {files && files.length ? (
      <ul>
        {files.map(({ file }) => (
          <li key={file.wordpress_id}>
            <a
              href={file.url.source_url}
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

FileOutput.propTypes = {
  title: string.isRequired,
  files: oneOfType([
    bool,
    arrayOf(
      shape({
        file: shape({
          wordpress_id: number.isRequired,
          title: string.isRequired,
          url: shape({
            source_url: string.isRequired
          }).isRequired
        })
      })
    )
  ])
}

const ModelInstallationFiles = ({
  slipStream,
  sweeperPiping,
  fullFlow,
  sideStream
}) => {
  return (
    <>
      {slipStream && <FileOutput title='Slip Stream' files={slipStream} />}
      {sweeperPiping && (
        <FileOutput title='Sweeper Piping' files={sweeperPiping} />
      )}
      {fullFlow && <FileOutput title='Full Flow' files={fullFlow} />}
      {sideStream && <FileOutput title='Side Stream' files={sideStream} />}
    </>
  )
}

ModelInstallationFiles.propTypes = {
  slipStream: oneOfType([bool, array]),
  sweeperPiping: oneOfType([bool, array]),
  fullFlow: oneOfType([bool, array]),
  sideStream: oneOfType([bool, array])
}

export default ModelInstallationFiles
