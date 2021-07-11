<template>
  <div>
    <div v-if="!loaded">Loading...</div>
    <wrapper v-if="loaded">
      <d-form @submit.prevent="saveReleaseSource">
        <d-card-body>
          <release-source-component
            :releaseSource="releaseSource"
          ></release-source-component>
          <!-- <release-source-head :releaseSource="releaseSource"></release-source-head> -->
          <hr class="my-5" />
          <release-source-emission
            :releaseSource="releaseSource"
            :setEmissionSource="setEmissionSource"
          ></release-source-emission>
        </d-card-body>
        <d-card-footer class="border-top">
          <div v-if="errorMsg">
            <d-alert theme="danger" show="errorMsg" dismissible>{{
              errorMsg
            }}</d-alert>
          </div>
            <alert :message="saveSuccess" ref="alert"/>
          <!-- <div v-if="saveSuccess">
            <d-alert theme="success" show="saveSuccess">{{
              saveSuccess
            }}</d-alert> -->
          <!-- </div> -->
          <div class="d-flex">
            <router-link tag="a" to="/release-source-list"
              >Вернуться к списку</router-link
            >
            <button
              id="saveRelease"
              type="submit"
              class="btn btn-success ml-auto"
            >
              Сохранить
            </button>
          </div>
        </d-card-footer>
      </d-form>
    </wrapper>
  </div>
</template>

<script>
import Alert from "@/components/layout/Alert/Alert.vue"
import Wrapper from "@/components/release-source/ReleaseSourceWrapper.vue";
import ReleaseSourceHead from "@/components/release-source/ReleaseSourceHead.vue";
import ReleaseSourceEmission from "@/components/release-source/ReleaseSourceEmission.vue";
import ReleaseSourceComponent from "@/components/release-source/ReleaseSource.vue";
//
import {
  fetchReleaseSourceByPk,
  updateReleaseSourceByPk,
  addReleaseSource,
} from "@/services/api";

export default {
  components: {
    Alert,
    Wrapper,
    ReleaseSourceHead,
    ReleaseSourceEmission,
    ReleaseSourceComponent,
  },
  name: "release-source",
  data() {
    return {
      loaded: true,
      errorMsg: "",
      saveSuccess: "",
      filters: [],
      releaseSource: {
        name: "",
        number: "",
        inventory_number: "",
        ghg_source: false,
        emission_src_id: "",
        emission_source: {
          name: "",
          number: "",
          inventory_number: "",
          organized: false,
          product: "",
          description: "",
          facility_location: {
            name: "",
            facility: {
              name: "",
              worksite: {
                name: "",
                category: {
                  name: "",
                },
              },
            },
          },
        },
      },
    };
  },

  computed: {
    saveReleaseValidation() {
      let valid = true;
      // if (
      //   !this.releaseSource.name ||
      //   !this.releaseSource.number ||
      //   !this.releaseSource.inventory_number ||
      //   !this.releaseSource.emission_src_id
      // )
      //   valid = false;
      return valid;
    },
  },

  methods: {
    async saveReleaseSource() {
      if (this.saveReleaseValidation) {
        const { emission_source, ...release_source } = this.releaseSource;
        const rs = this.releaseSource.id
          ? await updateReleaseSourceByPk(release_source)
          : await addReleaseSource(release_source);
        this.releaseSource = { ...rs };
        this.saveSuccess = rs ? "Сохранено" : "Ошибка";
        this.$refs.alert.showAlert()
        if(this.$route.name === 'release-source-add') {
          this.$router.push({ name: 'release-source-edit', params: { id: rs.id } })
        }
      } else {
        throw new Error("Заполните все данные");
      }
    },
    setEmissionSource(val) {
      this.releaseSource.emission_source = val;
      this.releaseSource.emission_src_id = val.id;
    },
  },

  async created() {
    const id = this.$route.params.id;
    if (id) {
      this.releaseSource = await fetchReleaseSourceByPk(id);
      this.loaded = true;
    }
  },
};
</script>
