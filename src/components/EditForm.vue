<script setup lang="ts">
import FieldSet from './FieldSet.vue'
import Input from './Input.vue'
import TextArea from './TextArea.vue'
import { ref } from 'vue'
import Button from '../components/Button.vue'
import { XIcon } from '@heroicons/vue/solid'
import { useRouter } from 'vue-router'

export interface Props {
  header: string
  submitLabel: string
  initialTitle?: string
  initialDescription?: string
}

export interface Emits {
  (e: 'submit', value: Payload): void
}

const props = withDefaults(defineProps<Props>(), {
  initialTitle: '',
  initialDescription: '',
})

const router = useRouter()

export interface Payload {
  title: string
  description?: string
}

const title = ref(props.initialTitle)
const description = ref(props.initialDescription)

const emits = defineEmits<Emits>()

function handleSubmit() {
  const payloadDescription =
    description.value.trim().length === 0 ? undefined : description.value.trim()

  if (title.value.trim().length !== 0) {
    emits('submit', {
      title: title.value,
      description: payloadDescription,
    })
  }
}

function handleExit() {
  router.back()
}
</script>
<template>
  <div class="px-4 py-4 max-w-lg">
    <div class="flex">
      <h2 class="font-bold text-2xl">{{ props.header }}</h2>
      <div class="flex-1"></div>
      <button
        @click="handleExit"
        class="hover:bg-gray-50 rounded-full p-2 -m-2"
      >
        <XIcon class="h-8 w-8 text-gray-800" />
      </button>
    </div>

    <div class="h-3"></div>

    <form @submit.prevent="handleSubmit">
      <FieldSet id="todoitem-title">
        <template #label>Title</template>
        <template #input="{ id }">
          <Input :id="id" v-model="title" />
        </template>
      </FieldSet>

      <div class="h-4"></div>

      <FieldSet id="todoitem-title">
        <template #label>Description</template>
        <template #input="{ id }">
          <TextArea :id="id" v-model="description" />
        </template>
      </FieldSet>

      <div class="h-5"></div>

      <div class="flex w-full justify-end">
        <Button type="submit">
          {{ props.submitLabel }}
        </Button>
      </div>
    </form>
  </div>
</template>
