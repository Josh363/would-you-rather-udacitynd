import { _getUsers } from '../utils/_DATA'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_QUESTION_TO_USERS = 'ADD_QUESTION_TO_USERS'
export const ADD_ANSWER_TO_USERS = 'ADD_ANSWER_TO_USERS'

// action creaters
function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function addQuestionToUsers({ id, author }) {
  return {
    type: ADD_QUESTION_TO_USERS,
    id,
    author,
  }
}

export function addAnswerToUsers(authedUser, qid, answer) {
  return {
    type: ADD_ANSWER_TO_USERS,
    authedUser,
    qid,
    answer,
  }
}

//async
export function handleReceiveUsers() {
  return (dispatch) => {
    _getUsers()
      .then((res) => dispatch(receiveUsers(res)))
      .catch(() => console.warn('Error: failed to get users'))
  }
}
