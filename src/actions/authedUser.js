export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'

export function login(user_id) {
  return {
    type: LOG_IN,
    user_id,
  }
}

export function logout(user_id) {
  return {
    type: LOG_OUT,
  }
}
