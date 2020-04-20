import { LOG_IN, LOG_OUT } from '../actions/authedUser'

export default function authedUser(state = null, action) {
  switch (action.type) {
    case LOG_IN:
      return action.user_id
    case LOG_OUT:
      return null
    default:
      return state
  }
}
