export default {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/settings',
      handler: 'settingsController.get',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/settings/strapi',
      handler: 'settingsController.strapi',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/settings/update',
      handler: 'settingsController.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
