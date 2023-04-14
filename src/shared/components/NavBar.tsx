import React, { useState, type ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isAuthenticated, logout } from '@/shared/store/features/auth-slice'
import Button from './Button'
import LoginModal from '@/auth/pages/LoginModal'

interface NavBarProps {
  divLinksClasses?: string
}

const NavBar = ({ divLinksClasses }: NavBarProps): ReactElement => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(isAuthenticated)

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false)

  const handleLogout = (): void => {
    dispatch(logout({}))
    location.reload()
  }

  const handleLogin = (): void => {
    toggleLoginModal()
  }

  const toggleLoginModal = (): void => {
    setIsLoginModalOpen(!isLoginModalOpen)
  }

  return (
    <>
      <div className={`${divLinksClasses ?? ''}`} >
        {!isLoggedIn
          ? <Button color='primary' onClick={handleLogin}>Login</Button>
          : <Button color='secondary' onClick={handleLogout}>Logout</Button>
        }
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={toggleLoginModal}/>
    </>
  )
}

export default NavBar
