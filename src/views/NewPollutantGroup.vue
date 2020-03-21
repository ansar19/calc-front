<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Группы ЗВ</span>
        <h3 class="page-title">Список выбросов</h3>
      </div>
    </div>
    <!-- Default Table -->
    <div class="row row-cards">
      <div class="col-sm-3">
        <form class="card">
          <div class="card-header">
            <h6 class="panel-title">Фильтр ЗВ</h6>
          </div>
          <div class="card-body">
            <div class="event-panel expanded">
              <div class="cluster-stats">
                <label class="form-label">Кол-во выбранных ЗВ</label>
                <span class="tag tag-purple">ddd</span>
              </div>
              <div class="form-group">
                <label class="form-label">Поиск среди ЗВ</label>
                <div class="input-icon mb-3">
                  <input type="text" class="form-control" placeholder="Искать ЗВ...">
                  <span class="input-icon-addon">
                    <i class="fe fe-search"></i>
                  </span>
                </div>
              </div>
              <div class="panel-logs">
                <div class="logs-list" id="list">
                  <li>ddd</li>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Название для группы ЗВ</label>
              <input
                type="text"
                class="form-control"
                name="example-text-input"
                placeholder="Назовите группу ЗВ"
              >
            </div>
          </div>
          <div class="card-footer text-right">
            <button type="submit" class="btn btn-primary">Сохранить</button>
          </div>
        </form>
      </div>
      <div class="col-md-9">
        <div class="container">
          <!-- <vue-table v-model="$model.table"></vue-table> -->
          <pollutants-table :columns="columns" :filter="filter" :records="records"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PollutantsTable from '@/components/pollutants-table/PollutantsTable.vue';

export default {
  components: {
    PollutantsTable,
  },
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
        {
          id: 9,
          pollutantcode: '0417',
          pollutantname: 'Смесь предельных углеводородов',
        },
      ],
      items: [
        {
          content: 'Branch',
          somenumber: 0,
          edit: false,
        },
      ],
      title: 'Обновите название словаря...',
      isPollutant: false,
      isLastVisible: true,
      editedItem: null,
      newChild: null,
      newSibling: null,
    };
  },
};
</script>

<style scoped>
.meta code,
.meta h2 {
  font-weight: 600;
  font-size: 1.75rem;
  margin-bottom: 20px;
  margin-top: 50px;
  letter-spacing: 0.05px;
}
.meta .subcomponent-title {
  font-family: Roboto Mono, monospace;
  font-size: 21px;
  font-weight: 600;
  margin-top: 30px;
}
.meta-table {
  width: 100%;
  background: #fff;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.03);
  font-size: 13px;
}
.meta-table thead {
  background: #f5f8fa;
  color: #586e8d;
}
.meta-table td,
.meta-table th {
  padding: 10px 15px;
}
.meta-table tr {
  border-radius: 10px;
  border: 1px solid #d4dadf;
}
@media (max-width: 780px) {
  .meta-table {
    border-collapse: collapse;
    margin: 0;
    padding: 0;
    width: 100%;
    table-layout: fixed;
    background: transparent;
    box-shadow: none;
  }
  .meta-table caption {
    font-size: 1.5em;
    margin: 0.5em 0 0.75em;
  }
  .meta-table tr {
    padding: 0.35em;
    background: #fff;
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.03);
  }
  .meta-table td,
  .meta-table th {
    padding: 0.625em;
    text-align: right !important;
  }
  .meta-table th {
    font-size: 0.85em;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .meta-table {
    border: 0;
  }
  .meta-table caption {
    font-size: 1.3em;
  }
  .meta-table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  .meta-table tr {
    display: block;
    margin-bottom: 0.625em;
  }
  .meta-table td {
    display: block;
    font-size: 0.8em;
    text-align: right;
  }
  .meta-table td:before {
    content: attr(data-label);
    float: left;
    font-weight: 700;
    text-transform: uppercase;
  }
  .meta-table td:last-child {
    border-bottom: 0;
  }
}

@media (max-width: 1160px) {
  .btn {
    margin-bottom: 10px !important;
  }
}
</style>
