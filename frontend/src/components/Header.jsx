import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material';
import i18next from 'i18next';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppleLogo from '../../../frontend/src/assets/logo/apple-white.png';
import Sidebar from '../components/sidebar/Sidebar';
import i18n from '../language/i18n';
import { RESET, logout } from '../redux/features/auth/authSlice';
import './Header.css';
import { CustomButtonLanguage } from './customUtils/customButtons/CustomButtonOne';

// ! ----------------------------------------
const Header = () => {
  // ! Get the currently selected language --
  const currentLanguage = i18next.language;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userRole = user?.role;
  const capitalizedUserRole = userRole ? userRole.toUpperCase() : '';
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // ! --------------------------------------
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
    handleClose();
    window.location.reload();
  };
  // ! --- Drawer --------------------------
  const handleOpen = () => {
    setOpen(true);
  };

  // ! ---- Logout function -----------------
  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box>
        <Sidebar open={open} setOpen={setOpen} />
      </Box>
      <AppBar position='relative'>
        <Toolbar sx={{ bgcolor: 'primary.dark' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
              }}
            >
              <IconButton
                onClick={handleOpen}
                size='large'
                edge='start'
                color='inherit'
                aria-label='menu'
                sx={{ mr: 1 }}
              >
                <MenuIcon sx={{ color: '#fff', fontSize: '1.8em' }} />
              </IconButton>
              <img src={AppleLogo} alt='logo' className='app-header-logo' />
              <Badge badgeContent={2} color='success'>
                <NotificationsIcon
                  sx={{ color: '#fff', fontSize: '2.2em', ml: '0.4em' }}
                />
              </Badge>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomButtonLanguage
                onClick={handleClick}
                variant='contained'
                label={selectedLanguage === 'ru' ? 'RU' : 'EN'}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{ padding: '2px 4px' }}
              >
                <MenuItem onClick={() => handleLanguageSelect('ru')}>
                  RU
                </MenuItem>
                <MenuItem onClick={() => handleLanguageSelect('en')}>
                  EN
                </MenuItem>
              </Menu>

              <IconButton onClick={() => logoutUser()}>
                <LogoutIcon
                  fontSize='large'
                  sx={{ color: 'form.main', fontSize: '2.4rem' }}
                />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
