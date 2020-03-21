<template>
  <d-card class="card-small mb-3">
    <d-card-body>
      <d-card>
        <d-card-header class="border-bottom">
          <div class="block-handle" align="right">
            <d-checkbox inline checked name="fav_sports" value="ProductionReady">Production ready</d-checkbox>
            <span class="custom-switch-indicator"></span>
            <d-btn v-d-toggle.my-collapse variant="primary">Раскрыть/Скрыть</d-btn>
          </div>
        </d-card-header>
        <div class="card-header">
          <div class="card-options">
            <d-collapse id="my-collapse">
              <div class="card-body">
                <div class="form-group">
                  <div class="row gutters-xs">
                    <div class="col">
                      <textarea
                        v-model="title"
                        class="form-control"
                        placeholder="Введите название словаря"
                        rows="1"
                      ></textarea>
                    </div>
                    <span class="col-auto">
                      <d-button class="btn btn-success ml-auto">
                        <i class="material-icons">save</i>
                      </d-button>
                    </span>
                  </div>
                </div>
                <div class="form-group">
                  <div class="row gutters-xs">
                    <div class="col">
                      <textarea
                        class="form-control"
                        placeholder="Введите описание словаря"
                        rows="1"
                      ></textarea>
                    </div>
                    <span class="col-auto">
                      <d-button class="btn btn-success ml-auto">
                        <i class="material-icons">save</i>
                      </d-button>
                    </span>
                  </div>
                </div>
              </div>
            </d-collapse>
          </div>
        </div>
      </d-card>
      <div class="row row-cards mt-3">
        <d-col md="7">
          <d-card>
            <d-card-header class="d-flex border-bottom">
              <h6 class="d-flex m-0">Tree builder</h6>
              <div class="card-options ml-auto">
                <d-button class="btn btn-success">
                  <i class="material-icons">save</i>
                </d-button>
              </div>
            </d-card-header>
            <d-card-body>
              <h5>{{ title }}</h5>
              <ul class="tree">
                <tree-branch>
                  <tree-branch></tree-branch>
                </tree-branch>
              </ul>
            </d-card-body>
            <d-card-footer class="text-right border-top">
              <d-button type="submit" class="btn btn-primary">Сохранить</d-button>
            </d-card-footer>
          </d-card>
        </d-col>
        <d-col md="5">
          <pollutants-list />
        </d-col>
      </div>
    </d-card-body>
    <d-card-footer class="border-top">
      <div class="d-flex">
        <d-link @click="goBack">Отменить</d-link>
        <d-button class="btn btn-success ml-auto" type="submit">Сохранить</d-button>
      </div>
    </d-card-footer>
  </d-card>
</template>

<script>
/* eslint-disable */
import TreeBranch from "@/components/new-tree/TreeBranch.vue";
import PollutantsList from '@/components/new-tree/PollutantsList.vue';

export default {
  name: "editor",
  components: {
    treeBranch: TreeBranch,
    PollutantsList
  },
  data() {
    return {
      columns: [
        {
          id: 1,
          text: "pollutantcode"
        },
        {
          id: 2,
          text: "pollutantname"
        }
      ],
      filter: "",
      records: [
        {
          id: 1,
          pollutantcode: "304",
          pollutantname: "Азот (II) оксид (Азота оксид)"
        },
        {
          id: 2,
          pollutantcode: "0301",
          pollutantname: "Оксид азота (IV) (диоксид азота)"
        },
        {
          id: 3,
          pollutantcode: "0328",
          pollutantname: "Сажа (Углерод)"
        },
        {
          id: 4,
          pollutantcode: "0703",
          pollutantname: "Бенз(а)пирен (3,4-Бензпирен)"
        },
        {
          id: 5,
          pollutantcode: "0337",
          pollutantname: "Углерод оксид"
        },
        {
          id: 6,
          pollutantcode: "0330",
          pollutantname: "Сера диоксид (Ангидрид сернистый)"
        },
        {
          id: 7,
          pollutantcode: "1325",
          pollutantname: "Формальдегид"
        },
        {
          id: 8,
          pollutantcode: "0415",
          pollutantname: "Смесь предельных углеводородов С1H4-C5H12"
        },
        {
          id: 9,
          pollutantcode: "0417",
          pollutantname: "Смесь предельных углеводородов"
        }
      ],
      items: [
        {
          ccontent: "Branch",
          type: String,
          somenumber: 0,
          type: Number,
          child: [],
          edit: false,
          isPollutant: false,
          type: Boolean,
          isLastVisible: true
        }
      ],
      title: "Обновите название словаря...",
      editedItem: null,
      newChild: null,
      newSibling: null
    };
  },
  computed: {

  },
  methods: {
    editItem(item) {
      this.editedItem = item;
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style>

</style>

