import { Context, Scenes } from 'telegraf'

export interface MyWizardSession extends Scenes.WizardSessionData {
  // will be available under `ctx.scene.session.myWizardSessionProp`
  channelAddress: string

  messageId: number

  photoIds: string[]
}

export interface MySession extends Scenes.WizardSession<MyWizardSession> {
  // will be available under `ctx.session.mySessionProp`
  mySessionProp: number
}

export default interface MyContext extends Context {
  // will be available under `ctx.myContextProp`
  myContextProp: string

  // declare session type
  session: MySession
  // declare scene type
  scene: Scenes.SceneContextScene<MyContext, MyWizardSession>
  // declare wizard type
  wizard: Scenes.WizardContextWizard<MyContext>
}
