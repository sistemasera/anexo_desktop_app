import React from 'react'
import { type Anexo } from '@/anexos/models/anexo.interface'
import { type ReducerAction } from './anexosReducer'

export type FormSubmitAction = 'add' | 'update'

interface AnexosPageContextInterface {
  anexos: Anexo[]
  toastId: string
  selectedAnexo: Anexo | null
  formSubmitAction: FormSubmitAction
  updateAnexos: React.Dispatch<ReducerAction>
}

const AnexosPageContext = React.createContext<AnexosPageContextInterface>({
  anexos: [],
  toastId: '',
  selectedAnexo: null,
  formSubmitAction: 'add',
  updateAnexos: () => {}
})

export default AnexosPageContext
