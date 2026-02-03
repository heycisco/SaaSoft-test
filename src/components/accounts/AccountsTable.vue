<script setup lang="ts">
import AccountRow from './AccountRow.vue'
import { useAccountsStore } from '@/stores/accounts'

const accountsStore = useAccountsStore()
</script>

<template>
  <div class="w-full max-w-6xl mx-auto p-6">
    <div class="mb-6 flex items-center gap-4">
      <h2 class="text-2xl font-bold text-gray-800">Учетные записи</h2>
      <button
        @click="accountsStore.addAccount"
        class="p-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-5"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    </div>

    <div
      class="legend mb-6 text-sm text-gray-500 flex align-center gap-2 items-center bg-gray-100 p-3 rounded-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
        />
      </svg>
      <p>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</p>
    </div>
    <div class="overflow-x-auto bg-white rounded-lg shadow">
      <table class="w-full">
        <thead class="bg-gray-100 border-b border-gray-200">
          <tr class="table-header">
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Метки</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Тип записи</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Логин</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Пароль</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700"></th>
          </tr>
        </thead>
        <tbody>
          <AccountRow
            v-for="(account, index) in accountsStore.accounts"
            :key="account.id"
            :account="account"
            @update="accountsStore.updateAccount(index, $event)"
            @delete="accountsStore.deleteAccount(index)"
          />
        </tbody>
      </table>

      <div v-if="accountsStore.accounts.length === 0" class="p-8 text-center text-gray-500">
        Нет учетных записей
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
