import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Account } from '@/types'

export const useAccountsStore = defineStore('accounts', () => {
  // state
  const accounts = ref<Account[]>([
    {
      id: '1',
      label: [{ text: 'Администратор' }, { text: 'Главный' }],
      type: 'local',
      login: 'admin',
      password: 'admin123',
    },
    {
      id: '2',
      label: [{ text: 'Администратор' }, { text: 'Главный' }],
      type: 'local',
      login: 'user1',
      password: 'user123',
    },
    {
      id: '3',
      label: [{ text: 'LDAP пользователь' }],
      type: 'ldap',
      login: 'user1@domain.com',
      password: '',
    },
    {
      id: '4',
      label: [{ text: 'LDAP пользователь' }],
      type: 'ldap',
      login: 'user2@domain.com',
      password: '',
    },
  ])

  // actions
  function addAccount() {
    const newAccount: Account = {
      id: Date.now().toString(),
      label: [],
      type: 'local',
      login: '',
      password: '',
    }
    accounts.value.push(newAccount)
  }

  function updateAccount(index: number, updatedAccount: Account) {
    accounts.value[index] = updatedAccount
  }

  function deleteAccount(index: number) {
    accounts.value.splice(index, 1)
  }

  return {
    accounts,
    addAccount,
    updateAccount,
    deleteAccount,
  }
})
