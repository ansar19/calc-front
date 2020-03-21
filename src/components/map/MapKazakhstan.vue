<template>
  <d-card class="card-small mb-3">
    <d-form class="map-kazakhstan" @submit="handleOnSubmit" validate>
      <d-card-header class="border-bottom">
        <h6 class="card-title">Данные по регионам</h6>
      </d-card-header>
      <d-card-body>
        <div :id="svgId" class="svg-container"></div>
      </d-card-body>
    </d-form>
  </d-card>
</template>

<script>
import kazakhstanMap from '@/assets/kazakhstanMap';

export default {
  name: 'map-kazakhstan',
  data() {
    return {
      svgId: 'kazakhstanMap',
      mapAttr: {
        viewBoxWidth: 1106,
        viewBoxHeight: 500,
        imageWidth: 1106,
        imageHeight: 500,
      },
      svgContainer: null,
    };
  },
  mounted() {
    this.generateVenueMap();
  },
  methods: {
    generateVenueMap() {
      const vue = this;
      const mapData = kazakhstanMap.g.path;
      const svgContainer = vue
        .$svg('kazakhstanMap')
        .size('100%', '100%')
        .viewbox(-200, 0, vue.mapAttr.viewBoxWidth, vue.mapAttr.viewBoxHeight);
      vue.svgContainer = svgContainer;
      mapData.forEach((pathObj) => {
        vue.generatePath(svgContainer, pathObj);
      });
    },
    generatePath(svgCont, pathObj) {
      const vue = this;

      const attrs = {
        fill: '#8470ff',
        stroke: 'white',
        'stroke-width': 2,
        title: pathObj['-title'],
        airemissionstperiod: pathObj['-airemissionstperiod'],
        airemissionspayments: pathObj['-airemissionspayments'],
        wastetotal: pathObj['-wastetotal'],
        'map-id': pathObj['-id'],
      };
      const element = svgCont.path(pathObj['-d']).attr(attrs);
      // eslint-disable-next-line func-names
      element.click(function () {
        const mapId = this.node.attributes['map-id'].value;
        const title = this.node.attributes.title.value;
        const airemissionstperiod = this.node.attributes.airemissionstperiod.value;
        const airemissionspayments = this.node.attributes.airemissionspayments.value;
        const wastetotal = this.node.attributes.wastetotal.value;
        vue.$emit('map-clicked', {
          mapId, title, airemissionstperiod, airemissionspayments, wastetotal,
        });
      });
    },
  },
};
</script>
