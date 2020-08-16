import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
export default class UserLoggedController {
  public async index ({ auth }: HttpContextContract) {
    const user = await auth.authenticate()
    const userLoggedWithAccount = await User.findOrFail(user.id)
    await userLoggedWithAccount.preload('account')

    return userLoggedWithAccount
  }
}
