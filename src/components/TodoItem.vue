<script setup lang="ts">
import Checkbox from './Checkbox.vue'
import FavoriteButton from './FavoriteButton.vue'
import DateChip from './DateChip.vue'
import { ITodoItem } from '@/types'

interface Props {
  item: ITodoItem
}

const props = defineProps<Props>()
</script>
<template>
  <div
    :class="{
      'flex transition-opacity duration-200': true,
      'items-center': props.item.description === undefined,
      'items-start': props.item.description !== undefined,
      'opacity-70': props.item.completed,
    }"
  >
    <div
      :class="{
        'mt-4': props.item.description !== undefined,
      }"
    >
      <Checkbox v-model="props.item.completed" />
    </div>
    <div class="w-3"></div>
    <div>
      <h3 class="font-bold text-lg leading-none text-gray-900">
        {{ props.item.title }}
      </h3>
      <div class="flex items-start">
        <p
          v-if="props.item.description !== undefined"
          class="mt-1 text-gray-600 text-sm max-w-sm w-full"
        >
          {{ props.item.description }}
        </p>
        <!-- <CategoryChip>personal</CategoryChip> -->
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
