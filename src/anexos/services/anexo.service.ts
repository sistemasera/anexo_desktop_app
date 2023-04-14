
import { AppServices } from '@/shared/service/api.service'
import { type AnexoDto, type Anexo } from '@/anexos/models/anexo.interface'

export class AnexoServices extends AppServices {
  constructor () {
    super({ baseUrl: 'anexos', contentType: 'application/json' })
  }

  getAll = async (): Promise<Anexo[]> => {
    return await this.get<Anexo[]>('')
      .then(response => response.data)
  }

  getById = async (id: string): Promise<Anexo> => {
    return await this.get<Anexo>(`/${id}`)
      .then(response => response.data)
  }

  create = async (anexo: AnexoDto): Promise<Anexo> => {
    return await this.post<Anexo>('', anexo)
      .then(response => response.data)
  }

  importExcel = async (file: any): Promise<Anexo[]> => {
    return await this.post<Anexo[]>('/import-excel', file)
      .then(response => response.data)
  }

  update = async (anexo: AnexoDto, id: string): Promise<Anexo> => {
    return await this.patch<Anexo>(`/${id}`, anexo)
      .then(response => response.data)
  }

  remove = async (id: string): Promise<Anexo> => {
    return await this.delete<Anexo>(`/${id}`)
      .then(response => response.data)
  }
}
