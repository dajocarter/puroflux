import WpApiClient from 'wordpress-api-client'

const HEADER_DESKTOP_MENU_PATH = 'wp-api-menus/v2/menus/7'
const FOOTER_PAGES_MENU_PATH = 'wp-api-menus/v2/menus/8'
const FOOTER_EXPLORE_MENU_PATH = 'wp-api-menus/v2/menus/9'
const HEADER_MOBILE_MENU_PATH = 'wp-api-menus/v2/menus/63'

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

class WpClient extends WpApiClient {
  constructor() {
    super(`${process.env.SOURCE_URL}`, {
      auth: {
        type: 'basic',
        username: `${process.env.WP_USERNAME}`,
        password: `${process.env.WP_PASSWORD}`
      }
    })
  }

  headerDesktopMenu = this.createEndpointCustomGet<WordPressMenu>(
    HEADER_DESKTOP_MENU_PATH
  )
  headerMobileMenu = this.createEndpointCustomGet<WordPressMenu>(
    HEADER_MOBILE_MENU_PATH
  )
  footerExploreMenu = this.createEndpointCustomGet<WordPressMenu>(
    FOOTER_EXPLORE_MENU_PATH
  )
  footerPagesMenu = this.createEndpointCustomGet<WordPressMenu>(
    FOOTER_PAGES_MENU_PATH
  )
}

export const wpClient = new WpClient()
