
import React, { useState } from 'react';
import { 
  Layout, 
  Space, 
  Card,
  Button,
  Menu,
  Dropdown,
  Typography,
  Row,
  Col,
  Statistic,
  Breadcrumb,
  Tag,
  Tooltip,
  Avatar,
  Divider,
  Badge
} from 'antd';
import { 
  ClockCircleOutlined, 
  CloudServerOutlined, 
  DownOutlined,
  FilterOutlined,
  DashboardOutlined,
  UserOutlined,
  LockOutlined,
  KeyOutlined,
  ShieldOutlined,
  SettingOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  LogoutOutlined,
  TeamOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  SafetyOutlined
} from '@ant-design/icons';
import LogViewer from '../components/LogViewer';
import '../styles/log-viewer.css';

const { Content, Header, Sider } = Layout;
const { Title, Text } = Typography;

const LogsPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  
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

  // User dropdown menu
  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>Profile</Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>Settings</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />}>Log out</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        width={240} 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        style={{ 
          background: 'linear-gradient(180deg, #052e4e 0%, #073e69 100%)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
        }}
      >
        <div style={{ 
          padding: collapsed ? '16px 0' : '16px 24px', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          color: 'white',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          marginBottom: 16
        }}>
          <ShieldOutlined style={{ fontSize: 24, marginRight: collapsed ? 0 : 12 }} />
          {!collapsed && <Typography.Title level={4} style={{ color: 'white', margin: 0 }}>SecureID</Typography.Title>}
        </div>
        
        <Menu
          theme="dark"
          defaultSelectedKeys={['logs']}
          mode="inline"
          style={{ background: 'transparent', borderRight: 0 }}
        >
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="users" icon={<TeamOutlined />}>
            Users & Groups
          </Menu.Item>
          <Menu.Item key="applications" icon={<AppstoreOutlined />}>
            Applications
          </Menu.Item>
          <Menu.Item key="policies" icon={<SafetyOutlined />}>
            Policies
          </Menu.Item>
          <Menu.Item key="access" icon={<KeyOutlined />}>
            Access Control
          </Menu.Item>
          <Menu.Item key="logs" icon={<CloudServerOutlined />}>
            Audit Logs
          </Menu.Item>
          <Menu.Item key="reports" icon={<BarChartOutlined />}>
            Reports & Analytics
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
        </Menu>
      </Sider>
      
      <Layout className="site-layout">
        <Header style={{ 
          padding: '0 24px', 
          background: '#fff',
          boxShadow: '0 1px 4px rgba(0,21,41,.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Title level={4} style={{ margin: 0 }}>Audit Logs</Title>
          </div>
          
          <Space size={24}>
            <Button type="text" icon={<SearchOutlined />} />
            <Badge count={5} size="small">
              <Button type="text" icon={<BellOutlined />} />
            </Badge>
            <Tooltip title="Help">
              <Button type="text" icon={<QuestionCircleOutlined />} />
            </Tooltip>
            <Dropdown overlay={userMenu} trigger={['click']}>
              <Space className="user-dropdown" style={{ cursor: 'pointer' }}>
                <Avatar style={{ backgroundColor: '#52bfcb' }} icon={<UserOutlined />} />
                <span style={{ display: 'inline-block' }}>Admin User</span>
                <DownOutlined style={{ fontSize: 12 }} />
              </Space>
            </Dropdown>
          </Space>
        </Header>
        
        <Content style={{ margin: '16px 16px 0', display: 'flex', flexDirection: 'column' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Audit & Compliance</Breadcrumb.Item>
            <Breadcrumb.Item>Logs</Breadcrumb.Item>
          </Breadcrumb>
          
          <div style={{ marginBottom: 24 }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic 
                    title="Total Logs" 
                    value={10245} 
                    prefix={<CloudServerOutlined />} 
                    valueStyle={{ color: '#52bfcb' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic 
                    title="Error Logs" 
                    value={124}
                    prefix={<div style={{ color: '#f5222d', marginRight: 8 }}>●</div>} 
                    valueStyle={{ color: '#f5222d' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic 
                    title="Warning Logs" 
                    value={567} 
                    prefix={<div style={{ color: '#faad14', marginRight: 8 }}>●</div>}
                    valueStyle={{ color: '#faad14' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic 
                    title="Security Events" 
                    value={42} 
                    prefix={<ShieldOutlined />}
                    valueStyle={{ color: '#52bfcb' }}
                  />
                </Card>
              </Col>
            </Row>
          </div>
          
          <Card 
            className="log-viewer-card"
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Space>
                  <CloudServerOutlined />
                  <span>System Logs</span>
                </Space>
                <Space>
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
                  
                  <Button type="primary" icon={<FilterOutlined />}>
                    Advanced Filters
                  </Button>
                </Space>
              </div>
            }
            bodyStyle={{ padding: 0 }}
          >
            <LogViewer />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LogsPage;
