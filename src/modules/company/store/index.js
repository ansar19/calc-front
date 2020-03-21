import COLLECTION_MODULE from '@/store/lib/collectionModule';
import { NEW_COMPANY } from './constants';

// Company Vuex module definition
export default {
  namespaced: true,
  modules: {
    collection: COLLECTION_MODULE({ NEW_MODEL: NEW_COMPANY }),
  },
};
