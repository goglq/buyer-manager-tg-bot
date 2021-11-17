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
    return this._url
  }
}
