const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-red": "#dc3545",
              "@primary-white": "#fff",
              "@primary-green": "#198754",
              "@primary-yellow": "#ffc107",
              "@primary-gray": "#e8e8e8",
              "@box-shadow-light": "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
