<template>
  <div class="q-pa-md">
    <h1 class="text-h4 q-mb-md">Shared Components Test</h1>
    
    <!-- BaseCard komponentini test qilish -->
    <div class="row q-gutter-md q-mb-lg">
      <div class="col-12 col-md-6">
        <BaseCard
          title="Oddiy Card"
          subtitle="Bu shared card komponenti"
          class="q-mb-md"
        >
          <p>Bu card ning ichki kontenti. Shared kutubxonasidan kelayotgan BaseCard komponentini ishlatmoqda.</p>
          
          <template #actions>
            <BaseButton label="Bekor qilish" flat />
            <BaseButton label="Saqlash" color="primary" />
          </template>
        </BaseCard>
      </div>
      
      <div class="col-12 col-md-6">
        <BaseCard bordered>
          <template #header>
            <div class="text-h6 text-primary">Custom Header</div>
            <div class="text-caption">Custom subtitle</div>
          </template>
          
          <p>Bu card da custom header ishlatilgan.</p>
          
          <template #actions>
            <BaseButton icon="delete" color="negative" outline />
            <BaseButton icon="edit" color="warning" />
          </template>
        </BaseCard>
      </div>
    </div>

    <!-- BaseButton komponentlarini test qilish -->
    <BaseCard title="Button Variants" class="q-mb-lg">
      <div class="q-gutter-sm">
        <BaseButton label="Primary" color="primary" />
        <BaseButton label="Secondary" color="secondary" />
        <BaseButton label="Positive" color="positive" />
        <BaseButton label="Negative" color="negative" />
        <BaseButton label="Warning" color="warning" />
      </div>
      
      <div class="q-gutter-sm q-mt-md">
        <BaseButton label="Outline" outline />
        <BaseButton label="Flat" flat />
        <BaseButton label="Push" push />
        <BaseButton label="Glossy" glossy />
        <BaseButton label="Rounded" rounded />
      </div>
      
      <div class="q-gutter-sm q-mt-md">
        <BaseButton icon="home" fab color="primary" />
        <BaseButton icon="star" fab color="warning" />
        <BaseButton 
          icon="send" 
          label="Loading" 
          :loading="buttonLoading" 
          @click="testLoading"
        />
      </div>
    </BaseCard>

    <!-- Modal test -->
    <BaseCard title="Modal Test" class="q-mb-lg">
      <BaseButton 
        label="Modal ni ochish" 
        color="primary" 
        @click="showModal = true" 
      />
      
      <BaseModal 
        v-model="showModal"
        title="Test Modal"
        persistent
      >
        <p>Bu shared Modal komponenti. Persistent rejimida ochilgan.</p>
        <p>Faqat tugmalar orqali yopish mumkin.</p>
        
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
    </BaseCard>

    <!-- Utility functions test -->
    <BaseCard title="Utility Functions Test" class="q-mb-lg">
      <div class="q-gutter-y-sm">
        <div><strong>Test:</strong> Utility funksiyalar test qilinadi</div>
      </div>
    </BaseCard>

    <!-- Composables test -->
    <BaseCard title="Composables Test">
      <div class="q-gutter-y-sm">
        <div>
          <strong>Loading State:</strong> {{ loading }}
          <div class="q-gutter-sm q-mt-sm">
            <BaseButton 
              label="Start Loading" 
              @click="startLoading" 
              :disable="loading"
            />
            <BaseButton 
              label="Stop Loading" 
              @click="stopLoading" 
              :disable="!loading"
            />
            <BaseButton 
              label="With Loading" 
              @click="testWithLoading" 
              :loading="loading"
            />
          </div>
        </div>
        
        <q-separator class="q-my-md" />
        
        <div>
          <strong>Pagination:</strong>
          <div class="q-mt-sm">
            <div>Current Page: {{ currentPage }}</div>
            <div>Per Page: {{ perPage }}</div>
            <div>Total: {{ total }}</div>
            <div>Total Pages: {{ totalPages }}</div>
            <div>Offset: {{ offset }}</div>
          </div>
          
          <div class="q-gutter-sm q-mt-sm">
            <BaseButton 
              label="Previous" 
              @click="previousPage" 
              :disable="!hasPreviousPage"
            />
            <BaseButton 
              label="Next" 
              @click="nextPage" 
              :disable="!hasNextPage"
            />
            <BaseButton 
              label="Set Total 100" 
              @click="setTotal(100)" 
            />
          </div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  BaseButton, 
  BaseCard, 
  BaseModal,
  useLoading,
  usePagination
} from '@apps/shared'

// Modal state
const showModal = ref(false)
const buttonLoading = ref(false)

const testLoading = async () => {
  buttonLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  buttonLoading.value = false
}

// Composables test
const { loading, start: startLoading, stop: stopLoading, withLoading } = useLoading()
const { 
  currentPage, 
  perPage, 
  total, 
  totalPages, 
  offset, 
  hasNextPage, 
  hasPreviousPage,
  nextPage,
  previousPage,
  setTotal
} = usePagination({ total: 50 })

const testWithLoading = async () => {
  await withLoading(async () => {
    await new Promise(resolve => setTimeout(resolve, 3000))
  })
}
</script>

<style scoped>
.q-gutter-y-sm > * + * {
  margin-top: 8px;
}
</style>
