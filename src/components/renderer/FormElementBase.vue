<template>
    <div v-show="!hidden" class="form-group row">
        <label class="col-sm-3 col-form-label" v-bind:for="id"><span class="required-indicator" v-if="required">*</span>{{label}}</label>
        <div class="col-sm-9 text-left">
            <div v-if="read_only" class="vue-form-renderer-value">
                {{input_value}}
            </div>
            <input v-else class="form-control"
              v-bind:id="id"
              v-bind:class="class_"
              v-bind:name="name"
              v-bind:type="type"
              v-bind:placeholder="placeholder"
              v-bind:min="min"
              v-bind:max="max"
              v-bind:step="step"
              v-bind:required="required"
              v-model="input_value"/>
        </div>
    </div>
</template>

<script>
/* eslint-disable camelcase */

export default {
  name: 'FormElementBase',
  props: ['element_json', 'read_only'],
  data() {
    return {
      input_value: null,
      input_values: [],
    };
  },
  computed: {
    label() {
      return this.element_json.label;
    },
    options: {
      get() {
        return this.element_json.options;
      },
      set(val) {
        // eslint-disable-next-line no-return-assign
        return this.element_json.options = val;
      },
    },
    type: {
      get() {
        return this.getNestedPropertyValue(this.element_json, 'attributes.type.value');
      },
      set(val) {
        this.element_json.attributes.type.value = val;
      },
    },
    id: {
      get() {
        return this.getNestedPropertyValue(this.element_json, 'attributes.id.value');
      },
      set(val) {
        this.element_json.attributes.id.value = val;
      },
    },
    name: {
      get() {
        return this.getNestedPropertyValue(this.element_json, 'attributes.name.value');
      },
      set(val) {
        this.element_json.attributes.name.value = val;
      },
    },
    required: {
      get() {
        return this.getNestedPropertyValue(this.element_json, 'attributes.required.value');
      },
      set(val) {
        this.element_json.attributes.required.value = val;
      },
    },
    class_: {
      get() {
        return this.getNestedPropertyValue(this.element_json, 'attributes.class.value');
      },
      set(val) {
        this.element_json.attributes.class.value = val;
      },
    },
    value: {
      get() {
        return this.getNestedPropertyValue(this.element_json, 'attributes.value.value');
      },
      set(val) {
        this.element_json.attributes.value.value = val;
      },
    },
    placeholder: {
      get() {
        return this.getNestedPropertyValue(this.element_json, 'attributes.placeholder.value');
      },
      set(val) {
        this.element_json.attributes.placeholder.value = val;
      },
    },
    min: {
      get() {
        return this.getNestedPropertyValue(this.element_json, 'attributes.min.value');
      },
      set(val) {
        this.element_json.attributes.min.value = val;
      },
    },
    max: {
      get() {
        return this.getNestedPropertyValue(this.element_json, 'attributes.max.value');
      },
      set(val) {
        this.element_json.attributes.max.value = val;
      },
    },
    step: {
      get() {
        return this.getNestedPropertyValue(this.element_json, 'attributes.step.value');
      },
      set(val) {
        this.element_json.attributes.step.value = val;
      },
    },
    hidden: {
      get() {
        return this.getNestedPropertyValue(this.element_json, 'attributes.hidden.value');
      },
      set(val) {
        this.element_json.attributes.hidden.value = val;
      },
    },
    form_answer() {
      const form_answer = {};
      form_answer.name = this.name;
      form_answer.value = this.input_value;
      return form_answer;
    },
    form_answers() {
      const form_answer = {};
      form_answer.name = this.name;
      form_answer.value = this.input_values;
      return form_answer;
    },
  },
  watch: {
    input_value() {
      this.emitFormAnswer();
    },
    input_values() {
      this.emitFormAnswers();
    },
  },
  methods: {
    init() {
      this.input_value = this.value;
    },

    toggleValue(value) {
      // eslint-disable-next-line prefer-destructuring
      const input_values = this.input_values;
      // eslint-disable-next-line no-undef
      if (_.indexOf(input_values, value) > -1) {
        // eslint-disable-next-line no-undef
        _.pull(input_values, value);
      } else {
        input_values.push(value);
      }
      this.$set(this, 'input_values', input_values);
    },

    // https://medium.com/javascript-inside/safely-accessing-deeply-nested-values-in-javascript-99bf72a0855a
    // call like: getNestedPropertyValue(props, user.post.0.comments)

    getNestedPropertyValue(o, p) {
      const a = p.split('.');
      return a.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);
    },
    emitFormAnswer() {
      this.$emit('form_answer', this.form_answer);
    },
    emitFormAnswers() {
      this.$emit('form_answer', this.form_answers);
    },

  },
  mounted() {
    this.$nextTick(this.init);
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
</style>
