
import { AppServices } from '@/shared/service/api.service'
import { StatusCodes } from 'http-status-codes'
import { type User, type UserApiResponse, type UserLogin } from '../models/user.interface'
import { StoreService } from './store.service'

export class AuthServices extends AppServices {
  storeService: StoreService

  constructor () {
    super({ baseUrl: 'auth', contentType: 'application/json' })
    this.storeService = new StoreService()
  }

  login = async (userLogin: UserLogin): Promise<User | null | undefined> => {
    return await this.post<UserApiResponse>('/login', userLogin)
      .then(response => {
        if (response.status === StatusCodes.OK) {
          const { token, user } = response.data
          const { id, username } = user

          const userStorage: User = {
            id,
            username
          }

          this.storeService.saveToken(token)
          this.storeService.saveUser(userStorage)

          return userStorage
        }
      })
  }

  logout = (): void => {
    this.storeService.removeToken()
    this.storeService.removeUser()
  }
}
