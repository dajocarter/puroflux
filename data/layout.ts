import { wpClient } from "."

const logoQueryParams = new URLSearchParams({
  slug: 'purofluxlogo_white_2x'
})

async function getHeaderData () {
  const [logo] = await wpClient.media().find(logoQueryParams)
  const headerDesktopMenu = await wpClient.headerDesktopMenu()
  const headerMobileMenu = await wpClient.headerMobileMenu()
  

  return {
    logo,
    navs: {
      desktop: headerDesktopMenu,
      mobile: headerMobileMenu
    }
  }
}

async function getFooterData () {
  const footerExploreMenu = await wpClient.footerExploreMenu()
  const footerPagesMenu = await wpClient.footerPagesMenu()

  return {
    navs: {
      explore: footerExploreMenu,
      pages: footerPagesMenu
    }
  }
}

export default async function getLayoutData () {
  const headerData = await getHeaderData()
  const footerData = await getFooterData()

  return {
    header: headerData,
    footer: footerData
  }
}