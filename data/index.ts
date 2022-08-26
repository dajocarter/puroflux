import WpApiClient from 'wordpress-api-client'

const HEADER_DESKTOP_MENU_PATH = 'wp-api-menus/v2/menus/7'
const FOOTER_PAGES_MENU_PATH = 'wp-api-menus/v2/menus/8'
const FOOTER_EXPLORE_MENU_PATH = 'wp-api-menus/v2/menus/9'
const HEADER_MOBILE_MENU_PATH = 'wp-api-menus/v2/menus/63'

interface MENU_ITEM {
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
  object: 'page' | 'post'
  object_slug: string
  type: 'post_type'
  type_label: 'Page' | 'Post'
}

type WP_MENU_ITEM = MENU_ITEM & {
  children?: MENU_ITEM[]
}

interface WP_MENU {
  ID: number
  name: string
  slug: string
  description: string
  count: number
  items: WP_MENU_ITEM[]
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

  headerDesktopMenu = this.createEndpointCustomGet<WP_MENU>(
    HEADER_DESKTOP_MENU_PATH
  )
  headerMobileMenu = this.createEndpointCustomGet<WP_MENU>(
    HEADER_MOBILE_MENU_PATH
  )
  footerExploreMenu = this.createEndpointCustomGet<WP_MENU>(
    FOOTER_EXPLORE_MENU_PATH
  )
  footerPagesMenu = this.createEndpointCustomGet<WP_MENU>(
    FOOTER_PAGES_MENU_PATH
  )
}

export const wpClient = new WpClient()
