<template>
  <q-page class="row items-center justify-evenly">
    <div
      class="column q-gutter-md"
      style="max-width: 600px"
    >
      <h1 class="text-h3 text-center">
        Quasar Components Demo
      </h1>
      
      <!-- Buttons -->
      <div class="q-gutter-sm">
        <q-btn
          color="primary"
          label="Primary"
        />
        <q-btn
          color="secondary"
          label="Secondary"
        />
        <q-btn
          color="accent"
          label="Accent"
        />
        <q-btn
          color="positive"
          label="Positive"
        />
      </div>

      <!-- Card -->
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Card Title
          </div>
          <div class="text-subtitle2">
            Card subtitle
          </div>
        </q-card-section>

        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat>
            Cancel
          </q-btn>
          <q-btn flat>
            OK
          </q-btn>
        </q-card-actions>
      </q-card>

      <!-- Input -->
      <q-input
        v-model="text"
        filled
        label="Filled input"
      />

      <!-- List -->
      <q-list bordered>
        <q-item
          v-ripple
          clickable
        >
          <q-item-section avatar>
            <q-avatar
              color="primary"
              text-color="white"
            >
              {{ 'A' }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>Single line item</q-item-label>
            <q-item-label caption>
              Secondary line text. Lorem ipsum dolor sit amet
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item
          v-ripple
          clickable
        >
          <q-item-section avatar>
            <q-avatar
              color="secondary"
              text-color="white"
            >
              {{ 'B' }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>Single line item</q-item-label>
            <q-item-label caption>
              Secondary line text. Lorem ipsum dolor sit amet
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <!-- Notification button -->
      <q-btn 
        color="purple" 
        label="Show Notification" 
        @click="showNotification"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const text = ref('')

function showNotification() {
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Quasar notification is working!'
  })
}
</script>
