<script setup lang="ts">
import NxWelcome from '../app/NxWelcome.vue';
import { useQuasar } from 'quasar'

const $q = useQuasar()

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
