import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout/index';
import withAuthentication from 'components/withAuthentication';

// render - dashboard
const Dashboard = withAuthentication(Loadable(lazy(() => import('pages/dashboard'))), ['OWNER']);

// render - sample page
const SamplePage = withAuthentication(Loadable(lazy(() => import('pages/extra-pages/SamplePage'))), ['OWNER', 'ADMIN', 'staff']);

// render - utilities (assuming these don't require role-based access)
const Typography = withAuthentication(Loadable(lazy(() => import('pages/components-overview/Typography'))), ['OWNER', 'ADMIN', 'staff']);
const Color = withAuthentication(Loadable(lazy(() => import('pages/components-overview/Color'))), ['OWNER', 'ADMIN', 'staff']);
const Shadow = withAuthentication(Loadable(lazy(() => import('pages/components-overview/Shadow'))), ['OWNER', 'ADMIN', 'staff']);
const AntIcons = withAuthentication(Loadable(lazy(() => import('pages/components-overview/AntIcons'))), ['OWNER', 'ADMIN', 'staff']);
const Customer = withAuthentication(Loadable(lazy(() => import('pages/customer'))), ['OWNER', 'ADMIN', 'staff']);

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'dashboard',
      element: <Dashboard />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'customer',
      element: <Customer />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    }
  ]
};

export default MainRoutes;