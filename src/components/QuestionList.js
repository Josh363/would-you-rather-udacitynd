import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

export const QuestionList = ({ user, qlist }) => {
  const [key, setKey] = useState('unanswered')

  const { id } = user
  let answeredQuestions = []
  let unansweredQuestions = []

  unansweredQuestions = qlist.filter((q) => {
    let votes1 = q['optionOne']['votes']
    let votes2 = q['optionTwo']['votes']
    return !votes1.includes(id) && !votes2.includes(id)
  })

  answeredQuestions = qlist.filter((q) => {
    let votes1 = q['optionOne']['votes']
    let votes2 = q['optionTwo']['votes']
    return votes1.includes(id) || votes2.includes(id)
  })

  unansweredQuestions.sort((x, y) => y['timestamp'] - x['timestamp'])
  answeredQuestions.sort((x, y) => y['timestamp'] - x['timestamp'])

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="unanswered" title="Unanswered">
        <div>
          <h1>Unanswered Polls</h1>
          <ListGroup>
            {unansweredQuestions.map((q) => {
              const { id, optionOne, optionTwo, timestamp } = q
              const date = new Date(timestamp)
              return (
                <ListGroup.Item key={id}>
                  <Link to={`/questions/${id}`} key={id}>
                    {`Would you rather ${optionOne.text} OR ${optionTwo.text}?`}
                  </Link>
                  <div className="dateString">{`posted at ${date.toDateString()}`}</div>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        </div>
      </Tab>
      <Tab eventKey="answered" title="Answered">
        <div>
          <h1>Answered Polls</h1>
          <ListGroup>
            {answeredQuestions.map((q) => {
              const { id, optionOne, optionTwo, timestamp } = q
              const date = new Date(timestamp)
              return (
                <ListGroup.Item key={id}>
                  <Link to={`/questions/${id}`} key={id}>
                    {`Would you rather ${optionOne.text} OR ${optionTwo.text}?`}
                  </Link>
                  <div className="dateString">{`posted at ${date.toDateString()}`}</div>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        </div>
      </Tab>
    </Tabs>
  )
}

function mapStateToProps({ questions, users, authedUser }, { qtype }) {
  const qlist = Object.keys(questions).map((qid) => questions[qid])
  return {
    qtype,
    qlist,
    user: users[authedUser],
  }
}

export default connect(mapStateToProps)(QuestionList)
