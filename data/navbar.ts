import { wpClient } from "."

const logoQueryParams = new URLSearchParams({
  slug: 'purofluxlogo_white_2x'
})

export default async function getNavbarData () {
  const [logo] = await wpClient.media().find(logoQueryParams)

  return {
    logo
  }
}

