import React from 'react'
import AnexosPage from '@/anexos/pages/AnexosPage'
import Header from '@/shared/components/Header'

import 'react-toastify/dist/ReactToastify.css'

function App (): React.ReactElement {
  const [showLoading, setShowLoading] = React.useState<boolean>(true)

  const setLoadingOff = (isLoading: boolean): void => {
    if (!isLoading) {
      setShowLoading(true)
      return
    }

    setTimeout(() => {
      setShowLoading(false)
    }, 1000)
  }

  return (
    <div className='relative'>
      { showLoading && <div className='absolute top-0 right-0 w-screen h-screen z-10 bg-white'>
        <div className='h-full grid place-items-center'>
          <div className="relative">
            <div className="border-2 border-transparent absolute inset-0"></div>
            <img className="object-contain animate-zoom" src="logo.jpg" alt="Your image description" width={260}/>
          </div>
        </div>
      </div>}
      <Header />
      <div className='anexos-container'>
        <AnexosPage isLoading={showLoading} setIsLoadingOff={setLoadingOff} />
      </div>
    </div>
    // <h2>Anexos Page</h2>
  )
}

export default App
