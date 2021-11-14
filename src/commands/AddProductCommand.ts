import MyContext from '../context'
import Command from './Command'
import ICommand from './ICommand'

export class AddProductCommand extends Command implements ICommand {
  execute(ctx: MyContext) {
    ctx.scene.enter('add-product-wizard')
  }
}

export default new AddProductCommand('addProduct')
