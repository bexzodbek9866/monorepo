<template>
  <q-dialog
    :model-value="modelValue"
    :persistent="persistent"
    :maximized="maximized"
    :full-width="fullWidth"
    :full-height="fullHeight"
    :position="position"
    @update:model-value="$emit('update:modelValue', $event)"
    @hide="$emit('hide')"
    @show="$emit('show')"
  >
    <q-card :style="{ minWidth: minWidth, maxWidth: maxWidth }">
      <q-card-section v-if="title || $slots.title" class="row items-center q-pb-none">
        <div class="text-h6">
          <slot name="title">{{ title }}</slot>
        </div>
        <q-space />
        <q-btn
          v-if="showCloseButton"
          icon="close"
          flat
          round
          dense
          @click="$emit('update:modelValue', false)"
        />
      </q-card-section>

      <q-card-section :class="contentClass">
        <slot />
      </q-card-section>

      <q-card-actions v-if="$slots.actions" :align="actionsAlign">
        <slot name="actions" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  title?: string
  persistent?: boolean
  maximized?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
  position?: 'top' | 'right' | 'bottom' | 'left'
  minWidth?: string
  maxWidth?: string
  contentClass?: string | object
  actionsAlign?: 'left' | 'center' | 'right' | 'around' | 'between' | 'evenly'
  showCloseButton?: boolean
}

withDefaults(defineProps<Props>(), {
  persistent: false,
  maximized: false,
  fullWidth: false,
  fullHeight: false,
  minWidth: '350px',
  maxWidth: '500px',
  actionsAlign: 'right',
  showCloseButton: true
})

defineEmits<{
  'update:modelValue': [value: boolean]
  hide: []
  show: []
}>()
</script>
