<template>
  <d-list-group flush>
    <d-list-group-item class="px-3">
      <Spinner v-if="loading" />
      <div v-else-if="error">Ошибка: {{ error.message }}</div>
      <div v-else-if="pollutant && groups">
        <h6>Загрязняющее вещество</h6>
        <hr />

        <d-form>
          <label>Наименование загрязняющего вещества</label>
          <d-input class="mb-3" type="text" disabled :value="pollutant.label" />
          <label>Выбрать группы ЗВ</label>
          <v-select
            :options="groups"
            name="label"
            :id="id"
            :placeholder="placeholder"
            v-model="groupId"
            :reduce="(group) => group.id"
            label="label"
          >
          </v-select>
          <div v-if="validationMsg.length" class="text-danger mt-4">
            {{ validationMsg }}
          </div>
          <div v-if="groupMutateError" class="text-danger mt-4">
            {{ groupMutateError.message }}
          </div>
        </d-form>
        <input
          type="submit"
          value="Сохранить"
          class="btn btn-success mt-3"
          @click="savePol"
        />
        <Spinner v-if="groupMutateLoading" />
      </div>
    </d-list-group-item>
  </d-list-group>
</template>

<script>
import POLL_BY_ID_AND_GROUPS from "@/graphql/queries/PollutantByIdAndGroupsList";
import ADD_POL_TO_GROUP from "@/graphql/mutations/AddPolToGroup";

import { useMutation, useQuery, useResult } from "@vue/apollo-composable";
import { ref } from "@vue/composition-api";

export default {
  props: {
    pollId: {
      type: String,
      required: true,
    },
    slideToggle: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const { pollId, slideToggle } = props;
    const { result, loading, error } = useQuery(POLL_BY_ID_AND_GROUPS, {
      id: pollId,
    });
    const groupId = ref("");
    const validationMsg = ref("");
    const pollutant = useResult(result, null, (data) => {
      groupId.value = data.air_pollutants_by_pk.group
        ? data.air_pollutants_by_pk.group.id
        : "-";
      return data.air_pollutants_by_pk;
    });
    const groups = useResult(result, null, (data) => data.air_pollutant_groups);

    const {
      mutate: groupMutate,
      loading: groupMutateLoading,
      error: groupMutateError,
      onDone,
    } = useMutation(ADD_POL_TO_GROUP, () => ({
      variables: {
        pollutant_id: pollutant.value.id,
        pollutant_group_id: groupId.value,
      },
      update: (cache, groupMutate) => {
        const updatedPoll = groupMutate.data.insert_air_pollutants_groups;
        cache.evict({
          id: "ROOT_QUERY",
          field: "air_pollutants",
          args: { id: updatedPoll.id },
        });
      },
    }));

    function savePol() {
      if (groupId.value === "-") {
        validationMsg.value = "Выберите группу!";
        return;
      }
      groupMutate();
    }

    onDone(() => slideToggle());

    return {
      pollutant,
      groups,
      loading,
      error,
      savePol,
      groupId,
      validationMsg,
      groupMutateLoading,
      groupMutateError,
    };
  },
};
</script>
