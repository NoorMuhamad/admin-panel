// assets
import { EnvironmentOutlined } from '@ant-design/icons';

// icons
const icons = {
	EnvironmentOutlined
};

const locations = {
	id: 'locations',
	title: 'Locations',
	type: 'group',
	role: ['OWNER'],
	children: [
		{
			id: 'locations',
			title: 'Locations',
			type: 'item',
			url: '/locations',
			icon: icons.EnvironmentOutlined,
			breadcrumbs: false

		},
	]
};

export default locations;
