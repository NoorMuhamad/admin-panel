// assets
import { ToolOutlined } from '@ant-design/icons';

// icons
const icons = {
	ToolOutlined
};

const settings = {
	id: 'settings',
	title: 'Settings',
	type: 'group',
	role: ['OWNER'],
	children: [
		{
			id: 'settings',
			title: 'Settings',
			type: 'item',
			url: '/settings',
			icon: icons.ToolOutlined,
		},
	]
};

export default settings;
