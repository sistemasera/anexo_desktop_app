import React, { type ReactElement, useEffect, useState, useMemo, useReducer } from 'react'
import { type Anexo } from '@/anexos/models/anexo.interface'
import { AnexoServices } from '@/anexos/services/anexo.service'
import Table, { type Action, type Column } from '@/shared/components/table/Table'
import Button from '@/shared/components/Button'
import { useSelector } from 'react-redux'
import { isAuthenticated } from '@/shared/store/features/auth-slice'
import EditIcon from '@/shared/assets/EditIcon'
import DeleteIcon from '@/shared/assets/DeleteIcon'
import AnexoModal from './AnexoModal'
import AnexosPageContext, { type FormSubmitAction } from '@/anexos/hooks/anexosContext'
import anexosReducer from '../hooks/anexosReducer'
import ImportExcel from '../components/ImportExcel'
import Toast from '@/shared/components/Toast'
import { AnexosExcelService } from '../services/excel.service'
import DeleteModal from './DeleteModal'

const TOAST_ID = 'anexos'

interface AnexosPageProps {
  isLoading: boolean
  setIsLoadingOff: (isLoading: boolean) => void
}

const AnexosPage = ({ isLoading, setIsLoadingOff }: AnexosPageProps): ReactElement => {
  const authenticated = useSelector(isAuthenticated)
  const [anexos, dispatch] = useReducer(anexosReducer, [])
  const [showFilters, setShowFilters] = useState<boolean>(true)

  const [showAnexoModal, setShowAnexoModal] = useState<boolean>(false)
  const [showImportExcelModal, setShowImportExcelModal] = useState<boolean>(false)

  const [formSubmitAction, setFormSubmitAction] = useState<FormSubmitAction>('add')
  const [selectedAnexo, setSelectedAnexo] = useState<Anexo | null>(null)

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [isExcelLoading, setIsExcelLoading] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

  useEffect(() => {
    updateAnexos()
  }, [])

  const updateAnexos = (): void => {
    setIsLoadingOff(false)
    setIsRefreshing(true)
    const anexosService = new AnexoServices()
    void anexosService.getAll()
      .then(response => {
        dispatch({ type: 'set', payload: response })
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoadingOff(true)
        setIsRefreshing(false)
      })
  }

  const toggleFilters = (): void => {
    setShowFilters(!showFilters)
  }

  const toggleAnexoModal = (): void => {
    setShowAnexoModal(!showAnexoModal)
  }

  const toggleDeleteModal = (): void => {
    setIsDeleteModalOpen(!isDeleteModalOpen)
  }

  const add = (): void => {
    toggleAnexoModal()
    setFormSubmitAction('add')
    setSelectedAnexo(null)
  }

  const update = (anexo: Anexo): void => {
    toggleAnexoModal()
    setFormSubmitAction('update')
    setSelectedAnexo(anexo)
  }
  const importExcel = (): void => {
    setShowImportExcelModal(!showImportExcelModal)
  }

  const remove = (anexo: Anexo): void => {
    setSelectedAnexo(anexo)
    setIsDeleteModalOpen(true)
  }

  const ANEXO_COLUMNS: Array<Column<Anexo>> = [
    {
      id: 'name',
      columnName: 'Nombre',
      filterFunc: (anexo) => anexo.name,
      render: (anexo) => anexo.name.toUpperCase(),
      sortFunc: (a, b) => a.name > b.name ? 1 : -1
    },
    {
      id: 'lastName',
      columnName: 'Apellido',
      filterFunc: (anexo) => anexo.lastName,
      render: (anexo) => anexo.lastName.toUpperCase(),
      sortFunc: (a, b) => a.lastName > b.lastName ? 1 : -1
    },
    {
      id: 'anexo',
      columnName: 'Anexo',
      filterFunc: (anexo) => anexo.anexo,
      render: (anexo) => anexo.anexo,
      sortFunc: (a, b) => a.anexo > b.anexo ? 1 : -1
    }
  ]

  // const ANEXO_PAGINATION = [5, 10, 15, 20]

  const ANEXO_ACTIONS = useMemo(() => {
    const actions: Array<Action<Anexo>> = [
      {
        icon: () => (<EditIcon className='cursor-pointer w-5 h-5' />),
        actionFunc: update
      },
      {
        icon: () => (<DeleteIcon className='cursor-pointer w-5 h-5 text-red' />),
        actionFunc: remove
      }
    ]

    return authenticated ? actions : undefined
  }, [authenticated])

  const exportExcel = (): void => {
    setIsExcelLoading(true)
    const anexosExcelService = new AnexosExcelService()
    void anexosExcelService.exportExcel()
      .then(() => {
        setIsExcelLoading(false)
      })
  }

  return (
    <AnexosPageContext.Provider value={{ anexos, selectedAnexo, formSubmitAction, updateAnexos: dispatch, toastId: TOAST_ID }}>
      <div className='flex flex-col justify-between mb-5 md:flex-row md:items-center md:gap-0'>
        <h1 className='mb-4 text-blue-dark uppercase text-3xl font-bold after:block after:w-[100px] after:h-[2px] after:bg-gray-200 lg:mb-0'>Anexos</h1>
        <div className='flex gap-3 flex-col sm:flex-row'>
          {authenticated && (
            <div className='flex gap-3'>
              <Button color='primary' onClick={importExcel}>Importar Excel</Button>
              <Button color='secondary' onClick={add}>Añadir Anexo</Button>
            </div>
          )}
          <div className='flex gap-3'>
            <Button color='primary' onClick={toggleFilters}>{showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}</Button>
            <Button color='secondary' onClick={updateAnexos} isLoading={isRefreshing}>Refrescar anexos</Button>
            <Button color='success' onClick={exportExcel} isLoading={isExcelLoading}>Exportar Excel</Button>
          </div>
        </div>
      </div>
      { !isLoading && <Table data={anexos} columns={ANEXO_COLUMNS} showFilter={showFilters} actions={ANEXO_ACTIONS} />}

      <DeleteModal isOpen={isDeleteModalOpen} onClose={toggleDeleteModal} setIsOpen={setIsDeleteModalOpen} />
      <AnexoModal isOpen={showAnexoModal} onClose={toggleAnexoModal} />
      <ImportExcel isOpen={showImportExcelModal} close={importExcel} />
      <Toast id={TOAST_ID} />
    </AnexosPageContext.Provider>
  )
}

export default AnexosPage
