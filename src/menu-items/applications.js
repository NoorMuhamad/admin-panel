// assets
import {
	CustomerServiceOutlined
} from '@ant-design/icons';

// icons
const icons = {
	CustomerServiceOutlined
};

const applications = {
	id: 'group-application',
	title: 'Applications',
	type: 'group',
	children: [
		{
			id: 'customer',
			title: 'Customer',
			type: 'item',
			url: '/customer',
			icon: icons.CustomerServiceOutlined,
		}
	]
};

export default applications;