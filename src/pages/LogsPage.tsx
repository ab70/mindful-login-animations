
import React from 'react';
import { 
  PageHeader, 
  Breadcrumb, 
  Layout, 
  Space, 
  Card,
  Button,
  Menu,
  Dropdown,
  Typography
} from 'antd';
import { 
  ClockCircleOutlined, 
  CloudServerOutlined, 
  DownOutlined,
  FilterOutlined
} from '@ant-design/icons';
import LogViewer from '../components/LogViewer';

const { Content } = Layout;
const { Title } = Typography;

const LogsPage: React.FC = () => {
  // Define different log sources or categories that could be used
  const logCategories = [
    { key: 'system', name: 'System Logs' },
    { key: 'security', name: 'Security Logs' },
    { key: 'application', name: 'Application Logs' },
    { key: 'database', name: 'Database Logs' },
  ];
  
  // Menu for log categories
  const categoryMenu = (
    <Menu>
      {logCategories.map(category => (
        <Menu.Item key={category.key}>
          {category.name}
        </Menu.Item>
      ))}
    </Menu>
  );
  
  // Time period options
  const timePeriodMenu = (
    <Menu>
      <Menu.Item key="1h">Last hour</Menu.Item>
      <Menu.Item key="24h">Last 24 hours</Menu.Item>
      <Menu.Item key="7d">Last 7 days</Menu.Item>
      <Menu.Item key="30d">Last 30 days</Menu.Item>
      <Menu.Item key="custom">Custom range...</Menu.Item>
    </Menu>
  );

  return (
    <Layout className="site-layout" style={{ padding: '0 24px 24px', minHeight: '100vh' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Logs</Breadcrumb.Item>
      </Breadcrumb>
      
      <Content style={{ background: '#fff', padding: 24, margin: 0, borderRadius: 8 }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Title level={3} style={{ margin: 0 }}>
              <Space>
                <CloudServerOutlined />
                System Logs
              </Space>
            </Title>
            
            <Space size="middle">
              <Dropdown overlay={categoryMenu}>
                <Button>
                  Log Category <DownOutlined />
                </Button>
              </Dropdown>
              
              <Dropdown overlay={timePeriodMenu}>
                <Button>
                  <ClockCircleOutlined /> Time Period <DownOutlined />
                </Button>
              </Dropdown>
            </Space>
          </div>
          
          <Card style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Space size="large">
                <div>
                  <Typography.Text type="secondary">Total Logs</Typography.Text>
                  <Title level={4} style={{ margin: 0 }}>10,245</Title>
                </div>
                <div>
                  <Typography.Text type="secondary">Error Logs</Typography.Text>
                  <Title level={4} style={{ margin: 0, color: '#f5222d' }}>124</Title>
                </div>
                <div>
                  <Typography.Text type="secondary">Warning Logs</Typography.Text>
                  <Title level={4} style={{ margin: 0, color: '#faad14' }}>567</Title>
                </div>
              </Space>
              
              <Space>
                <Button type="primary" icon={<FilterOutlined />}>
                  Advanced Filters
                </Button>
              </Space>
            </div>
          </Card>
        </div>
        
        <LogViewer />
      </Content>
    </Layout>
  );
};

export default LogsPage;
