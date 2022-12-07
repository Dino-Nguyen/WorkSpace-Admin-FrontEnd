import React from 'react';
import './SideBar.module.scss';
import { Drawer } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import classes from './SideBar.module.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PagesIcon from '@mui/icons-material/Pages';
import AppsIcon from '@mui/icons-material/Apps';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import BadgeIcon from '@mui/icons-material/Badge';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import DescriptionIcon from '@mui/icons-material/Description';

export default function Sidebar({ sideBarVisibility, toggleSideBar }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  return (
    <>
      <Drawer
        open={sideBarVisibility}
        variant="persistent"
        anchor="left"
        onClick={toggleSideBar}
        sx={{
          width: '250px',
          '& .MuiDrawer-paper': {
            width: '250px',
            height: '95%',
            boxSizing: 'border-box',
            border: 'none',
            background: 'linear-gradient(180deg, #3E3D45 0%, #202020 100%)',
            borderRadius: '12px',
            margin: '10px 0 0 20px',
          },
        }}>
        <div className={classes['logo-container']}>
          <button
            onClick={() => {
              navigate('/home');
            }}>
            <img alt="logo" src="/1.webp" width={50} height={50} />
          </button>
          <span>My Workspace</span>
        </div>
        <div className={classes['user-info']}>
          <Avatar
            sx={{
              bgcolor: '#FF5722',
              width: '40px',
              height: '40px',
              fontSize: '1.25rem',
            }}>
            {user.username[0].toUpperCase()}
          </Avatar>
          <p>{user.username}</p>
        </div>
        <div className={classes['home']}>
          <NavLink>
            <DashboardIcon />
            <span>Dashboard</span>
          </NavLink>
          <NavLink>
            <AnalyticsIcon />
            <span>Analytics</span>
          </NavLink>
          <NavLink>
            <MonetizationOnIcon />
            <span>Smart Home</span>
          </NavLink>
        </div>
        <div className={classes['pages']}>
          <h4>PAGES</h4>
          <NavLink>
            <PagesIcon />
            <span>Pages</span>
          </NavLink>
          <NavLink>
            <AppsIcon />
            <span>Applications</span>
          </NavLink>
          <NavLink>
            <ShoppingBasketIcon />
            <span>E-commerce</span>
          </NavLink>
          <NavLink>
            <BadgeIcon />
            <span>Authentication</span>
          </NavLink>
        </div>
        <div className={classes['docs']}>
          <h4>DOCS</h4>
          <NavLink>
            <AssignmentIcon />
            <span>Basic</span>
          </NavLink>
          <NavLink>
            <ViewInArIcon />
            <span>Components</span>
          </NavLink>
          <NavLink>
            <DescriptionIcon />
            <span>Changelog</span>
          </NavLink>
        </div>
      </Drawer>
    </>
  );
}
