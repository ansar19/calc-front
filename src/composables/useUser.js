import { createGlobalState, useStorage } from '@vueuse/core'

export const useUserState = createGlobalState(
  () => useStorage('user', {
    email: '',
    role: ''
  }),
)
