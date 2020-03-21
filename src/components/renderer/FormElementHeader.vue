<template>
  <div v-show="!hidden" class="form-group row">
    <p v-bind:class="[size, class_]" v-bind:name="name" v-bind:id="id"><span class="required-indicator"
        v-if="required">*</span>{{label}}</p>
  </div>
</template>

<script>
import FormElementBase from '@/components/renderer/FormElementBase.vue';

export default {
  name: 'FormElementHeader',
  extends: FormElementBase,
  data() {
    return {

    };
  },
  computed: {
    size() {
      return this.element_json.attributes.size.value;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.h1, .h2 {
  font-weight: normal;
}
</style>
