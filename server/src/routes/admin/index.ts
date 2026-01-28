import settingsRoutes from './settingsRoutes';
import homepageRoutes from './homepageRoutes';

export default () => ({
  type: 'admin',
  routes: [
    ...homepageRoutes.routes,
    ...settingsRoutes.routes,
  ],
});
