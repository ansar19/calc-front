<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Источник выделения </span>
        <h3 class="page-title">{{ release_source.name }}</h3>
      </div>
    </div>

    <d-card class="card-small mb-3">
      <d-card-header class="d-flex">
        <h6 class="d-flex m-0">Детали</h6>
      </d-card-header>

      <spinner v-if="loading" />
      <div v-else-if="error">Ошибка: error.message</div>
      <div v-else>
        <d-card-body>
          <table class="table" style="width: 100%">
            <tr>
              <th>Наименование источника выделения:</th>
              <td class="font-weight-normal">{{ release_source.name }}</td>
            </tr>
            <tr>
              <th>Номер источника выделения:</th>
              <td class="font-weight-normal">{{ release_source.number }}</td>
            </tr>
            <tr>
              <th>Инвентарный номер источника выделения:</th>
              <td class="font-weight-normal">
                {{ release_source.inventory_number }}
              </td>
            </tr>
            <tr>
              <th>Яыляется источником парниковых газов:</th>
              <td class="font-weight-normal">
                {{ release_source.emission_source.organized ? "Да" : "Нет" }}
              </td>
            </tr>
            <tr>
              <th>Наименование промплощадки:</th>
              <td class="font-weight-normal">
                {{
                  release_source.emission_source.facility_location.facility
                    .worksite.name
                }}
              </td>
            </tr>
            <tr>
              <th>Категория промплощадки:</th>
              <td class="font-weight-normal">
                {{
                  release_source.emission_source.facility_location.facility
                    .worksite.category.name
                }}
              </td>
            </tr>
            <tr>
              <th>Цех / объект:</th>
              <td class="font-weight-normal">
                {{
                  release_source.emission_source.facility_location.facility.name
                }}
              </td>
            </tr>
            <tr>
              <th>Участок:</th>
              <td class="font-weight-normal">
                {{ release_source.emission_source.facility_location.name }}
              </td>
            </tr>
            <tr>
              <th>Наименование источника выбросов:</th>
              <td class="font-weight-normal">
                {{ release_source.emission_source.name }}
              </td>
            </tr>
            <tr>
              <th>Номер источника эмиссии:</th>
              <td class="font-weight-normal">
                {{ release_source.emission_source.number }}
              </td>
            </tr>
            <tr>
              <th>Инвентарный номер источника эмиссии:</th>
              <td class="font-weight-normal">
                {{ release_source.emission_source.inventory_number }}
              </td>
            </tr>
            <tr>
              <th>Тип источника эмиссии:</th>
              <td class="font-weight-normal">
                {{
                  release_source.emission_source.organized
                    ? "Организованный"
                    : "Неорганизованный"
                }}
              </td>
            </tr>
            <tr>
              <th>Описание источника эмиссии:</th>
              <td class="font-weight-normal">
                {{ release_source.emission_source.description }}
              </td>
            </tr>
          </table>
        </d-card-body>
      </div>
      <d-card-footer class="text-right border-top">
        <div class="d-flex">
          <router-link to="/release-source-list">Назад</router-link>
          <div class="ml-auto">
            <router-link
              class="mr-2"
              :to="{
                name: 'release-source-edit',
                params: { id: release_source.id },
              }"
            >
              <d-button theme="light">Редактировать</d-button>
            </router-link>
            <d-button theme="danger" @click="deleteReleaseSource"
              >Удалить</d-button
            >
          </div>
        </div>
      </d-card-footer>
    </d-card>
  </div>
</template>

<script>
import RELEASE_SOURCE_BY_PK from "@/graphql/queries/ReleaseSourceByPk";
import { useQuery, useResult } from "@vue/apollo-composable";

export default {
  setup(_, ctx) {
    const router = ctx.root.$router;
    const id = ctx.root.$route.params.id;
    const { result, loading, error } = useQuery(RELEASE_SOURCE_BY_PK, {
      id: id,
    });
    const release_source = useResult(
      result,
      null,
      (data) => data.release_sources_by_pk
    );
    function deleteReleaseSource() {
      console.log("delete release source whith id: ", id);
      router.go(-1);
    }

    return { release_source, deleteReleaseSource, loading, error };
  },
};
</script>
