import React from 'react'
import FullWidthContent, { FullWidthContentProps } from './full-width-content'
import SplitContent, { SplitContentProps } from './split-content'

export type Layouts = FullWidthContentProps | SplitContentProps

const getLayout = (layout: Layouts, key: number) => {
  if (layout.acf_fc_layout === 'full_width_content')
    return <FullWidthContent key={key} {...layout} />
  if (layout.acf_fc_layout === 'split_content')
    return <SplitContent key={key} {...layout} />
}

export default function FlexibleContent(props: { layouts: Layouts[] }) {
  return <>{props.layouts.map((layout, index) => getLayout(layout, index))}</>
}
