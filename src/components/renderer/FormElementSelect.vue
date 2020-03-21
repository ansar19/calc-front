<template>
    <fieldset class="form-group">
        <div v-show="!hidden" class="row">
            <label class="col-sm-3 col-form-label" v-bind:for="id"><span class="required-indicator" v-if="required">*</span>{{label}}</label>
            <div class="col-sm-9">
                <div v-if="read_only" class="vue-form-renderer-value">
                    {{read_only_value(input_value)}}
                </div>
                <select v-else
                  class="form-control mr-sm-2"
                  :multiple="multiple ? true : false"
                  :required="required"
                  :name="name"
                  :id="id"
                  v-model="input_value">
                    <option disabled value="">Выберите...</option>
                    <option v-for="(option, index) in options" :value="option.value" :key="index">{{option.text}}</option>
                </select>
            </div>
        </div>
    </fieldset>
</template>
<script>
import FormElementBase from '@/components/renderer/FormElementBase.vue';

export default {
  name: 'FormElementSelect',
  extends: FormElementBase,
  computed: {
    multiple() {
      if (this.element_json.attributes.multiple) {
        return this.element_json.attributes.multiple.value;
      }
      return false;
    },
  },
  data() {
    return {

    };
  },
  methods: {
    read_only_value(value) {
      // eslint-disable-next-line eqeqeq
      const opt = this.options.filter(option => option.value == value);
      if (opt && opt[0] && opt[0].text) {
        return opt[0].text;
      }
      return value;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
