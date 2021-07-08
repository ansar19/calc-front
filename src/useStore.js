import { createGlobalState, useStorage } from '@vueuse/core'

export const useGlobalState = createGlobalState(
  () => useStorage('vue-use-local-storage', {
    companyId: '',
    companyName: ''
  }),
)
