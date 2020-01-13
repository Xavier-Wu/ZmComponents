import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UserIdKey = 'Admin-User-Id'
const JumpList = 'Admin-Jump-List'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 1 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserId() {
  return Cookies.get(UserIdKey)
}

export function setUserId(token) {
  return Cookies.set(UserIdKey, token)
}

export function removeUserId() {
  return Cookies.remove(UserIdKey)
}

export function getJumpList() {
  return Cookies.get(JumpList)
}
