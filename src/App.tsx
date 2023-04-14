import React from 'react'
import AnexosPage from '@/anexos/pages/AnexosPage'
import Header from '@/shared/components/Header'

import 'react-toastify/dist/ReactToastify.css'

function App (): React.ReactElement {
  return (
    <>
      <Header />
      <div className='anexos-container'>
        <AnexosPage />
      </div>
    </>
    // <h2>Anexos Page</h2>
  )
}

export default App
