import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export default class UsersController {
  public async index () {
    const users = await User.all()
    return users
  }

  public async store ({ request }: HttpContextContract) {
    const data = request.only(['fullname', 'cpf', 'email', 'phone', 'password'])
    data.password = await Hash.make(data.password)

    const user = await User.create(data)

    return user
  }

  public async show (ctx: HttpContextContract) {
  }

  public async update (ctx: HttpContextContract) {
  }

  public async destroy (ctx: HttpContextContract) {
  }
}
