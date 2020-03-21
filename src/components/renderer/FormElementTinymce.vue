<template>
 <div v-show="!hidden" class="form-group row">
    <div class="col-sm-3"><span class="required-indicator" v-if="required">*</span>{{label}}</div>
    <div class="col-sm-9">
        <div v-if="read_only" class="vue-form-renderer-value">
            {{input_value}}
        </div>
        <tinymce v-else v-bind:value="value" v-model="input_value" v-bind:name="name" v-bind:id="id"></tinymce>
    </div>
  </div>
</template>

<script>
import FormElementBase from '@/components/renderer/FormElementBase.vue';

export default {
  name: 'FormElementTinymce',
  extends: FormElementBase,
  data() {
    return {

    };
  },
};
</script>
