interface MenuItem {
  id: number
  order: number
  parent: number
  title: string
  url: string
  attr: string
  target: string
  classes: string
  xfn: string
  description: string
  object_id: number
  object: 'page' | 'post' | 'product' | 'series'
  object_slug: string
  type: 'post_type'
  type_label: 'Page' | 'Post' | 'Product' | 'Series'
  children?: MenuItem[]
}

export interface WordPressMenu {
  ID: number
  name: string
  slug: string
  description: string
  count: number
  items: MenuItem[]
  meta: {
    links: {
      collection: string
      self: string
    }
  }
}

export interface WordPressImage {
  ID: number
  id: number
  alt: string
  title: string
  caption: string
  sizes: {
    thumbnail: string
    'thumbnail-height': number
    'thumbnail-width': number
    medium: string
    'medium-height': number
    'medium-width': number
    medium_large: string
    'medium_large-height': number
    'medium_large-width': number
    large: string
    'large-height': number
    'large-width': number
    '1536x1536': string
    '1536x1536-height': number
    '1536x1536-width': number
    '2048x2048': string
    '2048x2048-height': number
    '2048x2048-width': number
  }
}

interface LinkedPost {
  ID: number
  post_content: string
  post_title: string
  post_name: string
}

export interface ProductPostType {
  id: number
  date: Date
  date_gmt: Date
  guid: {
    rendered: string
  }
  modified: Date
  modified_gmt: Date
  slug: string
  status: 'publish'
  type: 'product'
  link: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  featured_media: number
  template: string
  acf: {
    title: string | null
    image: WordPressImage | null
    product_series: LinkedPost[] | null
    description: string | null
    excerpt: string | null
    files?: { file: WordPressFile }[]
    datasheet?: WordPressFile | null
    'operation_&_maint_manual'?: WordPressFile | null
    sample_spec_sheet?: WordPressFile | null
  }
}

export interface RepPostType {
  id: number
  date: Date
  date_gmt: Date
  guid: {
    rendered: string
  }
  modified: Date
  modified_gmt: Date
  slug: string
  status: 'publish'
  type: 'rep'
  link: string
  title: {
    rendered: string
  }
  template: string
  states: number[]
  state?: string
  acf: {
    territory: string
    location?: {
      address: string
      lat: string
      lng: string
    }
    address: string
    phone_number: string
    fax_number: string
    website: string
  }
}

interface WordPressFile {
  ID: number
  id: number
  title: string
  filename: string
  url: string
  name: string
}

export interface SeriesPostType {
  id: number
  date: Date
  date_gmt: Date
  guid: {
    rendered: string
  }
  modified: Date
  modified_gmt: Date
  slug: string
  status: 'publish'
  type: 'series'
  link: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  featured_media: number
  template: string
  acf: {
    model_notes: string | null
    series_models: LinkedPost[] | null
    product_series: LinkedPost[] | null
    description: string | null
    datasheet: WordPressFile | null
    'operation_&_maint_manual': WordPressFile | null
    sample_spec_sheet: WordPressFile | null
    optional_file: WordPressFile | null
    slip_stream_files: { file: WordPressFile }[] | null
    sweeper_piping_files: { file: WordPressFile }[] | null
    full_flow_files: { file: WordPressFile }[] | null
    side_stream_files: { file: WordPressFile }[] | null
  }
}

export interface StatePostType {
  id: number
  count: number
  description: string
  link: string
  name: string
  slug: string
  taxonomy: 'state'
}
