import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const FileOutput = ({ title, files }) => (
  <div>
    <span>{title}: </span>
    {files && files.length ? (
      <ul>
        {files.map(({ file }) => (
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

FileOutput.propTypes = {
  title: PropTypes.string.isRequired,
  files: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(
      PropTypes.shape({
        file: PropTypes.shape({
          wordpress_id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
          url: PropTypes.shape({
            source_url: PropTypes.string.isRequired,
          }).isRequired,
        }),
      })
    ),
  ]),
}

const ModelInstallationFiles = ({
  slipStream,
  sweeperPiping,
  fullFlow,
  sideStream,
}) => {
  return (
    <Fragment>
      {slipStream && <FileOutput title="Slip Stream" files={slipStream} />}
      {sweeperPiping && (
        <FileOutput title="Sweeper Piping" files={sweeperPiping} />
      )}
      {fullFlow && <FileOutput title="Full Flow" files={fullFlow} />}
      {sideStream && <FileOutput title="Side Stream" files={sideStream} />}
    </Fragment>
  )
}

ModelInstallationFiles.propTypes = {
  slipStream: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  sweeperPiping: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  fullFlow: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  sideStream: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
}

export default ModelInstallationFiles
