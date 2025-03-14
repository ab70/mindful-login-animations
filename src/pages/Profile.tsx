
import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Avatar, 
  Divider, 
  notification, 
  Tabs, 
  Switch, 
  List,
  Badge
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  LockOutlined, 
  EditOutlined, 
  SaveOutlined,
  BellOutlined,
  SafetyOutlined,
  TeamOutlined,
  HistoryOutlined,
  LogoutOutlined,
  CheckCircleFilled,
  SafetyCertificateFilled
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import LoginBackground from '../components/LoginBackground';
import useLoginAnimation from '../hooks/useLoginAnimation';
import '../styles/login.css';

const { TabPane } = Tabs;

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const { isVisible: contentVisible } = useLoginAnimation({ delay: 300 });
  
  const [glassActive, setGlassActive] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setGlassActive(true);
    }, 500);
  }, []);
  
  const handleSaveProfile = async (values) => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      notification.success({
        message: 'Profile Updated',
        description: 'Your profile information has been saved successfully',
      });
      
      setEditMode(false);
    } catch (error) {
      console.error('Profile update error:', error);
      
      notification.error({
        message: 'Update Failed',
        description: 'An error occurred while updating your profile',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = () => {
    notification.info({
      message: 'Logged Out',
      description: 'You have been successfully logged out',
    });
    
    navigate('/');
  };
  
  // Mock user data
  const userData = {
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Administrator',
    lastLogin: '2023-04-15 09:23 AM',
    memberSince: 'January 10, 2022',
    twoFactorEnabled: true
  };
  
  // Mock activity data
  const activityData = [
    { action: 'Login', time: '2023-04-15 09:23 AM', ip: '192.168.1.1' },
    { action: 'Password Changed', time: '2023-04-01 14:45 PM', ip: '192.168.1.1' },
    { action: 'Login', time: '2023-03-28 10:15 AM', ip: '192.168.1.1' },
    { action: 'Profile Updated', time: '2023-03-15 16:30 PM', ip: '192.168.1.1' },
  ];
  
  // Security settings
  const securitySettings = [
    { name: 'Two-Factor Authentication', value: userData.twoFactorEnabled },
    { name: 'Login Notifications', value: true },
    { name: 'Sensitive Actions Require Password', value: true },
    { name: 'Remember This Device', value: false },
  ];
  
  return (
    <div className="login-page">
      <div className="login-background" style={{ position: 'fixed' }}>
        <LoginBackground />
      </div>
      
      <div className="profile-container">
        <div className={`profile-card ${glassActive ? 'glass-active' : ''} ${contentVisible ? 'visible' : ''}`}>
          <div className="profile-header">
            <div className="profile-avatar-section">
              <Badge count={<CheckCircleFilled style={{ color: '#52bfcb' }} />} offset={[-5, 5]}>
                <Avatar 
                  size={80} 
                  icon={<UserOutlined />} 
                  style={{ 
                    backgroundColor: '#52bfcb',
                    boxShadow: '0 4px 15px rgba(82, 191, 203, 0.3)'
                  }} 
                />
              </Badge>
              <div className="profile-info">
                <h2>{userData.name}</h2>
                <p>{userData.role}</p>
                <div className="profile-badges">
                  <span className="profile-badge">
                    <SafetyCertificateFilled /> Verified
                  </span>
                  <span className="profile-badge">
                    <TeamOutlined /> Team Member
                  </span>
                </div>
              </div>
            </div>
            <Button 
              icon={<LogoutOutlined />} 
              onClick={handleLogout}
              danger
              className="logout-button"
            >
              Logout
            </Button>
          </div>
          
          <Tabs defaultActiveKey="profile" className="profile-tabs">
            <TabPane 
              tab={
                <span>
                  <UserOutlined />
                  Profile
                </span>
              } 
              key="profile"
            >
              <div className="profile-form-container">
                <div className="profile-actions">
                  <Button 
                    type={editMode ? "primary" : "default"} 
                    icon={editMode ? <SaveOutlined /> : <EditOutlined />}
                    onClick={() => editMode ? null : setEditMode(true)}
                    htmlType={editMode ? "submit" : "button"}
                    form={editMode ? "profile-form" : undefined}
                    loading={loading}
                  >
                    {editMode ? "Save Changes" : "Edit Profile"}
                  </Button>
                </div>
                
                <Form
                  id="profile-form"
                  layout="vertical"
                  initialValues={userData}
                  onFinish={handleSaveProfile}
                >
                  <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                  >
                    <Input 
                      prefix={<UserOutlined />} 
                      disabled={!editMode} 
                      className="glass-input"
                    />
                  </Form.Item>
                  
                  <Form.Item
                    name="email"
                    label="Email Address"
                    rules={[
                      { required: true, message: 'Please input your email!' },
                      { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                  >
                    <Input 
                      prefix={<MailOutlined />} 
                      disabled={!editMode} 
                      className="glass-input"
                    />
                  </Form.Item>
                  
                  <Divider />
                  
                  <div className="profile-info-section">
                    <div className="info-item">
                      <span className="info-label">Member Since</span>
                      <span className="info-value">{userData.memberSince}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Last Login</span>
                      <span className="info-value">{userData.lastLogin}</span>
                    </div>
                  </div>
                </Form>
              </div>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <SafetyOutlined />
                  Security
                </span>
              } 
              key="security"
            >
              <div className="security-container">
                <Button 
                  type="primary" 
                  icon={<LockOutlined />}
                  className="change-password-button"
                  onClick={() => navigate('/password-recovery')}
                >
                  Change Password
                </Button>
                
                <Divider>Security Settings</Divider>
                
                <List
                  itemLayout="horizontal"
                  dataSource={securitySettings}
                  renderItem={item => (
                    <List.Item
                      actions={[
                        <Switch defaultChecked={item.value} />
                      ]}
                    >
                      <List.Item.Meta
                        title={item.name}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <HistoryOutlined />
                  Activity
                </span>
              } 
              key="activity"
            >
              <div className="activity-container">
                <List
                  itemLayout="horizontal"
                  dataSource={activityData}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={item.action}
                        description={
                          <div className="activity-details">
                            <span>{item.time}</span>
                            <span>IP: {item.ip}</span>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </div>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <BellOutlined />
                  Notifications
                </span>
              } 
              key="notifications"
            >
              <div className="notifications-container">
                <div className="notification-group">
                  <h3>Email Notifications</h3>
                  <List
                    itemLayout="horizontal"
                    dataSource={[
                      { name: 'Security Alerts', value: true },
                      { name: 'Login Attempts', value: true },
                      { name: 'Product Updates', value: false },
                      { name: 'Newsletter', value: false },
                    ]}
                    renderItem={item => (
                      <List.Item
                        actions={[
                          <Switch defaultChecked={item.value} />
                        ]}
                      >
                        <List.Item.Meta
                          title={item.name}
                        />
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;

