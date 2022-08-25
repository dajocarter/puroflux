import WpApiClient from 'wordpress-api-client'
export const wpClient = new WpApiClient(`${process.env.SOURCE_URL}`, {
  auth: {
      type: 'basic',
      username: `${process.env.WP_USERNAME}`,
      password: `${process.env.WP_PASSWORD}`
  },
})