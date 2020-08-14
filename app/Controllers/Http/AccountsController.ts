import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account'

export default class AccountsController {
  public async index () {
    const accounts = await Account.all()

    return accounts
  }

  public async store ({ request }: HttpContextContract) {
    const data = request.only(['number', 'amount'])

    const account = await Account.create({
      number: data.number,
      amount: data.amount,
    })

    return account
  }

  public async show (ctx: HttpContextContract) {
  }

  public async update (ctx: HttpContextContract) {
  }

  public async destroy (ctx: HttpContextContract) {
  }
}
