import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import { pluginPermissions } from './permissions';

const AppComponent = async () => {
  const { App } = await import('./pages/App');
  return App;
};

const SettingsAppComponent = async () => {
  const { SettingsApp } = await import('./pages/SettingsApp');
  return SettingsApp;
};

export default {
  register(app: any) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: 'Export as Sheet',
      },
      Component: AppComponent,
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: 'Export as Sheet',
    });

    app.createSettingSection(
      {
        id: `${PLUGIN_ID}.section`,
        intlLabel: { id: PLUGIN_ID, defaultMessage: 'Export as Sheet' },
      },
      [
        {
          intlLabel: { id: PLUGIN_ID, defaultMessage: 'Settings' },
          id: PLUGIN_ID,
          to: `plugins/${PLUGIN_ID}/settings`,
          Component: SettingsAppComponent,
          permissions: pluginPermissions.accessSettings,
        },
      ]
    );
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
