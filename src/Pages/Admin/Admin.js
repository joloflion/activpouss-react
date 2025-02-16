import React from 'react';
import { HomeOutlined, ProductFilled, ToolFilled, ToolOutlined, VideoCameraFilled } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import logo from '../../assests/logo.png';
import { useAuth } from '../../contexts/AuthContext';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ProductManagement from './ProductManagement';
import CategoryManagement from './CategoryManagement';
import VideoManagement from './VideoManagement';

const { Header, Content, Sider } = Layout;

const items1 = [
  {
    key: 'home',
    label: 'Acceuil',
    icon: HomeOutlined,
    path: '/',
  },
].map((menu) => ({
  key: menu.key,
  label: <Link to={menu.path}>{menu.label}</Link>, // Add Link for navigation
}));

const items2 = [
  {
    key: 'product',
    label: 'Produits',
    icon: ProductFilled,
    path: '/admin?page=products',
  },
  {
    key: 'category',
    label: 'Catégories',
    icon: ToolOutlined,
    path: '/admin?page=categories',
  },
  {
    key: 'videos',
    label: 'Videos',
    icon:VideoCameraFilled,
    path: '/admin?page=videos',
  }
].map((menu) => {
  return {
    key: menu.key,
    icon: React.createElement(menu.icon),
    label: <Link to={menu.path}>{menu.label}</Link>, // Add Link for navigation
  };
});

export const Admin = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div className="demo-logo">
          <img width={42} src={logo} alt="Logo" />
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items1}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />

        <button className="btn btn-outline-danger" onClick={logout}>
          Se déconnecter
        </button>
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['product']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Content
            style={{
              padding: 10,
              margin: 0,
              marginTop: 20,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {location.search === ('?page=products') && <ProductManagement />}
            {location.search === ('?page=categories') &&  <CategoryManagement />}
            {location.search === ('?page=videos') &&  <VideoManagement />}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
