<template>
  <d-row class="mb-3">
    <d-col cols="12" md="8" lg="8">
      <label>Промплощадка (ПП)</label>
      <template v-if="!worksiteEdit">
        <v-select
          class="mb-2"
          label="name"
          placeholder="Выбрать ПП"
          :value="worksite"
          :options="worksites_list"
          @input="selectWorksite"
          required
        ></v-select>
        <div>
          <button
            v-if="worksite.id"
            type="button"
            class="btn btn-sm btn-outline-primary"
            @click="worksiteEditFn()"
          >
            Редактировать ПП
          </button>
          <button
            v-if="!worksite.id"
            type="button"
            class="btn btn-sm btn-outline-primary"
            @click="worksiteEditFn()"
          >
            Добавить ПП
          </button>
        </div>
      </template>
      <template v-else>
        <d-input
          class="mb-3"
          placeholder="Наименование ПП"
          type="text"
          v-model="editWorksiteName"
          required
        />
        <div class="d-flex flex-row">
          <button
            class="btn btn-outline-success mr-2"
            @click="saveWorksite"
            type="button"
          >
            Сохранить
          </button>
          <!-- <button
              v-if="worksite"
              class="btn btn-outline-danger"
              @click="remove('worksite')"
              type="button"
            >
              Удалить
            </button> -->
          <button
            type="button"
            class="btn btn-link mr-2"
            @click="() => (worksiteEdit = false)"
          >
            Отменить
          </button>
        </div>
      </template>
    </d-col>
    <d-col cols="12" md="4" lg="4">
      <div>
        <label>Категория ПП</label>
        <v-select
          v-if="worksiteEdit"
          class="mb-3"
          placeholder="Выбрать категорию ПП"
          label="name"
          :value="worksite.category"
          @input="setNatureUserCategory"
          :options="worksite_categories"
          :disabled="!worksiteEdit"
        />
        <d-input v-else :value="worksite.category.name" disabled />
      </div>
    </d-col>
  </d-row>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import WORKSITE_CATEGORIES from "@/graphql/WorksiteCategoriesList.gql";

export default {
  apollo: {
    worksite_categories: {
      query: WORKSITE_CATEGORIES,
    },
  },
  data() {
    return {
      worksite_categories: [],
      worksiteEdit: false,
      worksites_list: [],
      editWorksiteName: "",
    };
  },
  computed: {
    ...mapState("releaseStore", ["worksite", "worksites"]),
  },
  methods: {
    ...mapActions("releaseStore", ["fetchWorksites", "upsertWorksite"]),
    ...mapMutations("releaseStore", [
      "setWorksite",
      "setNatureUserCategory",
      "setWorksiteName",
    ]),

    selectWorksite(val) {
      const worksite = val || {
        name: "",
        category_id: this.worksite.category.id,
        category: this.worksite.category,
      };
      this.setWorksite(worksite);
    },

    saveWorksite() {
      this.upsertWorksite(this.editWorksiteName)
      this.worksiteEdit = false
    },

    worksiteEditFn() {
      this.worksiteEdit = true;
      if (this.worksite.id !== null) {
        this.editWorksiteName = this.worksite.name;
      }
    },
  },
  created() {
    this.fetchWorksites();
    this.worksites_list = this.worksites;
  },
};
</script>
