<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <!-- Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Справочник</span>
        <h3 class="page-title">Новый справочник</h3>
      </d-col>
    </d-row>

    <d-row>
      <!-- Editor -->
      <d-col lg="12" md="12">
        <tree-editor/>
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
import Editor from '@/components/new-tree/Editor.vue';

export default {
  components: {
    treeEditor: Editor,
  },
};
</script>
