import svgJs from 'svg.js/dist/svg';

export default {
  install: (Vue) => {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$svg = svgJs;
  },
};
