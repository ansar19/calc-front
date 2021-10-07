
/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('@vue/cli-service').ProjectOptions} */
module.exports = {
    productionSourceMap: false,
    pluginOptions: {
      vite: {
        disabledTypeChecker: true,
        disabledLint: true,
        optimizeDeps: {
          include: [
            '@fortawesome/vue-fontawesome',
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-solid-svg-icons/faSync',
            '@fortawesome/free-solid-svg-icons/faUser',
          ],
        },
      },
    },
  };
