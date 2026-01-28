export default {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/collections',
      handler: 'homepageController.getCollections',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/collections/:uid',
      handler: 'homepageController.getEntries',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/export',
      handler: 'exportController.toSheet',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
