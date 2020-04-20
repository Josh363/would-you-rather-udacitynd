import { handleReceiveUsers } from './users'
import {
  _getQuestions,
  _saveQuestionAnswer,
  _saveQuestion,
} from '../utils/_DATA'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'

// action creaters
function receive_questions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

// async functions
export function handleReceiveQuestions() {
  return (dispatch) => {
    _getQuestions()
      .then((res) => dispatch(receive_questions(res)))
      .catch(() => console.assert('Error: failed to get questions'))
  }
}

export function handleAnswerQuestion(answerObject) {
  return (dispatch) => {
    _saveQuestionAnswer(answerObject)
      .then(() => {
        dispatch(handleReceiveQuestions())
        dispatch(handleReceiveUsers())
      })
      .catch((e) => console.assert('Error: failed to save poll'))
  }
}

export function handleAddQuestion(question) {
  return (dispatch) => {
    _saveQuestion(question)
      .then(() => {
        dispatch(handleReceiveQuestions())
        dispatch(handleReceiveUsers())
      })
      .catch((e) => console.assert('Error: failed to add question'))
  }
}
