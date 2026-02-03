export type AccountType = 'local' | 'ldap'

export interface Label {
  text: string
}

export interface Account {
  id: string
  label: Label[]
  type: AccountType
  login: string
  password: string
}
