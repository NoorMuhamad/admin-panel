// assets
import { DollarOutlined, DropboxOutlined } from '@ant-design/icons';

// icons
const icons = {
  DollarOutlined,
  DropboxOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const payments = {
  id: 'group-payments',
  title: 'Payments',
  type: 'group',
  role: ['OWNER'],
  children: [
    {
      id: 'payments',
      title: 'Payments & Balance',
      type: 'item',
      url: '/payments',
      icon: icons.DollarOutlined,
      breadcrumbs: false

    },
    {
      id: 'packages',
      title: 'Packages',
      type: 'item',
      url: '/packages',
      icon: icons.DropboxOutlined,
      breadcrumbs: false
    },

  ]
};

export default payments;
