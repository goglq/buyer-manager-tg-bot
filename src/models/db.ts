import { PrismaClient } from '@prisma/client'

export default class Database {
  private static _instance: Database

  public static get instance() {
    if (!this._instance) {
      this._instance = new Database()
    }
    return this._instance
  }

  private _client: PrismaClient

  private constructor() {
    this._client = new PrismaClient()
  }

  public get client() {
    return this._client
  }
}
