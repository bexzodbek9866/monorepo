<template>
  <div class="q-pa-md">
    <h1 class="text-h4 q-mb-md">
      Shared Test - Shared Components
    </h1>
    
    <!-- Shared BaseCard komponentini ishlatish -->
    <BaseCard 
      title="Shared Card Test"
      subtitle="Bu shared kutubxonasidan kelayotgan BaseCard"
      class="q-mb-md"
    >
      <p>
        Bu card shared kutubxonasining BaseCard komponenti. 
        Import: <code>import { BaseCard } from '@apps/shared'</code>
      </p>
      
      <div class="q-gutter-sm">
        <BaseButton 
          label="Shared Button 1" 
          color="primary" 
        />
        <BaseButton 
          label="Shared Button 2" 
          color="secondary" 
          outline 
        />
        <BaseButton 
          label="Shared Button 3" 
          color="positive" 
          flat 
        />
      </div>
      
      <template #actions>
        <BaseButton 
          label="Bekor qilish" 
          flat 
        />
        <BaseButton 
          label="Modal ochish" 
          color="primary" 
          @click="showModal = true" 
        />
      </template>
    </BaseCard>
    
    <!-- Quasar komponentlari bilan taqqoslash -->
    <q-card class="q-mb-md">
      <q-card-section>
        <h2 class="text-h6">
          Quasar Original komponentlari
        </h2>
        <p>
          Bu oddiy Quasar komponentlari.
        </p>
        
        <div class="q-gutter-sm">
          <q-btn 
            label="Quasar Button 1" 
            color="primary" 
          />
          <q-btn 
            label="Quasar Button 2" 
            color="secondary" 
            outline 
          />
          <q-btn 
            label="Quasar Button 3" 
            color="positive" 
            flat 
          />
        </div>
      </q-card-section>
    </q-card>
    
    <!-- Utility functions test -->
    <BaseCard 
      title="Utility Functions Test"
      subtitle="Shared utility funksiyalar testi"
      class="q-mb-md"
    >
      <div class="q-gutter-y-sm">
        <div>
          <strong>Capitalize test:</strong> {{ testCapitalize }}
        </div>
        <div>
          <strong>Truncate test:</strong> {{ testTruncate }}
        </div>
        <div>
          <strong>Date format test:</strong> {{ testDate }}
        </div>
        <div>
          <strong>Array unique test:</strong> {{ testUnique }}
        </div>
      </div>
      
      <div class="q-mt-md">
        <BaseButton 
          label="Yangi test" 
          color="accent"
          @click="updateTests"
        />
      </div>
    </BaseCard>

    <!-- Composables test -->
    <BaseCard 
      title="Composables Test"
      subtitle="Shared composables testi"
      class="q-mb-md"
    >
      <div class="q-gutter-y-sm">
        <div>
          <strong>Loading state:</strong> {{ loading ? 'Loading...' : 'Ready' }}
        </div>
        <div>
          <strong>Pagination:</strong> 
          Page {{ currentPage }} of {{ totalPages }} (Total: {{ total }})
        </div>
      </div>
      
      <div class="q-gutter-sm q-mt-md">
        <BaseButton 
          label="Start Loading" 
          color="primary"
          :disable="loading"
          @click="startLoading" 
        />
        <BaseButton 
          label="Next Page" 
          color="secondary"
          :disable="!hasNextPage"
          @click="nextPage" 
        />
        <BaseButton 
          label="Previous Page" 
          color="secondary"
          :disable="!hasPreviousPage"
          @click="previousPage" 
        />
      </div>
    </BaseCard>
    
    <!-- Shared Modal -->
    <BaseModal 
      v-model="showModal"
      title="Shared Modal Test"
      persistent
    >
      <p>
        Bu shared Modal komponenti! 
      </p>
      <p>
        Import: <code>import { BaseModal } from '@apps/shared'</code>
      </p>
      
      <template #actions>
        <BaseButton 
          label="Bekor qilish" 
          flat 
          @click="showModal = false" 
        />
        <BaseButton 
          label="OK" 
          color="primary" 
          @click="showModal = false" 
        />
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  BaseButton, 
  BaseCard, 
  BaseModal,
  capitalize,
  truncate,
  formatDate,
  unique,
  useLoading,
  usePagination
} from '@apps/shared'

const showModal = ref(false)

// Utility functions test
const testCapitalize = computed(() => capitalize('salom dunyo'))
const testTruncate = computed(() => truncate('Bu juda uzun matn va uni qisqartirish kerak', 25))
const testDate = computed(() => formatDate(new Date(), 'short'))
const testUnique = computed(() => unique([1, 2, 2, 3, 3, 4]).join(', '))

const updateTests = () => {
  console.log('Tests updated!')
}

// Composables test
const { loading, start: startLoading } = useLoading()
const { 
  currentPage, 
  totalPages, 
  total, 
  hasNextPage, 
  hasPreviousPage,
  nextPage,
  previousPage
} = usePagination({ total: 100, initialPerPage: 10 })
</script>
