export default class Link {
  private _name: string

  private _url: string

  constructor(name: string, url: string) {
    this._name = name
    this._url = url
  }

  public get name() {
    return this._name
  }

  public get url() {
    return `https://t.me/${this._url}`
  }

  public get telegram() {
    return this._url
  }
}
