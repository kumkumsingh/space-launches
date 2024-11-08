import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Menu, Layout } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

import './Header.css'; 

const { Header } = Layout;

const AppHeader = () => {
    const location = useLocation();
    
    const selectedKey = useMemo(() => 
        location.pathname === '/' ? 'home' : location.pathname.slice(1), 
        [location.pathname]
    );
    
    // Define the menu items
    const items = useMemo(() => {
        return [
        {
            key: 'home',
            label: <Link to="/">Home</Link>,
        },
        {
            key: 'favorites',
            label: (
                <Link to="/favorites">
                    <HeartOutlined />
                    <span>Favorites</span>
                </Link>
            ),
        },
    ]}, []);

    return (
        <Header className="header">
            <Link to="/">
                <h1 className="title">Space Launches</h1>
            </Link>
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[selectedKey]} 
                className="menu"
                items={items} 
            />
        </Header>
    );
};

export default AppHeader;
