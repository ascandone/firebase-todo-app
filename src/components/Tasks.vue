<script setup lang="ts">
import { computed, onUnmounted, TransitionGroup } from 'vue'
import TodoItem from '@/components/TodoItem.vue'
import Button from '@/components/Button.vue'
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

function addNewTask() {
  activeModal.value = { type: 'CREATING' }
}

function editTask(doc: QueryDocumentSnapshot<ITodoItem>) {
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
    const batch = writeBatch(db)

    batch.update(doc(db, 'todos', activeModal.value.doc.id), {
      title: payload.title,
      ...(payload.description === undefined
        ? {}
        : { description: payload.description }),
    })

    batch.commit()
  }

  if (activeModal.value.type === 'CREATING') {
    addDoc(todosRef, {
      uid: props.user.uid,
      title: payload.title,
      createdAt: serverTimestamp(),
      completed: false,
      favorited: false,
      ...(payload.description === undefined
        ? {}
        : { description: payload.description }),
    })
  }

  activeModal.value = undefined
}

function handleDelete() {
  if (activeModal.value === undefined) {
    return
  }

  if (activeModal.value.type === 'EDITING') {
    deleteDoc(doc(db, 'todos', activeModal.value.doc.id))
  }
  activeModal.value = undefined
}

const setCompleted = async (id: string, completed: boolean) => {
  const batch = writeBatch(db)

  batch.update(doc(db, 'todos', id), {
    completed,
  })

  batch.commit()
}

const handleToggleFavorite = async (id: string, favorited: boolean) => {
  const batch = writeBatch(db)

  batch.update(doc(db, 'todos', id), {
    favorited,
  })

  batch.commit()
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

    <TransitionGroup
      tag="div"
      class="flex flex-col gap-y-4"
      move-class="transition-all duration-500"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div v-for="doc in activeItems" :key="doc.id">
        <TodoItem
          @clicked-edit="editTask(doc)"
          :id="doc.id"
          :item="doc.data()"
          @toggle-completed="(value) => setCompleted(doc.id, value)"
          @toggle-favorited="(value) => handleToggleFavorite(doc.id, value)"
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
          @clicked-edit="editTask(doc)"
          :id="doc.id"
          :item="doc.data()"
          @toggle-completed="(value) => setCompleted(doc.id, value)"
          @toggle-favorited="(value) => handleToggleFavorite(doc.id, value)"
        />
      </div>
    </TransitionGroup>

    <div class="fixed bottom-0 right-0 px-4 py-4 z-20">
      <button
        @click="addNewTask"
        class="border shadow-xl h-14 w-14 rounded-full bg-pink-500 text-white flex items-center justify-center"
      >
        <PlusIcon class="h-8 w-8" />
      </button>
    </div>
  </div>
</template>
