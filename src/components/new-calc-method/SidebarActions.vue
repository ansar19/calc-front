<template>
  <d-card class="card-small mb-3 ml-2 mr-2">
    <d-card-header class="border-bottom">
      <h6 class="m-0">{{ title }}</h6>
    </d-card-header>

    <d-card-body class="card-body p-2 o-auto" style="height: 25rem;">
      <h6>Промплощадки ({{ workSiteList }})</h6>

      <d-input-group class="mb-2">
        <d-input placeholder="Добавьте новую промплощадку" type="text" v-model="newWorkSite"/>
        <d-input-group-addon append>
          <d-button class="btn-primary" v-on:click.stop.prevent="addWorkSite">
            <i class="material-icons">add</i>
          </d-button>
        </d-input-group-addon>
      </d-input-group>

      <!-- List Group -->
      <d-list-group flush class="list-group-small">
        <h5 class="title mt-2">
          <small class="text-muted">Preview:</small>
          {{ newWorkSite }}
        </h5>
        <d-list-group-item v-for="workSite in workSiteList" :key="workSite.id" class="d-flex px-3">
          <span class="text-semibold text-fiord-blue">{{ workSite.workSiteName }}</span>
          <span class="ml-auto text-right">
            <d-button size="sm" class="btn-danger" v-on:click="removeWorkSite(workSite)">
              <i class="material-icons">delete</i>
            </d-button>
          </span>
        </d-list-group-item>
      </d-list-group>
    </d-card-body>

    <d-card-footer>
      <div class="d-flex">
        <d-button size="sm" class="btn-accent ml-auto">
          <i class="material-icons">save</i> Сохранить
        </d-button>
      </div>
    </d-card-footer>
  </d-card>
</template>

<script>
export default {
  name: 'sidebar-actions',

  methods: {
    addWorkSite() {
      if (this.newWorkSite == '') return;
      this.workSiteList.push({
        workSiteName: this.newWorkSite,
      });
      this.newWorkSite = '';
    },
    removeWorkSite(workSite) {
      const index = this.workSiteList.indexOf(workSite);
      this.workSiteList.splice(index, 1);
    },
  },

  props: {
    /**
     * The component's title.
     */
    title: {
      type: String,
      default: 'Добавление новой формы',
    },
    props: {
      // basic type check (`null` means accept any type)
      propA: Number,
      // multiple possible types
      propB: [String, Number],
      // a number with default value
      propD: {
        type: Number,
        default: 100,
      },
      // object/array defaults should be returned from a factory function
      propE: {
        type: Object,
        default() {
          return { message: 'hello' };
        },
      },
    },
    workSiteList: {
      type: [Array, Object],
      default: [
        {
          workSiteName: 'Скважина 2',
        },
        {
          workSiteName: 'Завод металлоизделий',
        },
        {
          workSiteName: 'База поддержки',
        },
      ],
    },
    newWorkSite: '',
    workSite: '',
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
