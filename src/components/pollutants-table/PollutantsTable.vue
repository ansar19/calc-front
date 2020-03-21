<template>
  <d-card>
    <d-card-header class="d-flex border-bottom">
      <h6 class="d-flex m-0">Список ЗВ</h6>
      <div class="card-options ml-auto"></div>
    </d-card-header>
    <div>
      <d-input class="input" type="text" placeholder="Искать ЗВ..." v-model="filter"/>
    </div>
    <d-card-body class="card-body p-2 o-auto" style="height: 23rem;">
      <table class="meta-table">
        <thead>
          <tr>
            <th
              v-for="column in columns"
              class="table__cell"
              :key="column.id"
            >{{ column.text | capitalize }}</th>
          </tr>
        </thead>
        <tbody v-if="filteredRows.length">
          <tr v-for="row in filteredRows" :key="row.id">
            <td v-for="c in columns" class="table__cell" :key="c.id">{{ row[c.text] }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td :colspan="columns.length">Ничего не найдено</td>
          </tr>
        </tbody>
      </table>
    </d-card-body>
  </d-card>
</template>

<script>
export default {
  name: 'PollutantsTable',
  data() {
    return {
      columns: [
        {
          id: 1,
          text: 'pollutantcode',
        },
        {
          id: 2,
          text: 'pollutantname',
        },
      ],
      filter: '',
      records: [
        {
          id: 1,
          pollutantcode: '304',
          pollutantname: 'Азот (II) оксид (Азота оксид)',
        },
        {
          id: 2,
          pollutantcode: '0301',
          pollutantname: 'Оксид азота (IV) (диоксид азота)',
        },
        {
          id: 3,
          pollutantcode: '0328',
          pollutantname: 'Сажа (Углерод)',
        },
        {
          id: 4,
          pollutantcode: '0703',
          pollutantname: 'Бенз(а)пирен (3,4-Бензпирен)',
        },
        {
          id: 5,
          pollutantcode: '0337',
          pollutantname: 'Углерод оксид',
        },
        {
          id: 6,
          pollutantcode: '0330',
          pollutantname: 'Сера диоксид (Ангидрид сернистый)',
        },
        {
          id: 7,
          pollutantcode: '1325',
          pollutantname: 'Формальдегид',
        },
        {
          id: 8,
          pollutantcode: '0415',
          pollutantname: 'Смесь предельных углеводородов С1H4-C5H12',
        },
      ],
    };
  },
  filters: {
    capitalize(text) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    },
  },
  props: {
    // eslint-disable-next-line vue/no-dupe-keys
    columns: {
      type: Array,
      required: true,
    },
    // eslint-disable-next-line vue/no-dupe-keys
    records: {
      type: Array,
      default: () => [],
    },
    // eslint-disable-next-line vue/no-dupe-keys
    filter: {
      type: String,
    },
  },
  computed: {
    filteredRows() {
      let data = this.records;

      if (this.filter) {
        data = data.filter(row => Object.keys(row).some(key => String(row[key])
          .toLowerCase()
          .includes(this.filter.toLowerCase())));
      }
      return data;
    },
  },
};
</script>

<style scoped>
element {
  height: 23rem;
}

.o-auto {
  overflow: auto !important;
}
</style>
