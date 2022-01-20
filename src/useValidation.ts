import { ref, watch } from 'vue'

export interface Return {
  value: string
  readonly validationMsg: string | undefined
  validate: () => void
}

export function useValidation(
  validation: (field: string) => string | undefined
): Return {
  const model = ref('')

  watch(model, (value) => {
    const err = validation(model.value)
    if (err === undefined) {
      validationMsg.value = err
    }
  })

  const validationMsg = ref<string | undefined>(undefined)
  function validate() {
    validationMsg.value = validation(model.value)
  }

  return {
    get value() {
      return model.value
    },
    set value(newValue) {
      model.value = newValue
    },
    get validationMsg() {
      return validationMsg.value
    },
    validate,
  }
}
