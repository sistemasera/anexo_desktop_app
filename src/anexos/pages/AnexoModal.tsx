import React, { useContext, type ReactElement } from 'react'
import { Dialog } from '@headlessui/react'
import Modal from '@/shared/components/Modal'
import AnexoForm from '@/anexos/components/AnexoForm'
import AnexosPageContext from '../hooks/anexosContext'

interface AnexoModalProps {
  isOpen: boolean
  onClose: () => void
}

const AnexoModal = ({ isOpen, onClose }: AnexoModalProps): ReactElement => {
  const { formSubmitAction } = useContext(AnexosPageContext)
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Dialog.Title className='text-center text-2xl pb-5 uppercase'>
        { formSubmitAction === 'add' ? 'Añadir nuevo' : 'Editar' } Anexo
      </Dialog.Title>

      <AnexoForm close={onClose}/>
    </Modal>
  )
}

export default AnexoModal
