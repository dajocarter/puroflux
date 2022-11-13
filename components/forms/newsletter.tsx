import Form from 'react-bootstrap/Form'
import withForm from './with-form'

const NewsletterForm = () => (
  <>
    <Form.Group className='mb-3' controlId='name'>
      <Form.Label>Name</Form.Label>
      <Form.Control type='text' name='name' placeholder='Your name' />
    </Form.Group>
    <Form.Group className='mb-3' controlId='email'>
      <Form.Label>Email</Form.Label>
      <Form.Control type='email' name='_replyto' placeholder='Your email' />
    </Form.Group>
  </>
)

export default withForm(NewsletterForm, 'Newsletter')
