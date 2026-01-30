import { format, parseISO, isValid } from 'date-fns';
import { PLUGIN_CONTENT_TYPE } from '../constants';
import type { Context } from 'koa';

const homepageController = {
  async getCollections(ctx: Context) {
    const exportableCollections = await strapi.entityService.findMany(PLUGIN_CONTENT_TYPE, {});
    const collections = exportableCollections?.map((col: any) => ({
      uid: col.uid,
      name: col.name,
    }));
    ctx.body = collections;
  },

  async getAttrAndEntriesCount(ctx: Context) {
    const collectionUid = ctx.params.uid;
    const { start, end } = ctx.query;
    const contentTypes = strapi.contentTypes[collectionUid];

    let attributes: any[] = [];
    let mediaAttributes: any[] = [];

    for (const [key, value] of Object.entries(contentTypes.attributes)) {
      if (value.visible === false || key === 'publishedAt') continue; // for hidden attributes
      const label = key
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[_-]/g, ' ')
        .toUpperCase();
      attributes.push({ field: key, label, type: value.type });
      if (value.type === 'media') {
        mediaAttributes.push(key);
      }
    }

    const entriesTotalCount = await strapi.documents(collectionUid).count({
      filters: {
        createdAt: {
          $between: [start, end],
        },
      },
    });

    ctx.body = {
      attributes,
      mediaAttributes,
      entriesTotalCount,
    };
  },

  async getEntries(ctx: Context) {
    const collectionUid = ctx.params.uid;
    const { start, end, limit, offset } = ctx.query;
    const { attributes, mediaAttributes } = ctx.request.body;

    if (!collectionUid) {
      ctx.badRequest('Collection UID is required');
      return;
    }

    const rawEntries = await strapi.db.query(collectionUid).findMany({
      populate: mediaAttributes,
      filters: {
        createdAt: {
          $between: [start, end],
        },
        publishedAt: {
          $notNull: true
        }
      },
      limit: Number(limit),
      offset: Number(offset),
    });

    const entries = rawEntries?.map((entry: any) => {
      const filteredEntry: any = {};
      for (const attr of attributes) {
        const value = entry[attr.field];
        switch (attr.type) {
          case 'media':
            filteredEntry[attr.field] = value?.url ?? 'None';
            break;
          case 'datetime':
            filteredEntry[attr.field] = isValid(parseISO(value))
              ? format(parseISO(value), 'MMMM dd, yyyy, hh:mm a')
              : 'N/A';
            break;
          default:
            filteredEntry[attr.field] = value ?? 'None';
            break;
        }
      }
      return filteredEntry;
    });

    ctx.body = {
      entries
    };
  },
};

export default homepageController;
