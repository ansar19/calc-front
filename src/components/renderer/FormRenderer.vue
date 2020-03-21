<template>
    <div v-bind:class="{container: containerize}">
        <div v-if="show_logo">
            <img class="float-left clearfix " src="@/assets/images/ecomarine-rus-1357x889.png" alt="" width="300" height="auto">
            <div class="clearfix"></div>
        </div>

        <div v-if="show_description" class="py-3 text-center">
            <h2>Form Viewer</h2>
            <p class="lead">Loads a json configured form built with vue-form-builder</p>
        </div>

        <div class="form container-fluid">
            <div class="row" v-for="(element, key, index) in form_json_with_prefill" :key="index">
                <div id="element" class="col-md-12">
                    <FormElementRenderer :read_only="read_only" :element_json="element" v-on:form_answer="saveAnswer" ref="form_elements" :validate="validate"> </FormElementRenderer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/*eslint-disable */
/* eslint-disable camelcase */
import FormElementRenderer from '@/components/renderer/FormElementRenderer.vue';

const default_settings = {
  validate: false,
};

export default {
  name: 'FormRenderer',
  components: {
    FormElementRenderer,
  },
  data() {
    const merged_settings = {};
    Object.assign(merged_settings, default_settings, this.settings);

    return {
      form_answers: {},
      validate: merged_settings.validate,
    };
  },
  props: {
    form_json: {},
    show_logo: {
      default: false,
    },
    show_description: {
      default: false,
    },
    containerize: {
      default: false,
    },
    prefill: {},
    read_only: false,
    settings: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    form_json_with_prefill() {
      if (!this.prefill) {
        return this.form_json;
      }
      // eslint-disable-next-line guard-for-in
      for (const i in this.form_json) {
        const key = this.form_json[i].attributes.name.value;

        if (typeof (this.prefill[key]) !== 'undefined') {
          // special case for checkbox
          if (this.form_json[i].attributes.type.value == 'checkbox' &&
            this.form_json[i].attributes.multiple.value == false
          ) {
            const value = this.form_json[i].attributes.value.value;
            const checked = (this.prefill[key] == value);
            this.form_json[i].attributes.checked.value = checked;
          } else {
            this.form_json[i].attributes.value.value = this.prefill[key];
          }
        }
      }
      this.$nextTick(() => {
        this.$emit('prefill_complete');
      });
      return this.form_json;
    },
  },

  methods: {
    saveAnswer(form_answer) {
      this.form_answers[form_answer.name] = form_answer;
      this.$emit('form_answers', this.form_answers);
    },
    getElementByIdAttribute(id) {
      const formElementRenderers = this.$children;
      for (const formRenderer of formElementRenderers) {
        if (formRenderer.$children[0].element_json.attributes.id.value == id) {
          return formRenderer.$children[0];
        }
      }
    },
    getValue(id) {
      const element = this.getElementByIdAttribute(id);
      return element.input_value ? element.input_value : null;
    },
    setValue(id, val) {
      const element = this.getElementByIdAttribute(id);
      if (element) {
        element.input_value = val;
      }
    },
    isValid() {
      _.each(this.$refs.form_elements, (element) => {
        element.isValid();
      });

      const valid = _.every(this.$refs.form_elements, element =>
        // if no error, assume valid
        element.isValid(), true);

      return valid;
    },
  },
  watch: {
    form_answers(new_val, old_val) {
      this.$emit('form_answers', new_val);
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
div.form{
    border: 1px #ccc solid;
    padding: 20px;
}
</style>
