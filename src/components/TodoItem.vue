<script setup lang="ts">
import Checkbox from './Checkbox.vue'
import FavoriteButton from './FavoriteButton.vue'
import DateChip from './DateChip.vue'
import { ITodoItem } from '@/types'
import { doc, getFirestore, writeBatch } from 'firebase/firestore'

interface Props {
  id: string
  item: ITodoItem
}

const props = defineProps<Props>()

export interface Emits {
  (e: 'clicked-edit'): void
}

const db = getFirestore()

const handleToggle = async () => {
  const docRef = doc(db, 'todos', props.id)
  const batch = writeBatch(db)

  batch.update(docRef, {
    completed: !props.item.completed,
  })

  batch.commit()
}

const emits = defineEmits<Emits>()
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
        @update:model-value="handleToggle"
      />
    </div>
    <div class="w-3"></div>
    <div @dblclick="emits('clicked-edit')" @touchend="emits('clicked-edit')">
      <h3 class="font-bold leading-none text-gray-900">
        {{ props.item.title }}
      </h3>
      <div class="flex items-start">
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
      <FavoriteButton v-model="props.item.favorited" />
    </div>
  </div>
</template>
