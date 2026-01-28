import { Page } from '@strapi/strapi/admin';
import { Routes, Route } from 'react-router-dom';

import { HomePage } from './HomePage';
import { StateProvider } from "../components/provider/StateProvider"

const App = () => {
  return (
    <StateProvider>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="*" element={<Page.Error />} />
      </Routes>
    </StateProvider>
  );
};

export { App };
