import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account'

export default class AccountsController {
  public async index () {
    const accounts = await Account.all()

    return accounts
  }

  public async store ({ request, auth }: HttpContextContract) {
    await auth.authenticate()
    const data = request.only(['amountCurrent', 'amountSaving'])

    const account = await Account.create(data)

    return account
  }

  public async show ({ auth, params, response }: HttpContextContract) {
    const userAuth = await auth.authenticate()
    try {
      const account = await Account.findOrFail(params.id)

      if(account.id === userAuth.account.id) {
        return account
      } else {
        return response.status(403).send('Área não autorizada')
      }
    } catch(error) {
      return response.status(400).send('Ocorreu um erro')
    }
  }

  public async update ({ request, auth, params, response }: HttpContextContract) {
    const userAuth = await auth.authenticate()
    try {
      const account = await Account.findOrFail(params.id)

      if(account.id === userAuth.account.id) {
        const data = request.only(['amountCurrent', 'amountSaving'])
        await account.merge(data)
        //await equipaments.load('campus');

        return account
      } else {
        return response.status(403).send('Área não autorizada')
      }
    } catch(error) {
      return response.status(400).send('Ocorreu um erro')
    }
  }

  public async destroy ({ auth, params, response }: HttpContextContract) {
    const userAuth = await auth.authenticate()
    const account = await Account.findOrFail(params.id)

    if(account.id === userAuth.account.id) {
      await account.delete()
      return account
    } else {
      return response.status(403).send('Área não autorizada')
    }
  }
}
