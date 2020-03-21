<template>
  <div v-show="!hidden" class="form-group row">
    <label class="col-sm-3 col-form-label" v-bind:for="id"><span class="required-indicator"
        v-if="required">*</span>{{label}}</label>

    <div class="col-sm-9 text-left">
      <div v-if="value">
        <span class="image-label">Preview</span>
        <a :href="value" target="_blank"><img width="200" :src="value" /></a>
        <div class="w-100 mt-2 mb-2" v-if="!read_only">
          <button type="button" class="replace btn col-sm-2" href=""
            v-on:click.prevent="$set(flags, 'replace', true)">Replace</button>
          <button type="button" class="delete btn col-sm-2" href="" v-on:click.prevent="clearValue()">Delete</button>
        </div>
      </div>
      <div v-if="(!value || flags.replace) && !read_only" class="mt-2">
        <input v-bind:id="id" v-bind:class="class_" v-bind:name="name" type="file" v-bind:placeholder="placeholder"
          v-bind:min="min" v-bind:max="max" v-bind:step="step" v-on:change="onFileChange">
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import FormElementFile from '@/components/renderer/FormElementFile.vue';

export default {
  name: 'FormElementImage',
  extends: FormElementFile,
  data() {
    return {
      flags: {},
    };
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) { return; }
      const raw_files = [];
      const file_names = [];
      // eslint-disable-next-line no-undef
      _.each(files, (file) => {
        const reader = new FileReader();

        // eslint-disable-next-line func-names
        reader.onloadend = function () {
          raw_files.push(new Int8Array(reader.result));
          file_names.push(file.name);
        };

        reader.readAsArrayBuffer(file);
      });

      const form_answer = {
        name: this.name,
        value: raw_files,
        file_names,
      };

      this.$emit('form_answer', form_answer);
    },
    clearValue() {
      this.input_value = '';
      this.element_json.attributes.value.value = '';
    },
  },
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.image-label {
  display: block;
  font-weight: bold;
}

</style>
