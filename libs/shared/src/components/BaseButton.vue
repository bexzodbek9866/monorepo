<template>
  <q-btn
    :color="color"
    :size="size"
    :loading="loading"
    :disable="disabled"
    :outline="outline"
    :flat="flat"
    :rounded="rounded"
    :push="push"
    :glossy="glossy"
    :fab="fab"
    :icon="icon"
    :label="label"
    @click="$emit('click', $event)"
    v-bind="$attrs"
  >
    <slot />
  </q-btn>
</template>

<script setup lang="ts">
interface Props {
  color?: string
  size?: string
  loading?: boolean
  disabled?: boolean
  outline?: boolean
  flat?: boolean
  rounded?: boolean
  push?: boolean
  glossy?: boolean
  fab?: boolean
  icon?: string
  label?: string
}

withDefaults(defineProps<Props>(), {
  color: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  outline: false,
  flat: false,
  rounded: false,
  push: false,
  glossy: false,
  fab: false
})

defineEmits<{
  click: [event: Event]
}>()
</script>
