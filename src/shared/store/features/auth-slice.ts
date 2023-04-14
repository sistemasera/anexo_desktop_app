import { type User, type UserLogin } from '@/auth/models/user.interface'
import { AuthServices } from '@/auth/services/auth.service'
import { StoreService } from '@/auth/services/store.service'
import { createAsyncThunk, createSlice, type SliceCaseReducers } from '@reduxjs/toolkit'
import { STATUS, type AUTH_STATE } from '../types'

const getInitialState = (): AUTH_STATE => {
  const storeService = new StoreService()
  const user = storeService.getUser()

  return {
    user,
    authenticated: user !== null,
    status: user !== null ? STATUS.SUCCEEDED : STATUS.IDLE
  }
}

const INITIAL_STATE: AUTH_STATE = getInitialState()

export const login = createAsyncThunk('login', async (userLogin: UserLogin, thunkAPI) => {
  const authService = new AuthServices()
  return await authService.login(userLogin)
    .then((response) => response)
    .catch((error) => thunkAPI.rejectWithValue(error))
})

export const register = createAsyncThunk('register', async () => {

})

const authSlice = createSlice<AUTH_STATE, SliceCaseReducers<AUTH_STATE>>({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    logout: (state, action) => {
      const authService = new AuthServices()
      authService.logout()
      state = getInitialState()
    }
  },
  extraReducers (builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = STATUS.PENDING
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        state.authenticated = true
        state.status = STATUS.SUCCEEDED
      })
      .addCase(login.rejected, (state, action) => {
        state.status = STATUS.FAILED
      })
  }
})

export const { logout } = authSlice.actions

export const getCurrentUser = (state: any): User | null | undefined => state.auth.user
export const isAuthenticated = (state: any): boolean => state.auth.authenticated

export default authSlice.reducer
