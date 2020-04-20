import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { handleAddQuestion } from '../actions/questions'

export const NewQuestion = ({ authedUser, dispatch }) => {
  const [optionOne, setOptionOne] = useState('')
  const [optionTwo, setOptionTwo] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(
      handleAddQuestion({
        optionOneText: optionOne,
        optionTwoText: optionTwo,
        author: authedUser,
      })
    )
    setSubmitted(true)
  }

  if (submitted) {
    return <Redirect to="/" />
  }

  return (
    <Fragment>
      <h1 style={{ textAlign: 'center' }}> Would you rather? </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="optionOne">
          <Form.Label>Option 1</Form.Label>
          <Form.Control
            placeholder="Enter your first option"
            onChange={(e) => setOptionOne(e.target.value)}
            value={optionOne}
          />
          <Form.Text className="text-muted">Remember to be creative!</Form.Text>
        </Form.Group>
        <Form.Group controlId="optionTwo">
          <Form.Label>Option 2</Form.Label>
          <Form.Control
            placeholder="Enter your second option"
            onChange={(e) => setOptionTwo(e.target.value)}
            value={optionTwo}
          />
        </Form.Group>
        <Button variant="primary" type="submit" size="lg">
          Submit
        </Button>
      </Form>
    </Fragment>
  )
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps)(NewQuestion)
