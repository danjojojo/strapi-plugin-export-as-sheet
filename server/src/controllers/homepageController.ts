import { format, parseISO } from 'date-fns';
import { PLUGIN_CONTENT_TYPE } from '../constants';

const homepageController = {
  async getCollections(ctx) {
    const exportableCollections = await strapi.entityService.findMany(PLUGIN_CONTENT_TYPE, {});
    const collections = exportableCollections.map((col: any) => ({
      uid: col.uid,
      name: col.name,
    }));
    ctx.body = collections;
  },

  async getEntries(ctx) {
    const collectionUid = ctx.params.uid;
    const { start, end } = ctx.query;
    if (!collectionUid) {
      ctx.badRequest('Collection UID is required');
      return;
    }

    const contentTypes = strapi.contentTypes[collectionUid];

    let attributes: any[] = [];
    let mediaAttributes: any[] = [];
    let entries: any[] = [];

    for (const [key, value] of Object.entries(contentTypes.attributes)) {
      if (value.visible === false) continue; // for hidden attributes
      const label = key
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[_-]/g, ' ')
        .toUpperCase();
      attributes.push({ field: key, label, type: value.type });
      if (value.type === 'media') {
        mediaAttributes.push(key);
      }
    }

    const startDateFallback = new Date();
    const endDateFallback = new Date();
    startDateFallback.setHours(0, 0, 0, 0);
    endDateFallback.setHours(23, 59, 59, 999);

    const startDate = start ?? startDateFallback.toISOString();
    const endDate = end !== 'none' ? end : endDateFallback.toISOString();

    const rawEntries = await strapi.entityService.findMany(collectionUid, {
      populate: mediaAttributes,
      filters: {
        createdAt: {
          $between: [startDate, endDate],
        },
      },
    });

    entries = rawEntries.map((entry: any) => {
      const filteredEntry: any = {};
      for (const attr of attributes) {
        const value = entry[attr.field];
        switch (attr.type) {
          case 'media':
            filteredEntry[attr.field] = value?.url ?? 'None';
            break;
          case 'datetime':
            filteredEntry[attr.field] = format(parseISO(value), 'MMMM dd, yyyy, hh:mm a');
            break;
          default:
            filteredEntry[attr.field] = value ?? 'None';
            break;
        }
      }
      return filteredEntry;
    });

    ctx.body = {
      attributes,
      entries,
    };
  },
};

export default homepageController;
