<template>
  <d-card class="card-small mb-3">
    <d-card-header class="border-bottom">
      <h6 class="m-0">Список ЗВ</h6>
    </d-card-header>
    <d-nav tabs>
      <d-nav-item active>Table view</d-nav-item>
      <d-nav-item>JSON view</d-nav-item>
    </d-nav>
    <d-card-body class="card-body p-2 o-auto" style="height: 25rem;">
      <table class="meta-table">
        <thead>
          <tr>
            <th style="width:50%">Загрязняющее вещество</th>
            <th style="width:20%">Коэф, г/сек</th>
            <th style="width:20%">Коэф, т/период</th>
            <th style="width:10%"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pollutant, index) in pollutants" v-bind:key="pollutant.index">
            <td data-label="Загрязняющее вещество (ЗВ):">
              <v-select v-model="pollutant.selectedPollutant" item-text='label' item-value='code'
                :options="pollutantslist"></v-select>
            </td>
            <td data-label="Коэф, г/сек:">
              <d-input type="number" v-model.number="pollutant.gseccoef" />
            </td>
            <td data-label="Коэф, т/период:">
              <d-input type="number" v-model.number="pollutant.tyearcoef" />
            </td>
            <td>
              <d-button size="sm" class="btn-danger" @click="removePollutant(index)">
                <i class="material-icons">delete</i>
              </d-button>
            </td>
          </tr>
        </tbody>
      </table>
    </d-card-body>
    <d-card-footer class="border-top">
      <div class="d-flex">
        <d-button size="sm" class="btn-primary ml-auto" @click="addPollutant">
          Добавить ЗВ
        </d-button>
      </div>
    </d-card-footer>
    <!-- <pre>{{ $data.pollutants | json }}</pre> -->
  </d-card>
</template>

<script>
import { pollutantslist } from '@/components/new-tree/all_pollutants.json';

export default {
  name: 'pollutants-list',
  data() {
    return {
      pollutantslist,
      pollutants: [
        {
          selectedPollutant: null,
          gseccoef: '',
          tyearcoef: '',
        },
      ],
    };
  },
  methods: {
    addPollutant() {
      this.pollutants.push({ selectedPollutant: null, gseccoef: '', tyearcoef: '' });
    },
    removePollutant(index) {
      this.pollutants.splice(index, 1);
    },
  },
};
</script>
<style scoped>
element {
  height: 25rem;
}

.o-auto {
  overflow: auto !important;
}


</style>
