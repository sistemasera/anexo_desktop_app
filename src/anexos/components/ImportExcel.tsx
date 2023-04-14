
import React, { type ReactElement, useContext, useState } from 'react'
import { AnexoServices } from '../services/anexo.service'
import AnexosPageContext from '../hooks/anexosContext'
import Modal from '@/shared/components/Modal'
import { toast } from 'react-toastify'

interface ImportExcelProps {
  isOpen: boolean
  close: () => void
}

const ImportExcel = ({ isOpen, close }: ImportExcelProps): ReactElement => {
  const { anexos, updateAnexos, toastId } = useContext(AnexosPageContext)
  const [file, setFile] = useState<File | null | undefined>(null)
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    const anexosService = new AnexoServices()
    event.preventDefault()

    if (file === null || file === undefined) {
      setError('No se ha subido ningún archivo')
      return
    }

    setIsLoading(true)
    const formData = new FormData()
    formData.append('excel-file', file)
    void anexosService.importExcel(formData)
      .then(response => {
        updateAnexos({ type: 'set', payload: [...anexos, ...response] })
        toast('Anexos importados correctamente', { toastId, type: 'success' })
        close()
      })
      .catch(error => {
        const { message } = error
        toast(message, { toastId, type: 'error' })
        setError(message)
      }).finally(() => {
        setIsLoading(false)
      })
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.item(0)

    if (file) {
      const { name } = file
      const lastDot = name.lastIndexOf('.')
      const ext = name.substring(lastDot + 1)

      if (!['xlsx', 'xlsm', 'xls', 'xlt', 'xlsb'].includes(ext)) {
        setError('El archivo no tiene la extension correcta')
        event.target.value = ''
        return
      } else {
        setError('')
      }
    }

    setFile(file)
  }

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <div className='p-5'>
        {isLoading && (
          <div className='bg-gray-light absolute top-0 left-0 w-full h-full rounded-xl after:absolute after:w-10 after:h-10 after:top-0 after:right-0 after:left-0 after:bottom-0 after:m-auto after:border-8 after:border-t-white after:opacity-100 after:rounded-[50%] after:animate-spin'>
          </div>
        )}
        <h1 className='block uppercase text-center text-xl font-bold'>Import excel</h1>
        <form onSubmit={handleSubmit}>
          <div className='mt-5'>
            <input onChange={onChange} type="file" accept='.xlsx,.xlsm,.xls,.xlt,.xlsb' />
            <p className='m-0 mt-1 text-red lowercase'>{error}</p>
          </div>

          <div className='mt-5 flex gap-3 justify-center'>
            <button className='bg-black text-white px-5 py-1 rounded-lg text-lg' type='button' onClick={close}>Cancel</button>
            <button className={'relative bg-red text-white px-5 py-1 rounded-lg text-lg'} type='submit'>Submit</button>
          </div>
        </form>
      </div>

    </Modal>
  )
}

export default ImportExcel
