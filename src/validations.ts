import { useValidation } from '@/useValidation'

export const useEmailValidation = () =>
  useValidation((field) => {
    if (!field.includes('@')) {
      return 'Insert a valid email'
    }
  })

export const usePasswordValidation = () =>
  useValidation((field) => {
    if (field.length < 6) {
      return 'Insert a valid password'
    }
  })
