<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">FX Rates Management</h1>
      <button
        @click="showAddModal = true"
        class="px-6 py-3 bg-primary text-on-primary font-bold rounded-lg hover:brightness-110 transition-all flex items-center gap-2"
      >
        <Icon name="mdi:plus" size="20" />
        Add FX Rate
      </button>
    </div>

    <div class="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
      <table class="w-full">
        <thead class="bg-slate-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ID</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Standard</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Tier 1</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Tier 2</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Tier 3</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Valid From</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Valid Until</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Notes</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-700">
          <tr v-for="rate in fxRates" :key="rate.id" class="hover:bg-slate-750">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{{ rate.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <input
                v-model="rate.rateStandard"
                type="number"
                step="0.01"
                class="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-white focus:border-primary"
              />
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <input
                v-model="rate.rateTier1"
                type="number"
                step="0.01"
                class="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-white focus:border-primary"
              />
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <input
                v-model="rate.rateTier2"
                type="number"
                step="0.01"
                class="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-white focus:border-primary"
              />
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <input
                v-model="rate.rateTier3"
                type="number"
                step="0.01"
                class="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-white focus:border-primary"
              />
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <input
                v-model="rate.validFrom"
                type="datetime-local"
                class="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-white focus:border-primary"
              />
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <input
                v-model="rate.validUntil"
                type="datetime-local"
                class="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-white focus:border-primary"
              />
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <input
                v-model="rate.notes"
                class="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-white focus:border-primary"
              />
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="saveRate(rate)"
                class="text-primary hover:text-primary/80 mr-2"
              >
                Save
              </button>
              <button
                @click="deleteRate(rate.id)"
                class="text-red-400 hover:text-red-300"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-slate-800 p-6 rounded-lg border border-slate-700 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Add New FX Rate</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">Rate Standard</label>
            <input
              v-model="newRate.rateStandard"
              type="number"
              step="0.01"
              class="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white focus:border-primary"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">Rate Tier 1</label>
            <input
              v-model="newRate.rateTier1"
              type="number"
              step="0.01"
              class="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white focus:border-primary"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">Rate Tier 2</label>
            <input
              v-model="newRate.rateTier2"
              type="number"
              step="0.01"
              class="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white focus:border-primary"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">Rate Tier 3</label>
            <input
              v-model="newRate.rateTier3"
              type="number"
              step="0.01"
              class="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white focus:border-primary"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">Valid From</label>
            <input
              v-model="newRate.validFrom"
              type="datetime-local"
              class="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white focus:border-primary"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">Valid Until</label>
            <input
              v-model="newRate.validUntil"
              type="datetime-local"
              class="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white focus:border-primary"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">Notes</label>
            <input
              v-model="newRate.notes"
              class="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white focus:border-primary"
            />
          </div>
        </div>
        <div class="flex justify-end gap-3 mt-6">
          <button
            @click="showAddModal = false"
            class="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            @click="addRate"
            class="px-4 py-2 bg-primary hover:brightness-110 rounded-lg transition-colors"
          >
            Add Rate
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'adminlayout'
})

const fxRates = ref([])
const showAddModal = ref(false)
const newRate = ref({
  rateStandard: 0,
  rateTier1: 0,
  rateTier2: 0,
  rateTier3: 0,
  validFrom: '',
  validUntil: '',
  notes: ''
})

const getAuthHeaders = () => {
  const accessToken = useCookie('accessToken')
  const token = accessToken.value
  console.log('Access token from cookie:', token ? token.substring(0, 20) + '...' : 'none')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

const loadRates = async () => {
  try {
    const response = await $fetch('/api/admin/fx-rates', {
      headers: getAuthHeaders()
    })
    if (response.success) {
      fxRates.value = response.data
    }
  } catch (error) {
    console.error('Error loading rates:', error)
  }
}

const saveRate = async (rate) => {
  try {
    const response = await $fetch(`/api/admin/fx-rates/${rate.id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: {
        rateStandard: rate.rateStandard,
        rateTier1: rate.rateTier1,
        rateTier2: rate.rateTier2,
        rateTier3: rate.rateTier3,
        validFrom: rate.validFrom,
        validUntil: rate.validUntil,
        notes: rate.notes
      }
    })
    if (response.success) {
      await loadRates()
    }
  } catch (error) {
    console.error('Error saving rate:', error)
  }
}

const deleteRate = async (id) => {
  try {
    const response = await $fetch(`/api/admin/fx-rates/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    if (response.success) {
      await loadRates()
    }
  } catch (error) {
    console.error('Error deleting rate:', error)
  }
}

const addRate = async () => {
  try {
    const response = await $fetch('/api/admin/fx-rates', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: newRate.value
    })
    if (response.success) {
      showAddModal.value = false
      newRate.value = {
        rateStandard: 0,
        rateTier1: 0,
        rateTier2: 0,
        rateTier3: 0,
        validFrom: '',
        validUntil: '',
        notes: ''
      }
      await loadRates()
    }
  } catch (error) {
    console.error('Error adding rate:', error)
  }
}

onMounted(() => {
  loadRates()
})
</script>