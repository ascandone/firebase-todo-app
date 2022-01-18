<script setup lang="ts">
import FieldSet from '../components/FieldSet.vue'
import Input from '../components/Input.vue'
import TextArea from '../components/TextArea.vue'

import { ITodoItem } from '@/types'
import { ref } from 'vue'

export interface Props {
  item: ITodoItem
}

const props = defineProps<Props>()

const text = ref('')
</script>
<template>
  <div class="px-4 py-4 max-w-md">
    <h2 class="font-bold text-2xl">Edit task</h2>

    <div class="h-3"></div>

    <FieldSet id="todoitem-title">
      <template #label>Title</template>
      <template #input="{ id }"><Input :id="id" v-model="text" /></template>
    </FieldSet>

    <div class="h-4"></div>

    <FieldSet id="todoitem-title">
      <template #label>Description</template>
      <template #input="{ id }">
        <TextArea :id="id" v-model="text" />
      </template>
    </FieldSet>
  </div>
</template>
