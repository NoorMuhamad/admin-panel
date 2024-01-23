// assets
import {
	BugOutlined,
	MessageOutlined
} from '@ant-design/icons';

// icons
const icons = {
	BugOutlined,
	MessageOutlined
};

<MessageOutlined />

const communications = {
	id: 'group-communications',
	title: 'Communications',
	type: 'group',
	role: ['OWNER', 'ADMIN'],
	children: [
		{
			id: 'sms_templates',
			title: 'SMS Templates',
			type: 'item',
			url: '/sms-templates',
			icon: icons.MessageOutlined,
		},
		{
			id: 'sms_logs',
			title: 'SMS Logs',
			type: 'item',
			url: '/sms-logs',
			icon: icons.BugOutlined,
		}
	]
};

export default communications;