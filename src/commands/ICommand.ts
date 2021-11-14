import MyContext from '../context'

export default interface ICommand {
  execute(ctx: MyContext): void
}
