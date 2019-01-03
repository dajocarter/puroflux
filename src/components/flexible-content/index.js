import React, { Fragment } from 'react'

import FullWidthContent from './FullWidthContent'
import SplitContent from './SplitContent'

const getLayout = (layout, key) => ({
  WordPressAcf_full_width_content: <FullWidthContent key={key} acf={layout} />,
  WordPressAcf_split_content: <SplitContent key={key} acf={layout} />
})

const Layouts = ({ layouts }) => {
  return (
    <Fragment>
      {layouts &&
        layouts.map(
          (layout, index) => getLayout(layout, index)[layout.__typename]
        )}
    </Fragment>
  )
}

export default Layouts
