<template>
  <div>
    <li>
      <span v-for="item in items" :key="item.id">
        <span v-show="item.edit == false">
          <label
            class="m-1"
            @dblclick="item.edit = true"
            style="background-color: #DCDCDC;"
          >{{item.content}}</label>
        </span>
        <input
          class="m-1"
          v-show="item.edit == true"
          v-model="item.content"
          v-on:blur="item.edit=false; $emit('update')"
          @keyup.enter="item.edit=false; $emit('update')"
        >
        <span v-show="item.edit == false">
          <label
            class="m-1"
            @dblclick="item.edit = true"
            style="background-color: #F5F5F5;"
          >{{ item.somenumber }}</label>
        </span>
        <input
          class="m-1"
          type="number"
          v-show="item.edit == true"
          v-model="item.somenumber"
          v-on:blur="item.edit=false; $emit('update')"
          @keyup.enter="item.edit=false; $emit('update')"
        >
        <span>
          <input type="checkbox" class="m-1" id="customCheck1" v-model="item.isPollutant">
          <label
            class="m-1"
            for="customCheck1"
          >{{ item.isPollutant ? 'pollutant' : 'not pollutant' }}</label>
        </span>
        <span>
          <input type="checkbox" class="m-1" id="customCheck2" v-model="item.isLastVisible">
          <label class="m-1" for="customCheck2">{{ item.isLastVisible ? 'visible' : 'not visible' }}</label>
        </span>
        <d-button
          class="btn-outline-primary btn-sm m-1"
          v-on:click="item.newChild = true"
          v-if="!item.newChild"
          title="Insert one child node"
        >Add child</d-button>
        <d-button
          class="btn-outline-danger btn-sm m-1"
          v-on:click="item.newChild = false"
          v-if="item.newChild"
          title="Remove all child nodes"
        >Remove child(ren)</d-button>
        <d-button
          class="btn-sm m-1"
          v-on:click="item.newSibling = true"
          v-if="!item.newSibling"
          title="Insert one sibling node following this node"
        >Add sibling</d-button>
        <d-button
          class="btn-danger btn-sm m-1"
          v-on:click="item.newSibling = false"
          v-if="item.newSibling"
          title="Remove all siblings that follow this node"
        >Remove sibling(s)</d-button>
        <ul>
          <tree-branch v-if="item.newChild"></tree-branch>
        </ul>
        <tree-branch v-if="item.newSibling"></tree-branch>
      </span>
    </li>
  </div>
</template>

<script>
// eslint-disable-next-line

export default {
  name: 'tree-branch',
  data() {
    return {
      items: [
        {
          content: 'Branch',
          type: String,
          somenumber: 0,
          // eslint-disable-next-line no-dupe-keys
          type: Number,
          child: [],
          edit: false,
          isPollutant: false,
          // eslint-disable-next-line no-dupe-keys
          type: Boolean,
          isLastVisible: true,
          // eslint-disable-next-line no-dupe-keys
          isLastVisible: Boolean,
          newChild: null,
          newSibling: null,
        },
      ],
      editedItem: null,
    };
  },
  computed: {

  },
  methods: {
    editItem(item) {
      this.editedItem = item;
    },
  },
};
</script>
<style scoped>
pre {
  outline: 1px solid #ccc;
  padding: 5px;
  margin: 5px;
}
.string {
  color: green;
}
.number {
  color: darkorange;
}
.boolean {
  color: blue;
}
.null {
  color: magenta;
}
.key {
  color: red;
}
</style>
