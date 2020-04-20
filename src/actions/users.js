import { _getUsers } from '../utils/_DATA'
export const RECEIVE_USERS = 'RECEIVE_USERS'

// action creater
function receive_users(users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function handleReceiveUsers() {
  return (dispatch) => {
    _getUsers().then((users) => dispatch(receive_users(users)))
  }
}
