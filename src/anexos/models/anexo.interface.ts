export interface Anexo {
  id: string
  name: string
  lastName: string
  anexo: string
  fullName: string
}

export interface AnexoDto extends Omit<Anexo, 'id' | 'fullName'> {}

export const ANEXO_INITIAL_STATE = {
  id: '',
  name: '',
  lastName: '',
  anexo: '',
  fullName: ''
}
