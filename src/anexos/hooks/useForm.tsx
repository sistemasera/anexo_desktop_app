import { type Anexo } from '@/anexos/models/anexo.interface'
import { useCallback, useReducer, type ChangeEvent } from 'react'

type FormAction = {
  type: 'ON_CHANGE'
  payload: {
    name: string
    value: string
  }
} |
{
  type: 'CLEAR'
}

type FormReducer = (state: Anexo, action: FormAction) => Anexo

const useForm = (
  initialState: Anexo): [
    Anexo,
    (event: ChangeEvent<HTMLInputElement>) => void,
    () => void
  ] => {
  const formReducer: FormReducer = useCallback((state, action) => {
    switch (action.type) {
      case 'ON_CHANGE': {
        const { name, value } = action.payload
        return {
          ...state,
          [name]: value
        }
      }
      case 'CLEAR': {
        return initialState
      }
    }
  }, [])

  const [state, dispatch] = useReducer(formReducer, initialState)

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    dispatch({ type: 'ON_CHANGE', payload: { name, value } })
  }, [])

  const resetForm = useCallback((): void => {
    dispatch({ type: 'CLEAR' })
  }, [])

  return [state, handleChange, resetForm]
}

export default useForm
