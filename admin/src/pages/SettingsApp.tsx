import { Page } from '@strapi/strapi/admin';
import { Routes, Route } from 'react-router-dom';

import { SettingsPage } from './SettingsPage';
import { StateProvider } from '../providers/StateProvider';

import { pluginPermissions } from '../permissions';

const SettingsApp = () => {
  return (
    <Page.Protect permissions={pluginPermissions.accessSettings}>
      <StateProvider>
        <Routes>
          <Route index element={<SettingsPage />} />
          <Route path="*" element={<Page.Error />} />
        </Routes>
      </StateProvider>
    </Page.Protect>
  );
};

export { SettingsApp };
