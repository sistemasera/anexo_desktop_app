import { type Anexo } from '../models/anexo.interface'

export type ReducerAction =
  | { type: 'set', payload: Anexo[] }
  | { type: 'add', payload: Anexo }
  | { type: 'update', payload: Anexo }
  | { type: 'delete', payload: string }

const anexosReducer = (state: Anexo[], action: ReducerAction): Anexo[] => {
  switch (action.type) {
    case 'add': {
      return [...state, action.payload]
    }
    case 'update': {
      return state.map(anexo => anexo.id === action.payload.id ? action.payload : anexo)
    }
    case 'delete': {
      return state.filter(anexo => anexo.id !== action.payload)
    }
    case 'set': {
      return action.payload
    }
  }
}

export default anexosReducer
