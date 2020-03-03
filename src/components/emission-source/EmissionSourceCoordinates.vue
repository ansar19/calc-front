<template>
  <d-card class="card-small mb-3">
    <d-card-header class="border-bottom">
      <h6 class="card-title">Расположение источников</h6>
      <div class="block-handle" align="right">
        <!-- settings buttons part -->
        <d-button size="sm" class="btn-primary btn-sm ml-2" v-d-toggle.my-collapse>Настройки</d-button>
      </div>
    </d-card-header>
    <d-card-body>
      <!-- Map Settings part collapsed -->
      <d-collapse id="my-collapse">
        <d-row>
          <d-col cols="12" md="6" lg="6">
            <div class="p-3 mt-3 border rounded">
              <d-row>
                <d-col cols="12" md="6" lg="6">
                  <strong>Уровень zoom</strong>
                  <d-input v-model.number="zoom" type="number"></d-input>
                  <strong>Расположение для zoom:</strong>
                  <d-form-select v-model="zoomPosition">
                    <option
                      v-for="(position, index) in Positions"
                      :key="index"
                      :value="position"
                    >{{ position }}</option>
                  </d-form-select>
                </d-col>
                <d-col cols="12" md="6" lg="6">
                  <strong>Расположение для контроля слоев:</strong>

                  <d-form-select v-model="layersPosition">
                    <option
                      v-for="(position, index) in Positions"
                      :key="index"
                      :value="position"
                    >{{ position }}</option>
                  </d-form-select>
                  <br />
                  <strong>Расположение для copyright:</strong>
                  <d-form-select v-model="attributionPosition">
                    <option
                      v-for="(position, index) in Positions"
                      :key="index"
                      :value="position"
                    >{{ position }}</option>
                  </d-form-select>
                </d-col>
              </d-row>
            </div>
          </d-col>
          <d-col cols="12" md="6" lg="6">
            <h5>Список слоев</h5>
            <div class="meta">
              <table class="meta-table">
                <thead>
                  <tr>
                    <th>Слой</th>
                    <th>Видимый слой?</th>
                    <th>Маркеры видимы?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in stuff" :key="index">
                    <td data-label="Слой">{{ "Слой " + (index + 1) }}</td>
                    <td data-label="Видимый слой?" style="text-align: center">
                      <d-checkbox v-model="item.visible"></d-checkbox>
                    </td>
                    <td data-label="Маркеры видимы?" style="text-align:center">
                      <d-checkbox v-model="item.markersVisible"></d-checkbox>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </d-col>
        </d-row>
      </d-collapse>
      <hr />
      <d-row>
        <d-col cols="12" md="6" lg="6">
          <h5>Список источников</h5>
          <br />
          <div class="table-responsive">
            <table class="meta-table">
              <thead>
                <tr>
                  <th>Источник</th>
                  <th>Широта</th>
                  <th>Долгота</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in markers" :key="index">
                  <td data-label="Маркер">{{item.tooltip}}</td>
                  <td data-label="Широта">
                    <input v-model.number="item.position.lat" />
                  </td>
                  <td data-label="Долгота">
                    <input v-model.number="item.position.lng" />
                  </td>
                  <td style="text-align: center">
                    <template v-if="!loading">
                      <d-button
                        class="mr-1"
                        size="sm"
                        outline
                        theme="success"
                        @click="saveMarker(index)"
                      >
                        <i class="material-icons">save</i>
                      </d-button>
                      <d-button size="sm" outline theme="danger" @click="removeMarker(index)">
                        <i class="material-icons">delete_forever</i>
                      </d-button>
                    </template>
                    <template v-if="loading">
                      <div class="spinner-border text-secondary" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <d-button outline theme="success" class="btn-sm mt-2">Сохранить коррдинаты</d-button>
          <hr />
        </d-col>
        <d-col cols="12" md="6" lg="6">
          <div id="example" style="height: 100%; overflow: auto;">
            <l-map
              :zoom.sync="zoom"
              :options="mapOptions"
              :center="center"
              :bounds="bounds"
              :min-zoom="minZoom"
              :max-zoom="maxZoom"
              style="width: 100%; height: 75vh;"
              ref="map"
            >
              <l-control-layers :position="layersPosition" :collapsed="false" :sort-layers="true" />
              <l-tile-layer
                v-for="tileProvider in tileProviders"
                :key="tileProvider.name"
                :name="tileProvider.name"
                :visible="tileProvider.visible"
                :url="tileProvider.url"
                :attribution="tileProvider.attribution"
                :token="token"
                layer-type="base"
              />
              <l-control-zoom :position="zoomPosition" />
              <l-control-attribution :position="attributionPosition" :prefix="attributionPrefix" />
              <l-control-scale :imperial="imperial" />
              <l-marker
                v-for="marker in markers"
                :key="marker.id"
                draggable
                :lat-lng.sync="marker.position"
                :icon="marker.icon"
                @click="alert(marker)"
              >
                <l-popup :content="marker.tooltip" />
                <l-tooltip :content="marker.tooltip" />
              </l-marker>
              <l-layer-group
                v-for="item in stuff"
                :key="item.id"
                :visible="item.visible"
                layer-type="overlay"
                name="Слой 1"
              >
                <l-layer-group :visible="item.markersVisible">
                  <l-marker
                    v-for="marker in item.markers"
                    :key="marker.id"
                    :visible="marker.visible"
                    :draggable="marker.draggable"
                    :lat-lng="marker.position"
                    @click="alert(marker)"
                  />
                </l-layer-group>
              </l-layer-group>
            </l-map>
          </div>
        </d-col>
      </d-row>
      <hr />
    </d-card-body>
  </d-card>
