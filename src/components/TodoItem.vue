<script setup lang="ts">
import Checkbox from './Checkbox.vue'
import FavoriteButton from './FavoriteButton.vue'
import DateChip from './DateChip.vue'
import { ITodoItem } from '@/types'

export interface Props {
  id: string
  item: ITodoItem
}

export interface Emits {
  (e: 'clicked-edit'): void
  (e: 'toggle-completed', value: boolean): void
  (e: 'toggle-favorited', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
</script>
<template>
  <div
    :class="{
      'flex bg-white': true,
      'items-center': props.item.description === undefined,
      'items-start': props.item.description !== undefined,
      'opacity-70': props.item.completed,
    }"
  >
    <div class="mt-2">
      <Checkbox
        :model-value="props.item.completed"
        @update:model-value="(v) => emit('toggle-completed', v)"
      />
    </div>
    <div class="w-3"></div>
    <div @dblclick="emit('clicked-edit')" @touchend="emit('clicked-edit')">
      <h3 class="font-bold leading-none text-gray-900">
        {{ props.item.title }}
      </h3>
      <div class="flex items-start select-none">
        <p
          v-if="props.item.description !== undefined"
          class="mt-1 text-gray-600 text-sm max-w-sm w-full"
        >
          {{ props.item.description }}
        </p>
      </div>
      <div v-if="props.item.date !== undefined" class="mt-2">
        <DateChip />
      </div>
    </div>

    <div class="flex-1"></div>
    <div>
      <div class="h-2" v-if="props.item.description != undefined"></div>
      <FavoriteButton
        :model-value="props.item.favorited"
        @update:model-value="(v) => emit('toggle-favorited', v)"
      />
    </div>
  </div>
</template>
