import React from 'react'
import { connect } from 'react-redux'
import { handleQuestionAnswer } from '../actions/shared'
import { Row, Col, Button } from 'react-bootstrap'
import { Check } from 'react-bootstrap-icons'

import NotFound from './NotFound'

export const Question = ({ question, authedUser, dispatch, user }) => {
  if (!question) {
    return <NotFound />
  }

  const { avatarURL } = user
  const { author, optionOne, optionTwo } = question

  const onSubmit = (answer) => {
    const qid = question.id
    dispatch(handleQuestionAnswer(authedUser, qid, answer))
  }

  const isQuestionAnswered = (uid, question) => {
    let votes1 = question.optionOne.votes
    let votes2 = question.optionTwo.votes
    return votes1.includes(uid) || votes2.includes(uid)
  }

  //stats logic
  const voterOne = question.optionOne.votes.length
  const voterTwo = question.optionTwo.votes.length
  const optionOneStats = (100 * voterOne) / (voterOne + voterTwo)
  const optionTwoStats = (100 * voterTwo) / (voterOne + voterTwo)

  return (
    <div>
      <h1>Would you rather</h1>
      <h4>{`posted by ${author}`} </h4>
      <img
        style={{ height: '100px', width: '100px' }}
        src={avatarURL}
        alt="user avatar"
      />
      <Row>
        <Col>
          <h2> Option 1 </h2>
          <p> {`${optionOne.text}`} </p>
          {question.optionOne.votes.includes(authedUser) && (
            <Check color="green" />
          )}
        </Col>
        <Col>
          <h2> Option 2</h2>
          <p> {`${optionTwo.text}`} </p>
          {question.optionTwo.votes.includes(authedUser) && (
            <Check color="green" />
          )}
        </Col>
      </Row>
      {!isQuestionAnswered(authedUser, question) ? (
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
              onClick={() => onSubmit('optionTwo')}
            >
              Choose Option 2
            </Button>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <p>{`${voterOne} people voted option 1 (${optionOneStats.toFixed(
              2
            )}%)`}</p>
          </Col>
          <Col>
            <p>{`${voterTwo} people voted option 2 (${optionTwoStats.toFixed(
              2
            )}%)`}</p>
          </Col>
        </Row>
      )}
    </div>
  )
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { qid } = props.match.params
  const question = questions[qid] ? questions[qid] : null
  return {
    question,
    authedUser,
    user: users[authedUser],
  }
}

export default connect(mapStateToProps)(Question)
