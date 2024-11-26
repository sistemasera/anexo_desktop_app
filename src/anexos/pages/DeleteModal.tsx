import Modal from '@/shared/components/Modal'
import React, { useContext, type ReactElement, useEffect, useState } from 'react'
import AnexosPageContext from '../hooks/anexosContext'
import Button from '@/shared/components/Button'
import { AnexoServices } from '../services/anexo.service'
import { ANEXO_INITIAL_STATE, type Anexo } from '../models/anexo.interface'
import { toast } from 'react-toastify'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  setIsOpen: (isOpen: boolean) => void
}

const DeleteModal = ({ isOpen, onClose, setIsOpen }: DeleteModalProps): ReactElement => {
  const { selectedAnexo, updateAnexos, toastId } = useContext(AnexosPageContext)

  const [anexo, setAnexo] = useState<Anexo>(ANEXO_INITIAL_STATE)

  useEffect(() => {
    if (selectedAnexo === null) {
      setIsOpen(false)
      return
    }

    setAnexo(selectedAnexo)
  }, [selectedAnexo])

  const onConfirm = (): void => {
    const anexosService = new AnexoServices()
    const id = anexo.id
    void anexosService.remove(id)
      .then(() => {
        onClose()
        updateAnexos({ type: 'delete', payload: anexo.id })
        toast('Anexo eliminado correctamente', { toastId, type: 'success' })
      })
      .catch((error) => {
        const { message } = error.data
        toast(message, { toastId, type: 'error' })
      })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='text-center'>
        <p className='text-lg'>¿Estás seguro que quieres eliminar el anexo de <span className='font-bold'>{selectedAnexo?.name} {selectedAnexo?.lastName}</span>?</p>
        <div className='flex justify-center items-center mt-4 gap-3'>
          <Button color='primary' onClick={onConfirm}>Confirmar</Button>
          <Button color='secondary' onClick={onClose}>Cancelar</Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal
