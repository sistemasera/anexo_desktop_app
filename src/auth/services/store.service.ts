import Store, { type Schema } from 'electron-store'
import { type User } from '../models/user.interface'

interface AppStorage {
  token: string
  user: User | null
}

const APP_STORAGE_SCHEMA: Schema<AppStorage> = {
  token: {
    type: 'string',
    default: 'token'
  },
  user: {
    default: null
  }
}

export class StoreService {
  store: Store<AppStorage>
  constructor () {
    this.store = new Store<AppStorage>({ schema: APP_STORAGE_SCHEMA })
  }

  getToken = (): string | null => {
    return this.store.get('token')
  }

  saveToken = (_token: string): void => {
    this.store.set('token', _token)
  }

  removeToken = (): void => {
    this.store.delete('token')
  }

  getUser = (): User | null => {
    return this.store.get('user')
  }

  saveUser = (user: User): void => {
    this.store.set('user', user)
  }

  removeUser = (): void => {
    this.store.delete('user')
  }
}
