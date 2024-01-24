import { DollarOutlined, DropboxOutlined } from '@ant-design/icons';

const icons = {
  DollarOutlined,
  DropboxOutlined
};

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
    },
    {
      id: 'packages',
      title: 'Packages',
      type: 'item',
      url: '/packages',
      icon: icons.DropboxOutlined,
    },

  ]
};

export default payments;
