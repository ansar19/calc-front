<template>
    <fieldset class="form-group">
        <div v-show="!hidden" class="row">
            <label class="col-sm-3 col-form-label" v-bind:for="id"><span class="required-indicator" v-if="required">*</span>{{label}}</label>
            <div class="col-sm-9">
                <div v-if="read_only" class="vue-form-renderer-value">
                    {{input_value}}
                </div>
                <div v-else class="">
                  <template v-if="multiple">
                    <v-select multiple
                      :options="options"
                      :name="name"
                      :id="id"
                      :placeholder="placeholder"
                      :value="value"
                      v-model="input_values"
                      label="text">
                    </v-select>
                  </template>
                  <template v-else>
                    <v-select
                      :options="options"
                      :name="name"
                      :id="id"
                      :placeholder="placeholder"
                      :value="value"
                      v-model="input_value"
                      label="text"
                      >
                    </v-select>
                  </template>
                </div>
            </div>
        </div>
    </fieldset>
</template>

<script>
/* eslint-disable camelcase */
import FormElementBase from '@/components/renderer/FormElementBase.vue';

export default {
  name: 'FormElementAutocomplete',
  extends: FormElementBase,
  data() {
    return {
      delay_emit_count: 1,
    };
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1, h2 {
  font-weight: normal;
}

.v-select.dropdown {
  background: white;
  border-radius: 4px;
}
::v-deep .v-select li{
    display: block;
}
</style>
