import React, { useCallback, useContext, useMemo, type ReactElement, useState, useEffect, type FormEvent } from 'react'
import { type Anexo, ANEXO_INITIAL_STATE } from '@/anexos/models/anexo.interface'
import useForm from '@/anexos/hooks/useForm'
import Button from '@/shared/components/Button'
import AnexosPageContext from '../hooks/anexosContext'
import { AnexoServices } from '../services/anexo.service'
import { toast } from 'react-toastify'

interface AnexoFormProps {
  close: () => void
}

const AnexoForm = ({ close }: AnexoFormProps): ReactElement => {
  const { selectedAnexo, formSubmitAction, updateAnexos, toastId } = useContext(AnexosPageContext)
  const [error, setError] = useState<string>('')

  const initialState = useMemo(() => {
    if (selectedAnexo === null) return ANEXO_INITIAL_STATE

    return formSubmitAction === 'add' ? ANEXO_INITIAL_STATE : selectedAnexo
  }, [formSubmitAction])

  const [anexoForm, handleChange, resetForm] = useForm(initialState)

  const validateDto = (anexoDto: Omit<Anexo, 'id' | 'fullName'>): boolean => {
    const values = Object.values(anexoDto)
    console.log(JSON.stringify(values))
    console.log(values.every(value => String(value).trim().length > 0))
    return values.every(value => String(value).trim().length > 0)
  }

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const anexosService = new AnexoServices()

    const { id, fullName, ...anexoDto } = anexoForm

    const submitAction = formSubmitAction === 'add' ? anexosService.create : anexosService.update

    if (!validateDto(anexoDto)) {
      setError('Todos los campos son obligatorios')
      return
    }

    void submitAction(anexoDto, id)
      .then(response => {
        updateAnexos({ type: formSubmitAction, payload: response })
        toast(`Anexo ${formSubmitAction === 'add' ? 'agregado' : 'actualizado'} correctamente`, { toastId, type: 'success' })
        close()
      })
      .catch(error => {
        const { message } = error
        toast(message, { toastId, type: 'error' })
      })
  }, [formSubmitAction, anexoForm])

  useEffect(() => {
    setError('')
  }, [anexoForm])

  return (
      <form onSubmit={handleSubmit} className='pt-2'>
      <div className='flex items-end gap-4 mb-4'>
        <label className='w-[20%] font-semibold'>Nombre</label>
        <input
          className='w-full border-b border-b-gray-400 focus:outline-none focus:border-blue'
          type="text" name='name' value={anexoForm.name} onChange={handleChange} />
      </div>

      <div className='flex items-center gap-4 mb-4'>
        <label className='w-[20%] font-semibold'>Apellido</label>
        <input
          className='w-full border-b border-b-gray-400 focus:outline-none focus:border-blue'
          type="text" name='lastName' value={anexoForm.lastName} onChange={handleChange} />
      </div>

      <div className='flex items-center gap-4 mb-6'>
        <label className='w-[20%] font-semibold'>Anexo</label>
        <input
          className='w-full border-b border-b-gray-400 focus:outline-none focus:border-blue'
          type="text" name='anexo' value={anexoForm.anexo} onChange={handleChange} />
      </div>

      <p className='uppercase text-red font-semibold text-sm'>{error}</p>
      <div className='flex justify-center items-center gap-4 mt-3'>
        <Button color='primary' type='submit'>Submit</Button>
        <Button color='success' onClick={resetForm}>Reset</Button>
        <Button color='secondary' onClick={close}>Cancel</Button>
      </div>
    </form>
  )
}

export default AnexoForm
