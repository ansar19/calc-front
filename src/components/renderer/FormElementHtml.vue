<template>
 <div v-show="!hidden" class="form-group row">
    <div rows="3" v-html="value" v-bind:name="name" v-bind:id="id"></div>
    <!-- <div rows="3" v-html="value" v-model="input_value" v-bind:name="name" v-bind:id="id"></div> -->
</div>
</template>

<script>
import FormElementBase from '@/components/renderer/FormElementBase.vue';

export default {
  name: 'FormElementHtml',
  extends: FormElementBase,
  data() {
    return {

    };
  },
};
</script>