</template>

<script>
import api from '@/services/api';
import { latLngBounds } from 'leaflet';
import {
  LMap,
  LTileLayer,
  LMarker,
  LLayerGroup,
  LTooltip,
  LPopup,
  LControlZoom,
  LControlAttribution,
  LControlScale,
  LControlLayers,
} from 'vue2-leaflet';

const markers1 = [
  {
    position: { lng: 71.47, lat: 51.16 },
    visible: true,
    draggable: true,
  },
];

const tileProviders = [
  {
    name: 'OpenStreetMap',
    visible: true,
    attribution:
      '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },
  {
    name: 'OpenTopoMap',
    visible: false,
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution:
      'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  },
];

export default {
  name: 'emission-source-coordinates',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LLayerGroup,
    LTooltip,
    LPopup,
    LControlZoom,
    LControlAttribution,
    LControlScale,
    LControlLayers,
  },
  data() {
    return {
      loading: false,
      source: [],
      currentview: 'example',
      center: [51.1801, 71.4459],
      opacity: 0.6,
      token: 'your token if using mapbox',
      mapOptions: {
        zoomControl: false,
        attributionControl: false,
        zoomSnap: true,
      },
      zoom: 8,
      minZoom: 1,
      maxZoom: 20,
      zoomPosition: 'topleft',
      attributionPosition: 'bottomright',
      layersPosition: 'topright',
      attributionPrefix: 'Vue2Leaflet',
      imperial: false,
      Positions: ['topleft', 'topright', 'bottomleft', 'bottomright'],
      tileProviders,
      markers: [],
      stuff: [
        {
          id: 's1',
          markers: markers1,
          draggable: true,
          visible: true,
        },
      ],
      bounds: latLngBounds(
        { lat: 47.1166687, lng: 51.8833313 }, // Atyrau coordinates
        { lat: 49.9714317, lng: 82.6058578 }, // Oskemen coordinates
      ),
    };
  },
  created() {
    api
      .getResource('emissionSources')
      .then((res) => {
        this.source = res;
      })
      .then(() => {
        for (let i = 0; i < this.source.length; i += 1) {
          const emissionSource = {
            id: this.source[i].id,
            tooltip: this.source[i].emissionSourceName,
            visible: true,
          };
          if (!this.source[i].position) {
            emissionSource.position = {
              lat: 51 + Math.random(),
              lng: 71 + Math.random(),
            };
          } else emissionSource.position = this.source[i].position;
          this.markers.push(emissionSource);
        }
      });
  },
  methods: {
    alert(item) {
      // eslint-disable-next-line no-alert
      alert(`this is ${JSON.stringify(item)}`);
    },
    addMarker() {
      const newMarker = {
        position: { lat: 51.1605, lng: 71.4704 },
        draggable: true,
        visible: true,
      };
      this.markers.push(newMarker);
    },
    removeMarker(index) {
      this.markers.splice(index, 1);
    },
    saveMarker(index) {
      this.loading = true;
      api
        .patchResource(
          'emissionSources',
          this.markers[index].id,
          { positon: this.markers[index].position },
        )
        .then(() => {
          this.loading = false;
        });
    },
  },
};
</script>
