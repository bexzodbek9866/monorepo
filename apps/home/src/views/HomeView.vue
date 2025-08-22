<script setup lang="ts">
import NxWelcome from '../app/NxWelcome.vue';
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '../stores/counter'

const $q = useQuasar()
const counterStore = useCounterStore()

// Reactive properties (storeToRefs bilan)
const { count, doubleCount } = storeToRefs(counterStore)
// Actions
const { increment, decrement, reset } = counterStore

function showAlert() {
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Quasar is working perfectly!'
  })
}
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <div class="text-center">
      <h1 class="text-h3 text-primary q-mb-md">
        Welcome to Quasar!
      </h1>
      <p class="text-h6 q-mb-lg">
        Your Vue.js + Quasar app is ready to go.
      </p>
      
      <!-- Pinia Counter Test -->
      <div class="q-mb-lg">
        <h5>Pinia Counter Test</h5>
        <div class="text-h4 q-mb-md">{{ count }}</div>
        <div class="text-body1 q-mb-md">Ikki barobar: {{ doubleCount }}</div>
        <div class="q-gutter-sm">
          <q-btn color="positive" @click="increment" label="+" />
          <q-btn color="negative" @click="decrement" label="-" />
          <q-btn color="grey" @click="reset" label="Reset" />
        </div>
      </div>
      
      <q-btn 
        color="primary" 
        label="Get Started" 
        size="lg" 
        @click="showAlert"
      />
      
      <div class="q-mt-xl">
        <NxWelcome title="@apps/home" />
      </div>
    </div>
  </q-page>
</template>
