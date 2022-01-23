<script setup lang="ts">
import { computed, onUnmounted, TransitionGroup } from 'vue'
import TodoItem from '@/components/TodoItem.vue'
import Button from '@/components/Button.vue'
import Alert from '@/components/Alert.vue'
import ChevronIcon from '@/components/ChevronIcon.vue'
import { PlusIcon } from '@heroicons/vue/solid'
import { ITodoItem } from '@/types'
import { ref } from 'vue'
import { User } from 'firebase/auth'
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  where,
  writeBatch,
} from 'firebase/firestore'
import EditForm, { Payload } from '@/components/EditForm.vue'
import Modal from '@/components/Modal.vue'
import { addTask, deleteTask, editTask, setCompleted, setFavorite } from '@/api'

export interface Props {
  user: User
}

const props = defineProps<Props>()

const db = getFirestore()
const todosRef = collection(db, 'todos') as CollectionReference<ITodoItem>

const q = query(
  todosRef,
  where('uid', '==', props.user.uid),
  orderBy('createdAt', 'desc')
)

const todosDocs = ref<QueryDocumentSnapshot<ITodoItem>[] | undefined>(undefined)

const activeItems = computed(() =>
  todosDocs.value?.filter((item) => !item.data().completed)
)

const completedItems = computed(() =>
  todosDocs.value?.filter((item) => item.data().completed)
)

const unsubscribe = onSnapshot(q, (snapshot) => {
  todosDocs.value = snapshot.docs
})

onUnmounted(() => {
  unsubscribe()
})

type ModalState =
  | { type: 'EDITING'; doc: QueryDocumentSnapshot<ITodoItem> }
  | { type: 'CREATING' }

const activeModal = ref<ModalState | undefined>(undefined)

function handleClickNew() {
  activeModal.value = { type: 'CREATING' }
}

function handleClickEdit(doc: QueryDocumentSnapshot<ITodoItem>) {
  activeModal.value = { type: 'EDITING', doc }
}

function handleCloseModal() {
  activeModal.value = undefined
}

const collapsedCompleted = ref(false)

function handleSubmit(payload: Payload) {
  if (activeModal.value === undefined) {
    return
  }

  if (activeModal.value.type === 'EDITING') {
    editTask(activeModal.value.doc.id, payload)
  }

  if (activeModal.value.type === 'CREATING') {
    addTask(todosRef, props.user, payload)
  }

  activeModal.value = undefined
}

function handleDelete() {
  if (activeModal.value === undefined) {
    return
  }

  if (activeModal.value.type === 'EDITING') {
    deleteTask(activeModal.value.doc.id)
  }

  activeModal.value = undefined
}
</script>

<template>
  <Modal
    v-if="activeModal !== undefined && activeModal.type === 'EDITING'"
    header="Edit task"
    @closed-modal="handleCloseModal"
  >
    <EditForm
      submit-label="Save"
      :initial-title="activeModal.doc.data().title"
      :initial-description="activeModal.doc.data().description"
      @submit="handleSubmit"
    >
      <template #secondary-cta>
        <Button variant="danger" @click="handleDelete">Delete</Button>
      </template>
    </EditForm>
  </Modal>

  <Modal
    v-if="activeModal !== undefined && activeModal.type === 'CREATING'"
    header="New task"
    @closed-modal="handleCloseModal"
  >
    <EditForm
      submit-label="Create"
      initial-title=""
      initial-description=""
      @submit="handleSubmit"
    />
  </Modal>

  <div class="px-3 mt-4">
    <div>
      <h2 class="font-bold text-4xl">Tasks</h2>
      <div class="h-1"></div>
      <h4 class="text-gray-600 text-sm">
        Logged in as
        <pre class="inline">{{ props.user.email }}</pre>
      </h4>
    </div>
    <div class="h-5"></div>

    <Alert v-if="todosDocs !== undefined && todosDocs.length === 0">
      Click the `+` button to create a new task.
    </Alert>

    <TransitionGroup
      tag="div"
      class="flex flex-col gap-y-4"
      move-class="transition-all duration-500"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div v-for="doc in activeItems" :key="doc.id">
        <TodoItem
          @clicked-edit="handleClickEdit(doc)"
          :id="doc.id"
          :item="doc.data()"
          @toggle-completed="(value) => setCompleted(doc.id, value)"
          @toggle-favorited="(value) => setFavorite(doc.id, value)"
        />
      </div>

      <div
        v-if="completedItems !== undefined && completedItems.length !== 0"
        key="separator"
        class="flex transition-none z-10 bg-white"
      >
        <h3 class="font-bold text-lg leading-none mt-5 mb-3">Completed</h3>
        <div class="flex-1"></div>
        <ChevronIcon v-model="collapsedCompleted" />
      </div>

      <div
        v-for="doc in completedItems"
        :class="{ 'invisible ': collapsedCompleted }"
        :key="doc.id"
      >
        <TodoItem
          @clicked-edit="handleClickEdit(doc)"
          :id="doc.id"
          :item="doc.data()"
          @toggle-completed="(value) => setCompleted(doc.id, value)"
          @toggle-favorited="(value) => setFavorite(doc.id, value)"
        />
      </div>
    </TransitionGroup>

    <div class="fixed bottom-0 right-0 px-4 py-4 z-20">
      <button
        @click="handleClickNew"
        class="border shadow-xl h-14 w-14 rounded-full bg-pink-500 text-white flex items-center justify-center"
      >
        <PlusIcon class="h-8 w-8" />
      </button>
    </div>
  </div>
</template>
