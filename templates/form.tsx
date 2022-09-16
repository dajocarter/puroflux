import Head from 'next/head'
import {
  HeroContent,
  HeroContentProps,
  HeroUnit
} from '../components/hero-unit'
import Layout from '../components/layout'
import styles from './form.module.scss'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ContactForm from '../components/forms/contact'
import NewsletterForm from '../components/forms/newsletter'
import Request3dForm from '../components/forms/request-3d'
import { PageProps } from '../pages/[slug]'
import { WordPressPage } from '../data/types'
import PageSEO from '../components/seo'

interface FormPage extends WordPressPage {
  template: 'page_form.php'
  acf: HeroContentProps & {
    form: 'newsletter' | 'request-3d' | 'contact'
  }
}
export interface FormPageProps extends PageProps {
  page: FormPage
}

export default function FormPage(props: FormPageProps) {
  return (
    <Layout {...props}>
      <PageSEO title={props.page.title.rendered} slug={props.page.slug} />

      <HeroUnit imgSrc={props.heroImg.media_details.sizes.full.source_url}>
        <HeroContent
          content={props.page.acf.content}
          buttons={props.page.acf.buttons}
        />
      </HeroUnit>

      <Container className={styles.main}>
        <Row>
          <Col xs={12}>
            <div className={styles.content}>
              {props.page.acf.form ? (
                props.page.acf.form === 'newsletter' ? (
                  <NewsletterForm />
                ) : (
                  <Request3dForm />
                )
              ) : (
                <ContactForm />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
