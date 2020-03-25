<template>
    <div v-show="!hidden" class="form-group row">
        <label class="col-sm-3 col-form-label" v-bind:for="id"><span class="required-indicator" v-if="required">*</span>{{label}}</label>
        <div class="col-sm-9 text-left">
            <div v-if="read_only" class="vue-form-renderer-value">
                {{input_value}}
            </div>
            <textarea v-else class="form-control"
              v-bind:id="id"
              v-bind:class="class_"
              v-bind:name="name"
              v-bind:placeholder="placeholder"
              v-bind:min="min"
              v-bind:max="max"
              v-bind:step="step"
              v-model="input_value"></textarea>
        </div>
    </div>
</template>

<script>
import FormElementBase from '@/components/renderer/FormElementBase.vue';

export default {
  name: 'FormElementTextarea',
  extends: FormElementBase,
  data() {
    return {

    };
  },
};
</script>
