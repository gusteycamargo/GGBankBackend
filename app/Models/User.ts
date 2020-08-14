import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Account from './Account'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fullname: string

  @column()
  public cpf: string

  @column()
  public email: string

  @column()
  public phone: string

  @column({ serializeAs: null })
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public accountId: number

  @belongsTo(() => Account)
  public account: BelongsTo<typeof Account>
}
