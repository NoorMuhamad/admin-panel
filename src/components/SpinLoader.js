import React from 'react';
import { Flex, Spin } from 'antd';

const SpinLoader = () => (
	<Flex align="center" gap="middle" style={{ justifyContent: "center" }}>
		<Spin size="large" />
	</Flex>
);

export default SpinLoader;
