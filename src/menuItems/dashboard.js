// assets
import { DashboardOutlined, PieChartOutlined, ReconciliationOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  PieChartOutlined,
  ReconciliationOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Dashboard',
  type: 'group',
  role: ['OWNER'],
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.PieChartOutlined,
      breadcrumbs: false

    },
    {
      id: 'collections',
      title: 'Collections',
      type: 'item',
      url: '/collections',
      icon: icons.ReconciliationOutlined,
      breadcrumbs: false
    },
    {
      id: 'complaint',
      title: 'Complaints',
      type: 'item',
      url: '/complaints',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
