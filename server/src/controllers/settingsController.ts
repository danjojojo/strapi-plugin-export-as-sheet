import { type ExportableCollection } from '../schema/SettingsSchema';
import { PLUGIN_CONTENT_TYPE } from '../constants';
import type { Context } from 'koa';

const settingsController = {
  async strapi(ctx: Context) {
    const collections = Object.values(strapi.contentTypes)
      .filter((ct) => ct.kind === 'collectionType' && ct.uid.startsWith('api::'))
      .map((ct) => ({
        uid: ct.uid,
        name: ct.info.displayName,
      }));
    ctx.body = collections;
  },

  async get(ctx: Context) {
    const data = await strapi.entityService.findMany(PLUGIN_CONTENT_TYPE, {});
    ctx.body = data;
  },

  async update(ctx: Context) {
    const { payload }: ExportableCollection = ctx.request.body;

    try {
      for (const data of payload) {
        if (data.added) {
          await strapi.documents(PLUGIN_CONTENT_TYPE).create({
            data: {
              uid: data.uid,
              name: data.name,
            },
          });
        } else {
          await strapi.documents(PLUGIN_CONTENT_TYPE).delete({
            documentId: data.id,
          });
        }
      }
      ctx.body = 'Exportable collections updated successfully.';
    } catch (error) {
      ctx.body = error;
    }
  },
};

export default settingsController;
