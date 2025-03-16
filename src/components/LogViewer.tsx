
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Tag, 
  Input, 
  Card, 
  Select, 
  Space, 
  Button, 
  Typography, 
  Tooltip,
  Badge
} from 'antd';
import { 
  SearchOutlined, 
  ClearOutlined, 
  DownloadOutlined, 
  ReloadOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import '../styles/log-viewer.css';

const { Title, Text } = Typography;
const { Option } = Select;

// Log level definitions with colors
const LOG_LEVELS = {
  ERROR: { color: '#f5222d', text: 'Error', icon: <CloseCircleOutlined /> },
  WARNING: { color: '#faad14', text: 'Warning', icon: <WarningOutlined /> },
  INFO: { color: '#1890ff', text: 'Info', icon: <InfoCircleOutlined /> },
  DEBUG: { color: '#52c41a', text: 'Debug', icon: <CheckCircleOutlined /> },
};

// Sample log data - replace with your actual log data source
const SAMPLE_LOGS = [
  { id: '1', timestamp: '2023-05-15 10:23:45', level: 'ERROR', message: 'Failed to connect to database', source: 'Database', details: 'Connection timeout after 30s' },
  { id: '2', timestamp: '2023-05-15 10:24:12', level: 'WARNING', message: 'High memory usage detected', source: 'System', details: 'Memory usage at 85%' },
  { id: '3', timestamp: '2023-05-15 10:25:30', level: 'INFO', message: 'User authentication successful', source: 'Auth', details: 'User ID: 12345' },
  { id: '4', timestamp: '2023-05-15 10:26:15', level: 'DEBUG', message: 'API request completed', source: 'API', details: 'GET /api/users - 200 OK' },
  { id: '5', timestamp: '2023-05-15 10:27:05', level: 'ERROR', message: 'Failed to process payment', source: 'Payment', details: 'Invalid card information' },
  { id: '6', timestamp: '2023-05-15 10:28:22', level: 'INFO', message: 'New user registered', source: 'Auth', details: 'User ID: 12346' },
  { id: '7', timestamp: '2023-05-15 10:29:10', level: 'WARNING', message: 'Slow query execution', source: 'Database', details: 'Query took 5.2s to complete' },
  { id: '8', timestamp: '2023-05-15 10:30:45', level: 'DEBUG', message: 'Cache invalidated', source: 'Cache', details: 'Key: user_profile_12345' },
  { id: '9', timestamp: '2023-05-15 10:31:18', level: 'INFO', message: 'Background job completed', source: 'Jobs', details: 'Job ID: 5678' },
  { id: '10', timestamp: '2023-05-15 10:32:05', level: 'ERROR', message: 'File upload failed', source: 'Storage', details: 'Insufficient permissions' },
];

const LogViewer: React.FC = () => {
  const [logs, setLogs] = useState<any[]>(SAMPLE_LOGS);
  const [filteredLogs, setFilteredLogs] = useState<any[]>(SAMPLE_LOGS);
  const [searchText, setSearchText] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<string[]>([]);
  const [sourceFilter, setSourceFilter] = useState<string[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Get unique sources for filtering
  const sources = Array.from(new Set(logs.map(log => log.source)));

  // Handle search input
  const handleSearch = (value: string) => {
    setSearchText(value);
    applyFilters(value, levelFilter, sourceFilter);
  };

  // Handle level filter change
  const handleLevelFilterChange = (value: string[]) => {
    setLevelFilter(value);
    applyFilters(searchText, value, sourceFilter);
  };

  // Handle source filter change
  const handleSourceFilterChange = (value: string[]) => {
    setSourceFilter(value);
    applyFilters(searchText, levelFilter, value);
  };

  // Apply all filters
  const applyFilters = (search: string, levels: string[], sources: string[]) => {
    let filtered = [...logs];

    // Apply search filter
    if (search) {
      filtered = filtered.filter(log => 
        log.message.toLowerCase().includes(search.toLowerCase()) || 
        log.details.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply level filter
    if (levels.length > 0) {
      filtered = filtered.filter(log => levels.includes(log.level));
    }

    // Apply source filter
    if (sources.length > 0) {
      filtered = filtered.filter(log => sources.includes(log.source));
    }

    setFilteredLogs(filtered);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchText('');
    setLevelFilter([]);
    setSourceFilter([]);
    setFilteredLogs(logs);
  };

  // Simulate log refresh
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  // Download logs as JSON
  const handleDownload = () => {
    const dataStr = JSON.stringify(filteredLogs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'logs.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Table columns definition
  const columns = [
    {
      title: 'Time',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 180,
      render: (text: string) => (
        <Space>
          <ClockCircleOutlined style={{ color: '#8c8c8c' }} />
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      width: 120,
      render: (level: keyof typeof LOG_LEVELS) => (
        <Tag icon={LOG_LEVELS[level].icon} color={LOG_LEVELS[level].color}>
          {LOG_LEVELS[level].text}
        </Tag>
      ),
      filters: Object.keys(LOG_LEVELS).map(level => ({ text: LOG_LEVELS[level as keyof typeof LOG_LEVELS].text, value: level })),
      onFilter: (value: string, record: any) => record.level === value,
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      width: 120,
      render: (text: string) => <Badge status="processing" text={text} />,
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      render: (text: string, record: any) => (
        <Tooltip title="Click to view details">
          <div 
            className="log-message" 
            onClick={() => {
              if (expandedRowKeys.includes(record.id)) {
                setExpandedRowKeys(expandedRowKeys.filter(key => key !== record.id));
              } else {
                setExpandedRowKeys([...expandedRowKeys, record.id]);
              }
            }}
          >
            {text}
          </div>
        </Tooltip>
      ),
    },
  ];

  return (
    <Card 
      title={
        <div className="log-header">
          <Title level={4}>System Logs</Title>
          <Space>
            <Tooltip title="Refresh logs">
              <Button 
                icon={<ReloadOutlined />} 
                onClick={handleRefresh}
                loading={loading}
              />
            </Tooltip>
            <Tooltip title="Download logs">
              <Button 
                icon={<DownloadOutlined />} 
                onClick={handleDownload}
              />
            </Tooltip>
          </Space>
        </div>
      }
      className="log-viewer-card"
    >
      <div className="log-filters">
        <Space wrap size="middle">
          <Input
            placeholder="Search logs..."
            prefix={<SearchOutlined />}
            allowClear
            value={searchText}
            onChange={e => handleSearch(e.target.value)}
            style={{ width: 250 }}
          />
          
          <Select
            mode="multiple"
            placeholder="Filter by level"
            value={levelFilter}
            onChange={handleLevelFilterChange}
            style={{ minWidth: 180 }}
            allowClear
          >
            {Object.keys(LOG_LEVELS).map(level => (
              <Option key={level} value={level}>
                <Space>
                  {LOG_LEVELS[level as keyof typeof LOG_LEVELS].icon}
                  {LOG_LEVELS[level as keyof typeof LOG_LEVELS].text}
                </Space>
              </Option>
            ))}
          </Select>

          <Select
            mode="multiple"
            placeholder="Filter by source"
            value={sourceFilter}
            onChange={handleSourceFilterChange}
            style={{ minWidth: 180 }}
            allowClear
          >
            {sources.map(source => (
              <Option key={source} value={source}>{source}</Option>
            ))}
          </Select>

          <Button 
            icon={<ClearOutlined />} 
            onClick={handleClearFilters}
          >
            Clear Filters
          </Button>
        </Space>
      </div>

      <Table
        dataSource={filteredLogs}
        columns={columns}
        rowKey="id"
        expandable={{
          expandedRowKeys,
          expandRowByClick: true,
          onExpandedRowsChange: (expandedRows) => {
            setExpandedRowKeys(expandedRows as string[]);
          },
          expandedRowRender: (record) => <pre className="log-details">{record.details}</pre>,
        }}
        pagination={{ 
          defaultPageSize: 8,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} logs`,
          pageSizeOptions: ['5', '8', '15', '30']
        }}
        className="log-table"
        size="middle"
        loading={loading}
      />
      <div className="log-stats">
        <Text type="secondary">
          Showing {filteredLogs.length} of {logs.length} logs
          {levelFilter.length > 0 && ` • Level: ${levelFilter.join(', ')}`}
          {sourceFilter.length > 0 && ` • Source: ${sourceFilter.join(', ')}`}
          {searchText && ` • Search: "${searchText}"`}
        </Text>
      </div>
    </Card>
  );
};

export default LogViewer;
