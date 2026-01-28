import type { Core } from '@strapi/strapi';

const bootstrap = ({ strapi }: { strapi: Core.Strapi }) => {
  // bootstrap phase
  const actions = [
    {
      section: "plugins",
      displayName: "View Settings",
      uid: "settings",
      pluginName: "export-as-sheet",
    }
  ]

  strapi.admin.services.permission.actionProvider.registerMany(actions);
};

export default bootstrap;
