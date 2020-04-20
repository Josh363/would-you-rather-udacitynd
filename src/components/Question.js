import React from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'
import { Row, Col, Button } from 'react-bootstrap'
import { Check } from 'react-bootstrap-icons'

import NotFound from './NotFound'

export const Question = ({ question, authedUser, dispatch }) => {
  const { author, optionOne, optionTwo } = question

  const onSubmit = (answer) => {
    const qid = question.id
    dispatch(
      handleAnswerQuestion({
        authedUser,
        qid,
        answer,
      })
    )
  }

  if (!question) {
    return <NotFound />
  }

  const stats = questionAnswered(authedUser, question)
    ? computeStatistics(question)
    : null

  return (
    <div>
      <h1>Would you rather</h1>
      <h4>{`posted by ${author}`} </h4>
      <Row>
        <Col>
          <h2> Option 1 </h2>
          <p> {`${optionOne['text']}`} </p>
          {question['optionOne']['votes'].includes(authedUser) && (
            <Check color="green" />
          )}
        </Col>
        <Col>
          <h2> Option 2</h2>
          <p> {`${optionTwo['text']}`} </p>
          {question['optionTwo']['votes'].includes(authedUser) && (
            <Check color="green" />
          )}
        </Col>
      </Row>
      {!questionAnswered(authedUser, question) ? (
        <Row>
          <Col>
            <Button
              variant="outline-primary"
              onClick={() => onSubmit('optionOne')}
            >
              Choose Option 1
            </Button>
          </Col>
          <Col>
            <Button
              variant="outline-primary"
              onClick={() => onSubmit('optionOne')}
            >
              Choose Option 1
            </Button>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <p>{`${
              stats.voterOne
            } people voted option 1 (${stats.percentOne.toFixed(2)}%)`}</p>
          </Col>
          <Col>
            <p>{`${
              stats.voterTwo
            } people voted option 2 (${stats.percentTwo.toFixed(2)}%)`}</p>
          </Col>
        </Row>
      )}
    </div>
  )
}

function computeStatistics(question) {
  let voterOne = question['optionOne']['votes'].length
  let voterTwo = question['optionTwo']['votes'].length

  return {
    voterOne,
    voterTwo,
    voterAll: voterOne + voterTwo,
    percentOne: (100 * voterOne) / (voterOne + voterTwo),
    percentTwo: (100 * voterTwo) / (voterOne + voterTwo),
  }
}

function questionAnswered(uid, question) {
  let votes1 = question['optionOne']['votes']
  let votes2 = question['optionTwo']['votes']
  return votes1.includes(uid) || votes2.includes(uid)
}

function mapStateToProps({ authedUser, questions }, props) {
  const { qid } = props.match.params
  const question = questions[qid] ? questions[qid] : null
  return {
    question,
    authedUser,
  }
}

export default connect(mapStateToProps)(Question)
