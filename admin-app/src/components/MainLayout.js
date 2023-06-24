import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import {
  MdOutlineDashboardCustomize,
  MdNotificationsActive,
} from 'react-icons/md';
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
  AiFillFileAdd,
} from 'react-icons/ai';
import { FaBloggerB } from 'react-icons/fa';
import { ImBlog } from 'react-icons/im';
import { BiCartAdd } from 'react-icons/bi';
import { SiBrandfolder } from 'react-icons/si';
import { TbCategory } from 'react-icons/tb';
import { FaClipboardList, FaBlog } from 'react-icons/fa';
import { RiCoupon4Line, RiCoupon5Line } from 'react-icons/ri';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { Header, Sider, Content } = Layout;
  const navigate = useNavigate();
  return (
    <Layout /*onContextMenu={(e) => e.preventDefault()}*/>
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
              key: '',
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
                  icon: <BiCartAdd className="fs-4" />,
                  label: 'Add Product',
                },
                {
                  key: 'list-product',
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
                  key: 'list-category',
                  icon: <TbCategory className="fs-4" />,
                  label: 'Category List',
                },
                {
                  key: 'color',
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: 'Color',
                },
                {
                  key: 'list-color',
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
              key: 'marketing',
              icon: <RiCoupon5Line className="fs-4" />,
              label: 'Marketing',
              children: [
                {
                  key: 'Coupon',
                  icon: <AiFillFileAdd className="fs-4" />,
                  label: 'Add Coupon',
                },
                {
                  key: 'coupon-list',
                  icon: <RiCoupon4Line className="fs-4" />,
                  label: 'Coupon List',
                },
              ],
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
                  label: 'Blog-Category List',
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
          <div className="d-flex align-items-center gap-4">
            <div className="position-relative">
              <MdNotificationsActive className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                2
              </span>
            </div>
            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img
                  width={32}
                  height={32}
                  src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png"
                  alt="user"
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">Rahul</h5>
                <p className="mb-0">rahulvinod135@gmail.com</p>
              </div>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item"
                    to="/admin"
                    style={{
                      lineHeight: '20px',
                      height: 'auto',
                      textDecoration: 'none',
                    }}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-0"
                    style={{
                      lineHeight: '20px',
                      height: 'auto',
                      textDecoration: 'none',
                    }}
                    to="/reset-password"
                  >
                    Change Password
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-0"
                    style={{
                      lineHeight: '20px',
                      height: 'auto',
                      textDecoration: 'none',
                    }}
                    to="/admin"
                  >
                    Signout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
