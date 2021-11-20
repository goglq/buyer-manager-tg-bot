export interface ICatalogueDto {
  id: number
  name: string
  url: string
}

export interface IPictureLinkDto {
  id: number
  url: string
}

export interface IProductDto {
  id?: string
  name: string
  description: string
  catalogueId: string
  photoUrls: string[]
}

export interface IProductMessageDto {
  id: number
  name: string
  description: string
  catalogueUrl: string
  pictureUrls: string[]
}
