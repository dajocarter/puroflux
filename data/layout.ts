import { queryBySlug, wpClient } from '.'

async function getHeaderData() {
  const [logo] = await wpClient
    .media()
    .find(queryBySlug('purofluxlogo_white_2x'))
  const headerDesktopMenu = await wpClient.headerDesktopMenu()
  const headerMobileMenu = await wpClient.headerMobileMenu()
  const siteSettings = wpClient.siteSettings()
  const { title } = await siteSettings.find()

  return {
    logo,
    navs: {
      desktop: headerDesktopMenu,
      mobile: headerMobileMenu
    },
    siteTitle: title
  }
}

async function getFooterData() {
  const footerExploreMenu = await wpClient.footerExploreMenu()
  const footerPagesMenu = await wpClient.footerPagesMenu()

  return {
    navs: {
      explore: footerExploreMenu,
      pages: footerPagesMenu
    }
  }
}

export default async function getLayoutData() {
  const headerData = await getHeaderData()
  const footerData = await getFooterData()

  return {
    header: headerData,
    footer: footerData
  }
}
