import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import Account from 'App/Models/Account'

export default class UsersController {
  public async index () {
    const users = await User.query().preload('account')
    return users
  }

  public async store ({ request }: HttpContextContract) {
    const data = request.only(['fullname', 'cpf', 'email', 'phone', 'password'])
    data.password = await Hash.make(data.password)

    const user = await User.create(data)

    return user
  }

  // public async show ({ auth, params, response }: HttpContextContract) {
  //   await auth.authenticate()
  //   try {
  //     const user = await User.findOrFail(params.id)
  //     return user
  //   } catch(error) {
  //     return response.status(400).send('Ocorreu um erro')
  //   }
  // }

  public async update ({ request, auth, params, response }: HttpContextContract) {
    const userAuth = await auth.authenticate()
    try {
      const user = await User.findOrFail(params.id)

      if(userAuth.id === user.id) {
        const data = request.only(['fullname', 'cpf', 'email', 'phone', 'password', 'account'])
        if(data.account) {
          const account = await Account.findOrFail(data.account)
          await user.related('account').associate(account)
        }
        await user.merge(data)
        await user.preload('account')
        return user
      } else {
        return response.status(403).send('Área não autorizada')
      }
    } catch(error) {
      return response.status(400).send('Ocorreu um erro')
    }
  }

  public async destroy ({ auth, params, response }: HttpContextContract) {
    const userAuth = await auth.authenticate()
    const user = await User.findOrFail(params.id)

    if(userAuth.id === user.id) {
      await user.preload('account')
      const account = await Account.findOrFail(user.account.id)
      await account.delete()
      await user.delete()

      return user
    } else {
      return response.status(403).send('Área não autorizada')
    }
  }
}
