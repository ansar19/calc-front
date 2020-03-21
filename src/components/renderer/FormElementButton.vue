<template>
  <div v-show="!hidden" class="form-group row">
    <button type="button" v-bind:class="'btn ' + style + ' ' + class_" v-bind:name="name"
      v-bind:id="id">{{label}}</button>
  </div>
</template>

<script>
import FormElementBase from '@/components/renderer/FormElementBase.vue';

export default {
  name: 'FormElementButton',
  extends: FormElementBase,
  data() {
    return {

    };
  },
  computed: {
    style() {
      return this.element_json.attributes.style.value;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  white-space: pre-wrap;
}
</style>
