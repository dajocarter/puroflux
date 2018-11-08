import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import {Container, Row, Col} from 'react-bootstrap'
import Carousel from 'react-bootstrap/lib/Carousel'
import styled from 'styled-components'

import Layout from '../components/layout'
import Hero from '../components/hero'

const Main = styled(Container)`
	padding: 45px 15px;
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const GalleryTemplate = () => (
  <StaticQuery
    query={graphql`
      query GalleryQuery {
        page: wordpressPage(template: { eq: "page_gallery.php" }) {
          content
          acf {
            content
            buttons {
              button_link {
                title
                target
                url
              }
            }
            gallery {
              id
              localFile {
                childImageSharp {
                  fluid(maxWidth: 768) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Layout>
        <Hero html={data.page.acf.content} links={data.page.acf.buttons} />
				<Main>
        	<Row>
						<Col xs={12}>
							{data.page.content && (
          			<Content dangerouslySetInnerHTML={{ __html: data.page.content }} />
        			)}
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							{data.page.acf.gallery &&
								<Carousel>
									{data.page.acf.gallery.map(img => (
										<Carousel.Item key={img.id}>
											<Img fluid={img.localFile.childImageSharp.fluid} />
										</Carousel.Item>
									))}
								</Carousel>
							}
						</Col>
					</Row>
				</Main>
      </Layout>
    )}
  />
)

export default GalleryTemplate
