<template>
  <div class="q-pa-md">
    <h5>Pinia Reactivity Test</h5>
    
    <div class="q-mb-md">
      <div class="text-h4">
        Count: {{ count }}
      </div>
      <div class="text-h6">
        Double: {{ doubleCount }}
      </div>
      <div class="text-body1">
        Status: {{ isEven ? 'Even' : 'Odd' }}
      </div>
    </div>
    
    <div class="q-gutter-sm">
      <q-btn 
        color="primary" 
        label="Increment" 
        @click="handleIncrement"
      />
      <q-btn 
        color="secondary" 
        label="Decrement" 
        @click="handleDecrement"
      />
      <q-btn 
        color="grey" 
        label="Reset" 
        @click="handleReset"
      />
    </div>
    
    <div class="q-mt-md">
      <div class="text-body2">
        Raw count value: {{ rawCount }}
      </div>
      <div class="text-body2">
        Store reference: {{ store.count }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '../stores/counter'

const store = useCounterStore()

// storeToRefs bilan reactive qilish
const { count, doubleCount, isEven } = storeToRefs(store)

// Store'dan to'g'ridan-to'g'ri actions
const { increment, decrement, reset } = store

// Raw qiymatni tekshirish uchun
const rawCount = computed(() => store.count)

// Debug uchun
function handleIncrement() {
  console.log('Before increment:', count.value)
  increment()
  console.log('After increment:', count.value)
}

function handleDecrement() {
  console.log('Before decrement:', count.value)
  decrement()
  console.log('After decrement:', count.value)
}

function handleReset() {
  console.log('Before reset:', count.value)
  reset()
  console.log('After reset:', count.value)
}
</script>
