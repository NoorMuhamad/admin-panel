import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout/index';
import withAuthentication from 'components/withAuthentication';

const Dashboard = withAuthentication(Loadable(lazy(() => import('pages/dashboard'))), ['OWNER']);
const SamplePage = withAuthentication(Loadable(lazy(() => import('pages/extra-pages/SamplePage'))), ['OWNER', 'ADMIN', 'staff']);
const Customers = withAuthentication(Loadable(lazy(() => import('pages/customers'))), ['OWNER', 'ADMIN', 'staff']);
const Collections = withAuthentication(Loadable(lazy(() => import('pages/collections'))), ['OWNER', 'ADMIN', 'staff']);
const Complaints = withAuthentication(Loadable(lazy(() => import('pages/complaints'))), ['OWNER', 'ADMIN', 'staff']);
const Users = withAuthentication(Loadable(lazy(() => import('pages/users'))), ['OWNER', 'ADMIN', 'staff']);
const Payments = withAuthentication(Loadable(lazy(() => import('pages/payments'))), ['OWNER', 'ADMIN', 'staff']);
const Packages = withAuthentication(Loadable(lazy(() => import('pages/packages'))), ['OWNER', 'ADMIN', 'staff']);
const SmsTemplate = withAuthentication(Loadable(lazy(() => import('pages/smsTemplates'))), ['OWNER', 'ADMIN', 'staff']);
const SmsLogs = withAuthentication(Loadable(lazy(() => import('pages/smsLogs'))), ['OWNER', 'ADMIN', 'staff']);
const Locations = withAuthentication(Loadable(lazy(() => import('pages/locations'))), ['OWNER', 'ADMIN', 'staff']);
const Settings = withAuthentication(Loadable(lazy(() => import('pages/settings'))), ['OWNER', 'ADMIN', 'staff']);

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'dashboard',
      element: <Dashboard />
    },
    {
      path: 'customers',
      element: <Customers />
    },
    {
      path: 'collections',
      element: <Collections />
    },
    {
      path: 'complaints',
      element: <Complaints />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'users',
      element: <Users />
    },
    {
      path: 'payments',
      element: <Payments />
    },
    {
      path: 'packages',
      element: <Packages />
    },
    {
      path: 'sms-templates',
      element: <SmsTemplate />
    },
    {
      path: 'sms-logs',
      element: <SmsLogs />
    },
    {
      path: 'locations',
      element: <Locations />
    },
    {
      path: 'settings',
      element: <Settings />
    }
  ]
};

export default MainRoutes;