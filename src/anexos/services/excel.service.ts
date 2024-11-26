import { AppServices } from '@/shared/service/api.service'

export class AnexosExcelService extends AppServices {
  constructor () {
    super({ baseUrl: 'anexos', contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  }

  exportExcel = async (): Promise<void> => {
    await this.get<any>('/export/anexos-excel', {
      responseType: 'blob'
    })
      .then(response => {
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        const downloadUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')

        link.href = downloadUrl
        link.download = 'anexos.xlsx'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
  }
}
