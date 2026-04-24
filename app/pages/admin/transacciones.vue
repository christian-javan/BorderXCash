<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Transacciones Pendientes</h2>

    <div v-if="loading" class="text-center py-8">Cargando...</div>

    <div v-else-if="transactions.length === 0" class="text-center py-8 text-slate-400">
      No hay transacciones pendientes
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full bg-slate-800 rounded-lg overflow-hidden">
        <thead class="bg-slate-700">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Usuario</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Hora</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Estatus</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Monto USD</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Entregar MXN</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-600">
          <tr v-for="transaction in transactions" :key="transaction.remittance_id" class="hover:bg-slate-700">
            <td class="px-4 py-4 whitespace-nowrap text-sm text-white">{{ transaction.email || transaction.full_name }}</td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-slate-300">{{ formatDate(transaction.created_at) }}</td>
            <td class="px-4 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="transaction.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'">
                {{ transaction.status }}
              </span>
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-white">${{ transaction.amount_usd }}</td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-white">${{ transaction.amount_mxn }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'adminlayout'
})

const { data: transactions, pending: loading } = await useFetch('/api/admin/transactions')

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('es-MX')
}
</script>

<style scoped>
/* Additional styles if needed */
</style>