import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserLoggedController {
  public async index ({ auth }: HttpContextContract) {
    const user = await auth.authenticate()

    return user
  }
}
