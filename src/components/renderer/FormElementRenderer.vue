<template>
  <div class="container-fluid">
    <div class="col-sm-9 offset-3" v-if="validate">
      <div class="error" v-if="showError('required')">{{label}} Field is required</div>
    </div>
    <FormElementHeader v-if="type == 'header' " :read_only="read_only" :element_json="element_json">
    </FormElementHeader>
    <FormElementHtml v-else-if="type == 'html' " :read_only="read_only" :element_json="element_json"> </FormElementHtml>
    <FormElementButton v-else-if="type == 'button' " :read_only="read_only" :element_json="element_json">
    </FormElementButton>
    <FormElementParagraph v-else-if="type == 'paragraph' " :read_only="read_only" :element_json="element_json">
    </FormElementParagraph>
    <FormElementSelect v-else-if="type == 'select' " :read_only="read_only" :element_json="element_json"
      v-on:form_answer="emitAnswer"> </FormElementSelect>
    <FormElementInput v-else-if="type == 'text' " :read_only="read_only" :element_json="element_json"
      v-on:form_answer="emitAnswer"> </FormElementInput>
    <FormElementRadio v-else-if="type == 'radio' " :read_only="read_only" :element_json="element_json"
      v-on:form_answer="emitAnswer"> </FormElementRadio>
    <FormElementCheckbox v-else-if="type == 'checkbox' " :read_only="read_only" :element_json="element_json"
      v-on:form_answer="emitAnswer"> </FormElementCheckbox>
    <FormElementWysiwyg v-else-if="type == 'wysiwyg' " :read_only="read_only" :element_json="element_json"
      v-on:form_answer="emitAnswer"> </FormElementWysiwyg>
    <FormElementTinymce v-else-if="type == 'tinymce' " :read_only="read_only" :element_json="element_json"
      v-on:form_answer="emitAnswer"> </FormElementTinymce>
    <FormElementTextarea v-else-if="type == 'textarea' " :read_only="read_only" :element_json="element_json"
      v-on:form_answer="emitAnswer"> </FormElementTextarea>
    <FormElementInput v-else-if="type == 'number' " :read_only="read_only" :element_json="element_json"
      v-on:form_answer="emitAnswer"> </FormElementInput>
    <FormElementInput v-else-if="type == 'date' " :read_only="read_only" :element_json="element_json"
      v-on:form_answer="emitAnswer"> </FormElementInput>
    <FormElementFile v-else-if="type == 'file' " :read_only="read_only" :element_json="element_json"
      v-on:form_answer="emitAnswer"> </FormElementFile>
    <FormElementImage v-else-if="type == 'image' " :read_only="read_only" :element_json="element_json"
      v-on:form_answer="emitAnswer"> </FormElementImage>
    <FormElementAutocomplete v-else-if="type == 'autocomplete' " :read_only="read_only" :element_json="element_json"
      v-on:form_answer="emitAnswer"> </FormElementAutocomplete>
    <FormElementTree v-else-if="type == 'tree' " :read_only="read_only" :element_json="element_json"
      v-on:form_answer="emitAnswer"> </FormElementTree>
    <div v-else>
      <div class="alert alert-danger" role="alert">
        Ooops, we don't have this form type....
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import FormElementSelect from '@/components/renderer/FormElementSelect.vue';
import FormElementInput from '@/components/renderer/FormElementInput.vue';
import FormElementRadio from '@/components/renderer/FormElementRadio.vue';
import FormElementCheckbox from '@/components/renderer/FormElementCheckbox.vue';
import FormElementHeader from '@/components/renderer/FormElementHeader.vue';
import FormElementParagraph from '@/components/renderer/FormElementParagraph.vue';
import FormElementWysiwyg from '@/components/renderer/FormElementWysiwyg.vue';
import FormElementTinymce from '@/components/renderer/FormElementTinymce.vue';
import FormElementTextarea from '@/components/renderer/FormElementTextarea.vue';
import FormElementButton from '@/components/renderer/FormElementButton.vue';
import FormElementFile from '@/components/renderer/FormElementFile.vue';
import FormElementImage from '@/components/renderer/FormElementImage.vue';
import FormElementHtml from '@/components/renderer/FormElementHtml.vue';
import FormElementAutocomplete from '@/components/renderer/FormElementAutocomplete.vue';
import FormElementTree from '@/components/renderer/FormElementTree.vue';
import _ from 'lodash';

// eslint-disable-next-line no-unused-vars
import { required, email, withParams, minLength, between } from 'vuelidate/lib/validators';

export default {
  name: 'FormElementRenderer',
  components: {
    FormElementSelect,
    FormElementInput,
    FormElementRadio,
    FormElementCheckbox,
    FormElementHeader,
    FormElementParagraph,
    FormElementWysiwyg,
    FormElementTinymce,
    FormElementTextarea,
    FormElementButton,
    FormElementFile,
    FormElementImage,
    FormElementHtml,
    FormElementAutocomplete,
    FormElementTree,
  },
  props: ['element_json', 'read_only', 'validate'],
  data() {
    return {
      show_errors: false,
      input_value: null,
    };
  },
  computed: {
    type() {
      return this.element_json.attributes.type.value;
    },
    required() {
      return this.element_json.attributes.required.value;
    },
    label() {
      return this.element_json.label;
    },
  },
  validations() {
    let input_value = {};
    if (this.required) {
      input_value = { ...input_value, ...{ required } };
    }
    return { input_value };
  },
  methods: {
    // eslint-disable-next-line func-names
    emitAnswer: _.debounce(function (form_answer) {
      this.input_value = form_answer.value;
      this.$v.$touch();
      // eslint-disable-next-line func-names
      this.$nextTick(function () {
        if (this.$v.$invalid) {
          this.show_errors = true;
        }
      });
      this.$emit('form_answer', form_answer);
    }),
    showError(validator_name) {
      return !_.isUndefined(this.$v.input_value[validator_name]) && this.$v.input_value.$error && !this.$v.input_value[validator_name];
    },
    isValid() {
      this.$v.$touch();
      return !this.$v.$invalid;
    },
  },
  mounted() {

  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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

.form-group--error,
.error{
    color: #CC0000;
}

</style>
