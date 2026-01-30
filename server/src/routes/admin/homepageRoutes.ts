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
      handler: 'homepageController.getAttrAndEntriesCount',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/collections/:uid/entries',
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
