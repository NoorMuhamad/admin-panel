import React from 'react';
import { Row, Col, Card, Avatar, Typography } from 'antd';
import { UserOutlined, IdcardOutlined, LockOutlined, MailOutlined, CreditCardOutlined, CalendarOutlined, UsergroupAddOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { formatDate } from 'utils/password-strength';

const { Meta } = Card;
const { Text } = Typography;

const View = ({ data }) => {
	const cardStyle = {
		width: 320,
		border: '1px solid #e8e8e8',
		borderRadius: '8px',
		padding: '0px',
	};

	const avatarStyle = {
		width: 80,
		height: 80,
		backgroundColor: '#87d068',
	};

	const titleStyle = {
		fontSize: '16px',
		marginBottom: '4px',
	};

	const descriptionStyle = {
		fontSize: '14px',
		color: 'rgba(0, 0, 0, 0.45)',
	};

	return (
		<Row gutter={[16, 16]}>
			<Col xs={24} sm={24} md={12} lg={8} xl={8}>
				<Card style={cardStyle}>
					<Meta
						avatar={
							<Avatar
								style={avatarStyle}
								src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
								icon={<UserOutlined />}
							/>
						}
						title={<div style={titleStyle}>{data.firstName} {data.lastName}</div>}
						description={
							<div style={descriptionStyle}>
								<p>
									<MailOutlined /> {data.email}
								</p>
								<p>
									<EnvironmentOutlined /> Pakistan
								</p>
							</div>
						}
					/>
				</Card>
			</Col>

			<Col xs={24} sm={24} md={12} lg={16} xl={16}>
				<div style={{ background: '#fff', padding: 24, minHeight: 280, width: '100%', border: '1px solid #e8e8e8' }}>
					<Row gutter={16}>
						<Col span={12}>
							<Text strong>
								<IdcardOutlined /> ID
							</Text>
							<br />
							<Text>{data.id}</Text>
						</Col>
						<Col span={12}>
							<Text strong>
								<LockOutlined /> Password
							</Text>
							<br />
							<Text>****</Text>
						</Col>
					</Row>
					<Row gutter={16} style={{ marginTop: 16 }}>
						<Col span={12}>
							<Text strong>
								<CreditCardOutlined /> CNIC
							</Text>
							<br />
							<Text>{data.cnic}</Text>
						</Col>
						<Col span={12}>
							<Text strong>
								<CalendarOutlined /> JoiningDate
							</Text>
							<br />
							<Text>{formatDate(data.createdAt)}</Text>
						</Col>
					</Row>
					<Row gutter={16} style={{ marginTop: 16 }}>
						<Col span={12}>
							<Text strong>
								<UsergroupAddOutlined /> Role
							</Text>
							<br />
							<Text>{data.role}</Text>
						</Col>
						<Col span={12}>
							<Text strong>
								<PhoneOutlined /> Phone Number
							</Text>
							<br />
							<Text>{data.phoneNumber}</Text>
						</Col>
					</Row>
					<Row gutter={16} style={{ marginTop: 16 }}>
						<Col span={24}>
							<Text strong>
								<EnvironmentOutlined /> Address
							</Text>
							<br />
							<Text>{data.address}</Text>
						</Col>
					</Row>
				</div>
			</Col>
		</Row>
	);
};

View.propTypes = {
	data: PropTypes.object,
};

export default View;
