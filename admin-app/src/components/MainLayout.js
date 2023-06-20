import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from 'react-icons/ai';
import { FaBloggerB } from 'react-icons/fa';
import { ImBlog } from 'react-icons/im';
import { SiBrandfolder } from 'react-icons/si';
import { TbCategory } from 'react-icons/tb';
import { FaClipboardList, FaBlog } from 'react-icons/fa';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div className="logo ">
          <h3 className="text-white fs-5 text-center py-3 mb-0">
            <span>Trendfy</span>
          </h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key === 'signout') {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: '1',
              icon: <MdOutlineDashboardCustomize className="fs-4" />,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <AiOutlineUser className="fs-4" />,
              label: 'Customers',
            },
            {
              key: 'catalog',
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: 'Catalog',
              children: [
                {
                  key: 'product',
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: 'Add Product',
                },
                {
                  key: 'product-list',
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: 'Product List',
                },
                {
                  key: 'brand',
                  icon: <SiBrandfolder className="fs-4" />,
                  label: 'Brand',
                },
                {
                  key: 'list-brand',
                  icon: <SiBrandfolder className="fs-4" />,
                  label: 'Brand List',
                },
                {
                  key: 'category',
                  icon: <TbCategory className="fs-4" />,
                  label: 'Category',
                },
                {
                  key: 'category-list',
                  icon: <TbCategory className="fs-4" />,
                  label: 'Category List',
                },
                {
                  key: 'color',
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: 'Color',
                },
                {
                  key: 'color-list',
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: 'Color List',
                },
              ],
            },
            {
              key: 'orders',
              icon: <FaClipboardList className="fs-4" />,
              label: 'Orders',
            },
            {
              key: 'blogs',
              icon: <FaBloggerB className="fs-4" />,
              label: 'Blogs',
              children: [
                {
                  key: 'blog',
                  icon: <ImBlog className="fs-4" />,
                  label: 'Add Blog',
                },
                {
                  key: 'blog-list',
                  icon: <FaBloggerB className="fs-4" />,
                  label: 'Blog List',
                },
                {
                  key: 'blog-category',
                  icon: <ImBlog className="fs-4" />,
                  label: 'Add Blog-Category',
                },
                {
                  key: 'blog-category-list',
                  icon: <FaBlog className="fs-4" />,
                  label: 'Add Blog-Category List',
                },
              ],
            },
            {
              key: 'enquiries',
              icon: <FaClipboardList className="fs-4" />,
              label: 'Enquiries',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex align-items-center gap-3">User</div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
