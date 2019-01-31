import React from 'react'
import Helmet from 'react-helmet'

export default React.memo(
  ({
    url,
    title,
    description,
    image
  }) => {
    const schema = [
      {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        url,
        name: title,
        description,
        image: {
          '@type': 'ImageObject',
          url: image
        }
      }
    ]

    return (
      <Helmet>
        {/* Schema.org tags */}
        <script type='application/ld+json'>{JSON.stringify(schema)}</script>
      </Helmet>
    )
  }
)
