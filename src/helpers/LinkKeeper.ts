import Link from './Link'

export default class LinkKeeper {
  private static _instance: LinkKeeper

  private _supportLink: Link

  private constructor() {
    this._supportLink = new Link('Связаться с нами', 'https://tg.me')
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new LinkKeeper()
    }
    return this._instance
  }

  public get supportLink() {
    return this._supportLink
  }

  public set supportLink(value) {
    this._supportLink = value
  }

  public setSupportLinkRaw(name: string, url: string) {
    this._supportLink = new Link(name, url)
  }
}
