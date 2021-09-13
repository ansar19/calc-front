<template>
  <fieldset class="form-group">
    <div v-show="!hidden" class="row">
      <label class="col-sm-3 col-form-label" v-bind:for="id">
        <span class="required-indicator" v-if="required">*</span>
        {{label}}</label>
      <div class="col-sm-9">
        <div v-if="read_only" class="vue-form-renderer-value">
          {{input_value}}
        </div>
        <div v-else class="">
          <template v-if="multiple">
            No multimple support for tree select
          </template>
          <template v-else>
            <treeselect :options="options" v-model="input_value" :name="name" :value="value" label="text"
              :instanceId="id" :disable-branch-nodes="true" :show-count="true" placeholder="placeholder" />
            <d-card class="mb-1">
              <d-card-header class="px-3 py-2" role="tab">
                <d-btn size="sm" block-level href="#" v-d-toggle.showpre>
                  Show selected values</d-btn>
              </d-card-header>
              <d-collapse id="showpre" accordion="my-accordion" role="tabpanel">
                <d-card-body>
                  <pre class="result">{{ input_value }}</pre>
                </d-card-body>
              </d-collapse>
            </d-card>
          </template>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script>
/* eslint-disable camelcase */
/* eslint-disable indent */
/* eslint-disable quote-props */
/* eslint-disable quotes */
import Treeselect from '@riophae/vue-treeselect';
// eslint-disable-next-line import/extensions
// import vueJsonEditor from 'vue-json-editor';
import FormElementBase from '@/components/renderer/FormElementBase.vue';
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

export default {
  extends: FormElementBase,
  name: 'FormElementTree',
  data() {
    return {
      delay_emit_count: 1,
    };
  },
  components: {
    // vueJsonEditor,
    Treeselect,
  },
  methods: {
    initializeValues() {
      if (this.multiple) {
        this.input_values = this.flatValueArrayToOptions(this.value);
      } else {
        const selection = this.flatValueArrayToOptions([this.value]);
        const value = selection && selection[0] ? selection[0] : null;
        this.input_value = value;
      }
    },
    flatValueArrayToOptions(values) {
      if (!values) {
        return [];
      }
      let selections = [];
      selections = values.map((v) => {
        // eslint-disable-next-line eqeqeq
        let selection = this.options.filter(o => o.value == v);
        if (!selection) {
          selection = null;
        } else {
          // eslint-disable-next-line prefer-destructuring
          selection = selection[0];
        }
        return selection;
      });
      selections = selections.filter(v => v != null);
      return selections;
    },
    optionsToFlatValueArray(options) {
      if (options) {
        return options.map(o => (o && o.value ? o.value : o));
      }
      return [];
    },
    emitFormAnswer() {
      if (this.delay_emit_count > -1) {
        // eslint-disable-next-line no-plusplus
        this.delay_emit_count--;
        return;
      }
      // eslint-disable-next-line func-names
      this.$nextTick(function () {
        this.$emit('form_answer', this.form_answer);
      });
    },
    emitFormAnswers() {
      if (this.delay_emit_count > -1) {
        // eslint-disable-next-line no-plusplus
        this.delay_emit_count--;
        return;
      }
      // eslint-disable-next-line func-names
      this.$nextTick(function () {
        this.$emit('form_answer', this.form_answers);
      });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  computed: {
    multiple() {
      return this.element_json.attributes.multiple.value;
    },
    form_answer() {
      const form_answer = {};
      form_answer.name = this.name;
      form_answer.value = this.input_value;
      if (form_answer.value && form_answer.value.value) {
        form_answer.value = form_answer.value.value;
      }
      return form_answer;
    },
    form_answers() {
      const form_answer = {};
      form_answer.name = this.name;
      form_answer.value = this.input_values;
      form_answer.value = form_answer.value.map((v) => {
        if (v.value) {
          return v.value;
        }
        return v;
      });
      return form_answer;
    },
    options: {
      get() {
        // eslint-disable-next-line no-undef
        const options = _.cloneDeep(this.element_json.options);
        options.unshift({});
        return options;
      },
      set(val) {
        // eslint-disable-next-line no-return-assign
        return this.element_json.options = val;
      },
    },
  },
  created() {
    this.initializeValues();
  },
};
</script>
