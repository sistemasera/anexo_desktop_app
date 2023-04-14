export interface User {
  id: string
  username: string
}

export interface UserLogin extends Omit<User, 'id'> {
  password: string
}

export interface UserApiResponse {
  token: string
  user: User
}

export const USER_INITIAL_STATE: User = {
  id: '',
  username: ''
}

export const USER_LOGIN_INITIAL_STATE: UserLogin = {
  username: '',
  password: ''
}
