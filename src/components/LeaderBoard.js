import React, { Fragment } from 'react'
import { ListGroup } from 'react-bootstrap'
import { connect } from 'react-redux'

const LeaderBoard = ({ users }) => {
  users.sort((a, b) => findSum(b) - findSum(a))

  return (
    <Fragment>
      <h1 style={{ textAlign: 'center' }}> Leaderboard </h1>
      <ListGroup>
        {users.map((user) => {
          const { id, name, questions, answers, avatarURL } = user
          let answerLength = Object.values(answers).length
          let questionLength = questions.length
          return (
            <ListGroup.Item key={id} action variant="secondary">
              <img src={avatarURL} alt="user avatar"></img>
              <p>{name}</p>
              <p>
                {`posted ${questionLength} questions and answered ${answerLength}`}
              </p>
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    </Fragment>
  )
}

//calculate sum of questions and answers for users
const findSum = (user) => {
  let answerLength = Object.values(user.answers).length
  let questionLength = user.questions.length
  return answerLength + questionLength
}

function mapStateToProps({ users }) {
  return {
    users: Object.values(users),
  }
}

export default connect(mapStateToProps)(LeaderBoard)
