import { FastifyPluginAsync } from 'fastify'
import Database from '../models/db'

interface IGetProductParams {
  id: string
}

interface ICreateProductBody {
  name: string
  description: string
  catalogueId: string
}

const productRouter: FastifyPluginAsync = async (fastify, opt) => {
  fastify.get('/', async (req, res) => {
    const products = await Database.instance.client.product.findMany()
    return products
  })

  fastify.get<{ Params: IGetProductParams }>('/:id', async (req, res) => {
    const { id } = req.params
    const product = await Database.instance.client.product.findUnique({
      where: { id: parseInt(id) },
    })
    return product
  })

  fastify.post<{ Body: ICreateProductBody }>('/', async (req, res) => {
    const { name, description, catalogueId } = req.body
    const newProduct = await Database.instance.client.product.create({
      data: {
        name: name,
        description: description,
        catalogueId: parseInt(catalogueId),
      },
    })
    return newProduct
  })

  fastify.put<{ Params: IGetProductParams; Body: ICreateProductBody }>(
    '/:id',
    async (req, res) => {
      const { id } = req.params
      const { name, description, catalogueId } = req.body

      const updatedProduct = await Database.instance.client.product.update({
        data: {
          name: name,
          description: description,
          catalogueId: parseInt(catalogueId),
        },
        where: { id: parseInt(id) },
      })

      return updatedProduct
    }
  )

  fastify.patch<{ Params: IGetProductParams; Body: ICreateProductBody }>(
    ':id',
    async (req, res) => {
      const { id } = req.params
      const { name, description, catalogueId } = req.body

      const patchedCatalogue = await Database.instance.client.product.update({
        data: {
          name: name,
          description: description,
          catalogueId: parseInt(catalogueId),
        },
        where: {
          id: parseInt(id),
        },
      })

      return patchedCatalogue
    }
  )

  fastify.delete<{ Params: IGetProductParams }>('/:id', async (req, res) => {
    const { id } = req.params
    const deleted = await Database.instance.client.product.delete({
      where: { id: parseInt(id) },
    })
    return deleted
  })
}

export default productRouter

export const autoPrefix = '/product'
