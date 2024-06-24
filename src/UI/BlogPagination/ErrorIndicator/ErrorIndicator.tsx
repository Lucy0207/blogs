import { Alert, Space } from 'antd';

const ErrorIndicator: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Alert message="Something went wrong" type="error" />
  </Space>
);

export default ErrorIndicator;