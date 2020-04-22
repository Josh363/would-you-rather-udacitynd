import { _getQuestions } from '../utils/_DATA'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION_TO_QUESTIONS = 'ADD_QUESTION_TO_QUESTIONS'
export const ADD_ANSWER_TO_QUESTIONS = 'ADD_ANSWER_TO_QUESTION'

// action creaters
function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function addQuestionToQuestions(question) {
  return {
    type: ADD_QUESTION_TO_QUESTIONS,
    question,
  }
}

export function addAnswerToQuestions(authedUser, qid, answer) {
  return {
    type: ADD_ANSWER_TO_QUESTIONS,
    authedUser,
    qid,
    answer,
  }
}

// async function
export function handleReceiveQuestions() {
  return (dispatch) => {
    _getQuestions()
      .then((res) => dispatch(receiveQuestions(res)))
      .catch(() => console.warn('Error: failed to get questions'))
  }
}
