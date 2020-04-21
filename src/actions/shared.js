import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA'
import { addAnswerToQuestions, addQuestionToQuestions } from './questions'
import { addAnswerToUsers, addQuestionToUsers } from './users'

export function handleQuestionAnswer(authedUser, qid, answer) {
  return (dispatch) => {
    dispatch(addAnswerToQuestions(authedUser, qid, answer))
    dispatch(addAnswerToUsers(authedUser, qid, answer))

    return _saveQuestionAnswer({ authedUser, qid, answer }).catch((e) =>
      console.warn('Error: failed to save question Answer')
    )
  }
}

export function handleAddQuestion(questionObj) {
  return (dispatch) => {
    _saveQuestion(questionObj)
      .then((question) => {
        dispatch(addQuestionToQuestions(question))
        dispatch(addQuestionToUsers(question))
      })
      .catch((e) => console.warn('Error: failed to add question'))
  }
}
