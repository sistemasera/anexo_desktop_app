import React, { useEffect, useState, type ReactElement } from 'react'

import { type RootState, type AppDispatch } from '@/shared/store'
import { login } from '@/shared/store/features/auth-slice'
import { STATUS } from '@/shared/store/types'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import Button from '@/shared/components/Button'
import Input from '@/shared/components/Input'
import { type UserLogin, USER_LOGIN_INITIAL_STATE } from '@/auth/models/user.interface'

interface LoginFormProps {
  close: () => void
}

const LoginForm = ({ close }: LoginFormProps): ReactElement => {
  const dispatch = useDispatch<AppDispatch>()

  const [errorMessage, setErrorMessage] = useState(null)
  const [userLogin, setUserLogin] = useState<UserLogin>(USER_LOGIN_INITIAL_STATE)
  const [isValid, setIsValid] = useState<Record<string, boolean>>({
    username: false,
    password: false
  })

  const [hasFailed, setHasFailed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const loginStatus = useSelector<RootState>(({ auth }: RootState) => auth.status, shallowEqual)

  useEffect(() => {
    setHasFailed(loginStatus === STATUS.FAILED)
    setIsLoading(loginStatus === STATUS.PENDING)
  }, [loginStatus])

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    void dispatch(login(userLogin)).unwrap()
      .then(() => {
        close()
      })
      .catch((error: any) => {
        const { message } = error
        setErrorMessage(message.toUpperCase())
      })
  }

  const setIsValidInput = (name: string, value: boolean): void => {
    setIsValid({
      ...isValid,
      [name]: value
    })
  }

  const setValueInput = (name: string, value: string): void => {
    setUserLogin({
      ...userLogin,
      [name]: value
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='mt-2'>
        <Input
          value={userLogin.username}
          name='username' placeholder='Usuario' type='text'
          setValid={(valid) => { setIsValidInput('username', valid) }}
          setValue={(value) => { setValueInput('username', value) }}
        />
      </div>

      <div className='mt-2'>
        <Input
          value={userLogin.password}
          name='password' placeholder='Contraseña' type='password'
          setValid={(valid) => { setIsValidInput('password', valid) }}
          setValue={(value) => { setValueInput('password', value) }}
        />
      </div>

      <p className='text-center text-red font-bold mb-4'>{hasFailed ? errorMessage : ''}</p>
      <div className='flex gap-3 justify-center mt-5'>
        <Button color='primary' type='submit' isLoading={isLoading}>Login</Button>
        <Button color='secondary' onClick={close}>Cancel</Button>
      </div>

    </form>
  )
}

export default LoginForm
