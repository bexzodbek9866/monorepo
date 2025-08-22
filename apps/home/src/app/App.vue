<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          My Quasar App
        </q-toolbar-title>

        <q-tabs align="right">
          <q-route-tab 
            to="/" 
            label="Home" 
          />
          <q-route-tab 
            to="/about" 
            label="About" 
          />
          <q-route-tab 
            to="/demo" 
            label="Demo" 
          />
          <q-route-tab 
            to="/admin" 
            label="Admin" 
          />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <RouterView />
    </q-page-container>
  </q-layout>
</template>
