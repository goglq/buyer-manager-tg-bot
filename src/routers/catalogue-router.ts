import { FastifyPluginAsync } from 'fastify'
import fastifyCors from 'fastify-cors'
import Database from '../models/db'

interface IGetCatalogueParams {
  id: string
}

interface ICreateCatalogueBody {
  name: string
  url: string
}

interface IPatchCatalogueBody {
  name?: string
  url?: string
}

const catalogueRouter: FastifyPluginAsync = async (fastify, opt) => {
  fastify.get('/', async (req, res) => {
    const catalogues = await Database.instance.client.catalogue.findMany()
    return catalogues
  })

  fastify.get<{ Params: IGetCatalogueParams }>('/:id', async (req, res) => {
    const { id } = req.params
    const catalogue = await Database.instance.client.catalogue.findUnique({
      where: { id: parseInt(id) },
    })
    return catalogue
  })

  fastify.post<{ Body: ICreateCatalogueBody }>('/', async (req, res) => {
    const { name, url } = req.body
    const newCatalogue = await Database.instance.client.catalogue.create({
      data: { name: name, url: url },
    })
    return newCatalogue
  })

  fastify.put<{ Params: IGetCatalogueParams; Body: ICreateCatalogueBody }>(
    '/:id',
    async (req, res) => {
      const { id } = req.params
      const { name, url } = req.body

      const updatedCatalogue = await Database.instance.client.catalogue.update({
        data: { name: name, url: url },
        where: { id: parseInt(id) },
      })

      return updatedCatalogue
    }
  )

  fastify.patch<{ Params: IGetCatalogueParams; Body: ICreateCatalogueBody }>(
    '/:id',
    async (req, res) => {
      const { id } = req.params
      const { name, url } = req.body

      const patchedCatalogue = await Database.instance.client.catalogue.update({
        data: {
          name: name,
          url: url,
        },
        where: {
          id: parseInt(id),
        },
      })

      return patchedCatalogue
    }
  )

  fastify.delete<{ Params: IGetCatalogueParams }>('/:id', async (req, res) => {
    const { id } = req.params
    const deleted = await Database.instance.client.catalogue.delete({
      where: { id: parseInt(id) },
    })
    return deleted
  })
}

export default catalogueRouter

export const autoPrefix = '/catalogue'
