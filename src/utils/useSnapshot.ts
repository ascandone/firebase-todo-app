import { onSnapshot, Query, QueryDocumentSnapshot } from 'firebase/firestore'
import { onUnmounted, Ref, ref } from 'vue'

export function useSnapshot<T>(
  query: Query<T>
): Readonly<Ref<QueryDocumentSnapshot<T>[] | undefined>> {
  const docs = ref<QueryDocumentSnapshot<T>[] | undefined>()

  const unsubscribe = onSnapshot(query, (snapshotValue) => {
    docs.value = snapshotValue.docs
  })

  onUnmounted(() => {
    unsubscribe()
  })

  return docs
}
