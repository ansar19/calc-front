<template>
 <div v-show="!hidden" class="form-group row">
    <div class="col-sm-3"><span class="required-indicator" v-if="required">*</span>{{label}}</div>
    <div class="col-sm-9">
        <div v-if="read_only" class="vue-form-renderer-value">
            {{input_value}}
        </div>
        <wysiwyg v-else rows="3" v-bind:value="value" v-model="input_value" v-bind:name="name" v-bind:id="id" />
    </div>
</div>
</template>

<script>
import FormElementBase from '@/components/renderer/FormElementBase.vue';

export default {
  name: 'FormElementWysiwyg',
  extends: FormElementBase,
  data() {
    return {

    };
  },
};
</script>
