import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/authedUser'
import { Form, Button } from 'react-bootstrap'

const Login = ({ users, dispatch }) => {
  const [selected, setSelected] = useState('')

  const handleChange = (e) => {
    const { value } = e.target
    setSelected(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selected) {
      dispatch(login(selected))
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="loginForm">
        <Form.Label className="text-center">Welcome</Form.Label>
        <Form.Control as="select" value={selected} onChange={handleChange}>
          <option>Please Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Button type="submit">Sign in</Button>
      </Form.Group>
    </Form>
  )
}

function mapStateToProps({ users }) {
  return {
    users: Object.values(users),
  }
}

export default connect(mapStateToProps)(Login)
