<script setup lang="ts">
import NxWelcome from '../app/NxWelcome.vue';
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '../stores/counter'
import { BaseCard, BaseButton } from '@apps/shared'

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
      <BaseCard
        title="Pinia Counter Test"
        subtitle="State management demo"
        class="counter-card q-mb-lg"
      >
        <div class="text-h4 q-mb-md">
          {{ count }}
        </div>
        <div class="text-body1 q-mb-md">
          Ikki barobar: {{ doubleCount }}
        </div>
        <div class="q-gutter-sm">
          <BaseButton 
            color="positive" 
            label="+" 
            @click="increment" 
          />
          <BaseButton 
            color="negative" 
            label="-" 
            @click="decrement" 
          />
          <BaseButton 
            color="secondary" 
            label="Reset" 
            @click="reset" 
          />
        </div>
      </BaseCard>
      
      <q-btn 
        color="primary" 
        label="Get Started" 
        size="lg" 
        @click="showAlert"
      />

      <!-- Navigation Links -->
      <BaseCard
        title="Portallarga O'tish"
        subtitle="Admin yoki Client portaliga o'ting"
        class="navigation-card q-mt-lg"
      >
        <div class="q-gutter-md">
          <BaseButton 
            color="primary"
            label="Admin Portal"
            @click="$router.push('/admin')"
          />
          <BaseButton 
            color="secondary"
            label="Client Portal"
            @click="$router.push('/client')"
          />
        </div>
      </BaseCard>
      
      <div class="q-mt-xl">
        <NxWelcome title="@apps/home" />
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.counter-card {
  max-width: 400px;
  margin: 0 auto;
}

.navigation-card {
  max-width: 400px;
  margin: 0 auto;
}
</style>