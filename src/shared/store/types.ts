import { type User } from '@/auth/models/user.interface'

export enum STATUS {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed'
}

export interface AUTH_STATE {
  user: User | null | undefined
  authenticated: boolean
  status: STATUS
}
