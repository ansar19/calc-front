<template>
 <div v-show="!hidden" class="form-group row">
        <div class="col-sm-3"><span class="required-indicator" v-if="required">*</span>{{label}}</div>
        <div class="col-sm-9">
            <div v-if="read_only" class="vue-form-renderer-value">
                {{input_value}}
            </div>
            <div v-else class="form-check text-left" v-for="(option, index) in options" :key="index">
                <input class="" v-bind:id="id + '-' + option.value" v-bind:type="type"  :value="option.value" v-model="input_value">
                <label class="form-check-label" v-bind:for="id + '-' + option.value">
                    {{option.text}}
                </label>
            </div>
        </div>
</div>
</template>

<script>
import FormElementBase from '@/components/renderer/FormElementBase.vue';

export default {
  name: 'FormElementRadio',
  extends: FormElementBase,
  data() {
    return {

    };
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
