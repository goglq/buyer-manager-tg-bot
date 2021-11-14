import MyContext from '../context'
import Command from './Command'
import ICommand from './ICommand'

export class AddChannelCommand extends Command implements ICommand {
  execute(ctx: MyContext) {
    ctx.scene.enter('add-channel-wizard')
  }
}

export default new AddChannelCommand('addChannel')
