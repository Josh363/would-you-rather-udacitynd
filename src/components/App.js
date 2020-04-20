import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions/authedUser'
import { handleReceiveUsers } from '../actions/users'
import { handleReceiveQuestions } from '../actions/questions'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'

import Login from './Login'
import NavBar from './NavBar'
import QuestionList from './QuestionList'
import Question from './Question'
import LeaderBoard from './LeaderBoard'
import NotFound from './NotFound'
import NewQuestion from './NewQuestion'

export const App = ({ authedUser, dispatch }) => {
  useEffect(() => {
    dispatch(handleReceiveQuestions())
    dispatch(handleReceiveUsers())
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BrowserRouter>
      <Container>
        <NavBar />
        {authedUser === null ? (
          <>
            <Login />
          </>
        ) : (
          <div>
            <div>
              {`Logged in as ${authedUser} `}
              <Button
                variant="danger"
                style={{ float: 'right' }}
                onClick={() => dispatch(logout(authedUser))}
              >
                Logout
              </Button>
            </div>
            <Switch>
              <Route exact path="/" component={QuestionList} />
              <Route path="/leaderboard" component={LeaderBoard} />
              <Route path="/add" component={NewQuestion} />
              <Route path="/questions/:qid" component={Question} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        )}
      </Container>
    </BrowserRouter>
  )
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps)(App)
