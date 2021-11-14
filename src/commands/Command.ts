export default abstract class Command {
  private _name: string

  public get name() {
    return this._name
  }

  constructor(name: string) {
    this._name = name
  }
}
