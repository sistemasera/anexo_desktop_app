import React, { type ReactElement } from 'react'
import Modal from '@/shared/components/Modal'
import { Dialog } from '@headlessui/react'

import LoginForm from './LoginForm'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps): ReactElement => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Dialog.Title className='text-center text-2xl pb-5 uppercase'>
        Login
      </Dialog.Title>

      <LoginForm close={onClose}/>
    </Modal>
  )
}

export default LoginModal
