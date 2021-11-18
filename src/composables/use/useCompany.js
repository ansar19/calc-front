import { createGlobalState, useStorage } from '@vueuse/core'

export const useCompanyState = createGlobalState(
  () => useStorage('company', {
    companyId: '',
    companyName: ''
  }),
)
