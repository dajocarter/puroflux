import Form from 'react-bootstrap/Form'
import withForm from './with-form'

const Request3dForm = () => (
  <>
    <Form.Group className='mb-3' controlId='name'>
      <Form.Label>Name</Form.Label>
      <Form.Control type='text' name='name' placeholder='Your name' />
    </Form.Group>
    <Form.Group className='mb-3' controlId='email'>
      <Form.Label>Email</Form.Label>
      <Form.Control type='email' name='_replyto' placeholder='Your email' />
    </Form.Group>
    <Form.Group className='mb-3' controlId='company'>
      <Form.Label>Company</Form.Label>
      <Form.Control type='text' name='company' placeholder='Your company' />
    </Form.Group>
    <Form.Group className='mb-3' controlId='model'>
      <Form.Label>Model</Form.Label>
      <Form.Control
        type='text'
        name='model'
        placeholder='Requested model name'
      />
    </Form.Group>
  </>
)

export default withForm(Request3dForm, '3D Request Form')
