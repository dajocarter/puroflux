import WpApiClient, { DefaultEndpoint } from 'wordpress-api-client'
import { RepPostType, StatePostType, WordPressMenu } from './types'

const HEADER_DESKTOP_MENU_PATH = 'wp-api-menus/v2/menus/7'
const FOOTER_PAGES_MENU_PATH = 'wp-api-menus/v2/menus/8'
const FOOTER_EXPLORE_MENU_PATH = 'wp-api-menus/v2/menus/9'
const HEADER_MOBILE_MENU_PATH = 'wp-api-menus/v2/menus/63'

const REPS_POST_TYPE_PATH = 'wp/v2/reps'
const STATES_POST_TYPE_PATH = 'wp/v2/states'

class WpClient extends WpApiClient {
  constructor() {
    super(`${process.env.NEXT_PUBLIC_SOURCE_URL}`, {
      auth: {
        type: 'basic',
        username: `${process.env.NEXT_PUBLIC_WP_USERNAME}`,
        password: `${process.env.NEXT_PUBLIC_WP_PASSWORD}`
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

  public rep(): DefaultEndpoint<RepPostType> {
    return this.addPostType<RepPostType>(REPS_POST_TYPE_PATH)
  }

  public state(): DefaultEndpoint<StatePostType> {
    return this.addPostType<StatePostType>(STATES_POST_TYPE_PATH)
  }
}

export const wpClient = new WpClient()

export const queryBySlug = (slug: string) => new URLSearchParams({ slug })

export const formatPhoneNumber = (
  phoneNumber: string,
  formatType: 'back' | 'front' = 'back'
): string => {
  // Replace any non-number with an empty string and trim
  const numbersOnly = phoneNumber.replace(/\D/g, '').trim()
  // Group string of numbers into telephone parts
  const grouped = numbersOnly.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (!grouped) return phoneNumber
  let formatted
  switch (formatType) {
    case 'front':
      formatted = `(${grouped[1]}) ${grouped[2]}-${grouped[3]}`
      break
    case 'back':
    default:
      formatted = `${grouped[1]}-${grouped[2]}-${grouped[3]}`
      break
  }
  return formatted
}

export const formatURL = (url: string): string => {
  // Determine if the URL contains /wp-content/
  const filePath = 'wp-content/uploads'
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const httpLink = `http://${baseURL}`
  const httpsLink = `https://${baseURL}`
  let formattedURL = url
  if (url.match(filePath)) return url
  if (url.match(httpLink)) formattedURL = url.replace(httpLink, '')
  if (url.match(httpsLink)) formattedURL = url.replace(httpsLink, '')
  return formattedURL
}
