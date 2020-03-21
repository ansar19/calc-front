<template>
  <div v-show="!hidden" class="form-group row">
    <p v-bind:class="class_" v-bind:name="name" v-bind:id="id">{{value}}</p>
  </div>
</template>

<script>
import FormElementBase from '@/components/renderer/FormElementBase.vue';

export default {
  name: 'FormElementParagraph',
  extends: FormElementBase,
  data() {
    return {

    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  white-space: pre-wrap;
}
</style>
