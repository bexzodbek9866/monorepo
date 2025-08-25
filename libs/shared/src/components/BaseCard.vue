<template>
  <q-card
    :class="cardClass"
    :style="cardStyle"
    :flat="flat"
    :bordered="bordered"
    :square="square"
  >
    <q-card-section v-if="$slots.header || title" class="card-header">
      <slot name="header">
        <div class="text-h6">{{ title }}</div>
        <div v-if="subtitle" class="text-subtitle2">{{ subtitle }}</div>
      </slot>
    </q-card-section>

    <q-card-section :class="contentClass">
      <slot />
    </q-card-section>

    <q-card-actions v-if="$slots.actions" :align="actionsAlign">
      <slot name="actions" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  flat?: boolean
  bordered?: boolean
  square?: boolean
  cardClass?: string | object
  cardStyle?: string | object
  contentClass?: string | object
  actionsAlign?: 'left' | 'center' | 'right' | 'around' | 'between' | 'evenly'
}

defineProps<Props>()
</script>

<style scoped>
.card-header {
  padding-bottom: 0;
}
</style>
