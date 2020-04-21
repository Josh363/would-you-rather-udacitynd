import {
  RECEIVE_QUESTIONS,
  ADD_QUESTION_TO_QUESTIONS,
  ADD_ANSWER_TO_QUESTIONS,
} from '../actions/questions'

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return action.questions

    case ADD_QUESTION_TO_QUESTIONS:
      const { question } = action
      return {
        ...state,
        [question.id]: question,
      }

    case ADD_ANSWER_TO_QUESTIONS:
      const { authedUser, qid, answer } = action
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat(authedUser),
          },
        },
      }
    default:
      return state
  }
}
