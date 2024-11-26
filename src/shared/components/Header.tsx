import React, { type ReactElement } from 'react'
import NavBar from './NavBar'

const Header = (): ReactElement => {
  return (
    <header className='shadow-md shadow-gray-300 py-2 mb-7'>
      <nav className='flex items-center justify-between mx-auto w-[92%]'>
        <div className='max-w-[200px]'>
          <img src="logo.jpg" alt="logo" />
        </div>
        <NavBar divLinksClasses='flex gap-2 items-center'/>
      </nav>
    </header>
  )
}

export default Header
