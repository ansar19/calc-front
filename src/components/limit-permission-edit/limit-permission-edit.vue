<template>
  <d-list-group flush>
    <d-list-group-item class="px-3">
      <Spinner v-if="loading" />
      <div v-else-if="error">Ошибка: {{ error.message }}</div>
      <div v-else-if="emission_sources">
        <h6>Разрешение на эмиссию</h6>
        <hr />

        <d-form @submit.prevent="permissionMutate">
          <label>Наименование</label>
          <input
            type="text"
            v-model="permission.name"
            class="form-control mb-3 mr-sm-2"
            placeholder="Наименование разрешения"
            required
          />
          <label>Номер</label>
          <input
            type="text"
            v-model="permission.number"
            class="form-control mb-3 mr-sm-2"
            placeholder="Номер разрешения"
            required
          />
          <label>Выбрать источник эмиссии</label>
          <v-select
            :options="emission_sources"
            name="label"
            class="mb-3"
            :id="id"
            :placeholder="placeholder"
            v-model="permission.emission_src_id"
            :reduce="(emission) => emission.id"
            label="name"
            required
          >
          </v-select>
          <label>Лимит</label>
          <input
            type="text"
            v-model="permission.t_year_limit"
            class="form-control mb-3 mr-sm-2"
            placeholder="Лимит"
            required
          />
          <label>Дата начала</label>
          <input
            type="date"
            class="form-control mb-3 mr-sm-2"
            v-model="permission.start_date"
            required
          />
          <label>Дата конца</label>
          <input
            type="date"
            class="form-control mb-3 mr-sm-2"
            v-model="permission.end_date"
            required
          />
          <textarea class="form-control" rows="3" v-model="permission.description"/>
        <input
          type="submit"
          value="Сохранить"
          class="btn btn-success mt-3"
        />
        </d-form>
        <Spinner v-if="permissionMutateLoading" />
        <div v-else-if="permissionMutateError">
          {{ permissionMutateError.message }}
        </div>
      </div>
    </d-list-group-item>
  </d-list-group>
</template>

<script>
import EMISSION_SOURCES_LIST from "@/graphql/queries/EmissionSourcesList";
import ADD_LIMIT_PERMISSION from "@/graphql/mutations/AddLimitPermission";
import { useMutation, useQuery, useResult } from "@vue/apollo-composable";
import { reactive, ref } from "@vue/composition-api";
import { useGlobalState } from "@/useStore";

export default {
  props: {
    slideToggle: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const state = useGlobalState();
    const permission = reactive({
      name: "",
      number: "",
      emission_src_id: "",
      start_date: null,
      end_date: null,
      t_year_limit: 0,
      company_id: state.value.companyId,
    });
    const { slideToggle } = props;

    const { result, loading, error } = useQuery(EMISSION_SOURCES_LIST);
    const emission_sources = useResult(
      result,
      null,
      (data) => data.emission_sources
    );
    const validationMsg = ref("");

    const {
      mutate: permissionMutate,
      loading: permissionMutateLoading,
      error: permissionMutateError,
      onDone,
    } = useMutation(ADD_LIMIT_PERMISSION, () => ({
      variables: {
        input: permission,
      },
      update: (cache, permissionMutate) => {
        const insertLimitPermission =
          permissionMutate.data.insert_limit_permissions_one;
        cache.evict({
          id: "ROOT_QUERY",
          field: "limit_permissions",
          args: { id: insertLimitPermission.id },
        });
      },
    }));

    onDone(() => slideToggle());

    return {
      permission,
      emission_sources,
      loading,
      error,
      validationMsg,
      permissionMutateLoading,
      permissionMutateError,
      permissionMutate,
    };
  },
};
</script>
