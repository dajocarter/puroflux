import Form from 'react-bootstrap/Form'
import withForm from './with-form'

function ContactForm() {
  return (
    <>
      <Form.Group className='mb-3' controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control type='text' name='name' placeholder='Your name' />
      </Form.Group>
      <Form.Group className='mb-3' controlId='email'>
        <Form.Label>Email</Form.Label>
        <Form.Control type='email' name='_replyto' placeholder='Your email' />
      </Form.Group>
      <Form.Group className='mb-3' controlId='message'>
        <Form.Label>Message</Form.Label>
        <Form.Control as='textarea' name='message' placeholder='Your message' />
      </Form.Group>
      <Form.Group className='mb-3' controlId='location'>
        <Form.Label>Location</Form.Label>
        <Form.Control type='text' name='location' placeholder='Your location' />
      </Form.Group>
    </>
  )
}

export default withForm(ContactForm, 'Contact Us')
