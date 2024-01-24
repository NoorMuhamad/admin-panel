// assets
import {
	CustomerServiceOutlined,
	UsergroupAddOutlined
} from '@ant-design/icons';

// icons
const icons = {
	CustomerServiceOutlined,
	UsergroupAddOutlined
};

const applications = {
	id: 'group-application',
	title: 'Applications',
	type: 'group',
	role: ['OWNER', 'ADMIN'],
	children: [
		{
			id: 'user',
			title: 'Users',
			type: 'item',
			url: '/users',
			icon: icons.UsergroupAddOutlined,
		},
		{
			id: 'customer',
			title: 'Customers',
			type: 'item',
			url: '/customers',
			icon: icons.CustomerServiceOutlined,
		}
	]
};

export default applications;