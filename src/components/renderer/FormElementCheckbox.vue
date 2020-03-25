<template>
  <div v-show="!hidden" class="form-group row">
    <template v-if="multiple">
      <div class="col-sm-3"><span class="required-indicator" v-if="required">*</span>{{label}}</div>
      <div class="col-sm-9">
        <div class="form-check text-left" v-for="(option, index) in options" :key="index">
          <input :disabled="read_only" class="" v-bind:id="id + '-option-' + index" v-bind:type="type"
            :value="option.value" v-model="input_values">
          <label class="form-check-label" v-bind:for="id + '-option-' + index">
            {{option.text}}
          </label>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="col-sm-3"><span class="required-indicator" v-if="required" v-bind:for="id">*</span>{{label}}</div>
      <div class="col-sm-9">
        <div class="form-check text-left">
          <input :disabled="read_only" class="form-check-input" v-bind:type="type" v-bind:name="name" v-bind:id="id"
            :true-value="value" :false-value="''" v-model="input_value">
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import FormElementBase from '@/components/renderer/FormElementBase.vue';

export default {
  name: 'FormElementCheckbox',
  extends: FormElementBase,
  data() {
    return {

    };
  },
  computed: {
    multiple() {
      return this.element_json.attributes.multiple.value;
    },
  },
  methods: {
    init() {
      if (this.multiple) {
        if (this.value) {
          this.input_values = this.value;
        } else {
          this.input_values = [];
        }
      } else {
        // eslint-disable-next-line prefer-destructuring
        const checked = this.element_json.attributes.checked;
        if (checked && checked.value) {
          this.input_value = this.value;
        }
      }
    },
  },
  mounted() {
    this.$nextTick(this.init);
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

a {
  color: #42b983;
}
</style>
