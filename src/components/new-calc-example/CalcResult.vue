<template>
  <tr>
    <td data-label="Код ЗВ:">{{ selected.code }}</td>
    <td data-label="Наименование ЗВ:">{{ selected.name }}</td>
    <td data-label="Выбросы, г/сек:">{{ gsec }}</td>
    <td data-label="Выбросы, т/год:">{{ tyear }}</td>
  </tr>
</template>

<script>
export default {
  name: 'calc-result',
  props: {
    input: {
      type: Object,
    },
    selected: {
      type: Object,
    },
  },
  data() {
    return {
      number: this.finalWidth,
    };
  },
  mounted() {
    setInterval(() => {
      // eslint-disable-next-line no-plusplus
      this.number++;
    }, 1000);
  },
  watch: {
    boxes(value) {
      this.$emit('boxes-changed', value);
    },
  },
  computed: {
    gsec() {
      return this.selected.value1 * this.quantity;
    },
    tyear() {
      return this.selected.value2 * this.power;
    },
  },
};
</script>
