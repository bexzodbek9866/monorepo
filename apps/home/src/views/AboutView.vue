<template>
  <q-page class="row items-center justify-center">
    <div class="column q-gutter-md text-center">
      <h1 class="text-h3 text-secondary">
        About Our App
      </h1>
      
      <q-card
        class="my-card q-pa-md"
        style="max-width: 400px"
      >
        <q-card-section>
          <div class="text-h6">
            Features
          </div>
          <div class="text-subtitle2">
            Built with modern technologies
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-body2">
            This application is built using Vue 3, Quasar Framework, and Nx monorepo architecture. 
            It provides a scalable foundation for building modern web applications.
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn
            flat
            color="primary"
          >
            Learn More
          </q-btn>
          <q-btn
            flat
            color="secondary"
          >
            Documentation
          </q-btn>
        </q-card-actions>
      </q-card>

      <q-chip 
        color="primary" 
        text-color="white" 
        icon="bookmark"
      >
        Vue 3 + Quasar
      </q-chip>
    </div>
  </q-page>
</template>
