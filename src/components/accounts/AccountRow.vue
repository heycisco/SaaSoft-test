<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Account, AccountType } from '@/types'
import { labelsToString, stringToLabels } from '@/utils'

const props = defineProps<{
  account: Account
}>()

const emit = defineEmits<{
  update: [account: Account]
  delete: []
}>()

// локальные значения для редактирования
const localLabel = ref(labelsToString(props.account.label))
const localLogin = ref(props.account.login)
const localPassword = ref(props.account.password)

watch(
  () => props.account,
  (newAccount) => {
    localLabel.value = labelsToString(newAccount.label)
    localLogin.value = newAccount.login
    localPassword.value = newAccount.type === 'ldap' ? '' : newAccount.password
  },
  { deep: true },
)

// обработчик изменения типа
const handleTypeChange = (value: AccountType) => {
  if (value === 'ldap') {
    localPassword.value = ''
    passwordError.value = false
  }

  emit('update', {
    ...props.account,
    type: value,
    label: stringToLabels(localLabel.value),
    login: localLogin.value,
    password: value === 'ldap' ? '' : localPassword.value,
  })
}

const isPasswordDisabled = computed(() => props.account.type === 'ldap')

// обработчик сохранения
const saveAccount = () => {
  if (validateAccount()) {
    emit('update', {
      ...props.account,
      label: stringToLabels(localLabel.value),
      login: localLogin.value,
      password: isPasswordDisabled.value ? '' : localPassword.value,
    })
  }
}

// функции валидации
const loginError = ref(false)
const passwordError = ref(false)

const isValidLength = (value: string, min: number, max: number): boolean => {
  const length = value.trim().length
  return length >= min && length <= max
}

const validateAccount = (): boolean => {
  loginError.value = !isValidLength(localLogin.value, 4, 100)
  passwordError.value = !isPasswordDisabled.value && !isValidLength(localPassword.value, 4, 100)

  return !loginError.value && !passwordError.value
}

// функция для генерации классов input
const getInputClass = (hasError: boolean): string => {
  const baseClass =
    'w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:border-transparent'
  const errorClass = 'border-2 border-red-500 focus:ring-red-500'
  const normalClass = 'border border-gray-300 focus:ring-blue-500'
  return `${baseClass} ${hasError ? errorClass : normalClass}`
}

const loginInputClass = computed(() => getInputClass(loginError.value))
const passwordInputClass = computed(() => getInputClass(passwordError.value))
</script>

<template>
  <tr class="border-b border-gray-200 hover:bg-gray-50">
    <!-- метки -->
    <td class="px-4 py-3">
      <input
        type="text"
        v-model="localLabel"
        @blur="saveAccount"
        placeholder="Метка1; Метка2; Метка3"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </td>

    <!-- тип записи -->
    <td class="px-4 py-3">
      <select
        :value="account.type"
        @change="handleTypeChange(($event.target as HTMLSelectElement).value as AccountType)"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="local">Локальная</option>
        <option value="ldap">LDAP</option>
      </select>
    </td>

    <!-- логин -->
    <td class="px-4 py-3" :colspan="isPasswordDisabled ? 2 : 1">
      <input
        type="text"
        v-model="localLogin"
        @blur="saveAccount"
        placeholder="Логин"
        :class="loginInputClass"
      />
    </td>

    <!-- пароль -->
    <td class="px-4 py-3" v-if="!isPasswordDisabled">
      <input
        type="password"
        v-model="localPassword"
        @blur="saveAccount"
        placeholder="Пароль"
        :class="passwordInputClass"
      />
    </td>

    <!-- действия -->
    <td class="px-4 py-3">
      <button
        @click="emit('delete')"
        class="p-3 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </td>
  </tr>
</template>
