import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import GroupIcon from '@mui/icons-material/Group';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Groups2Icon from '@mui/icons-material/Groups2';
import LockResetIcon from '@mui/icons-material/LockReset';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
import UpdateIcon from '@mui/icons-material/Update';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BsFillChatRightQuoteFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// ! ----------------------------------------
const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  // ! --- checking for user Role to show content
  const { t, i18n } = useTranslation();
  const isAdmin = user?.role === 'admin';
  const isPatient = user?.role === 'patient';
  const isDoctor = user?.role === 'doctor';

  // ! --- itemList ------------------------
  let itemsList;
  if (isAdmin) {
    itemsList = [
      [
        {
          text: `${t('sidebarAdmin.profile')}`,

          icon: (
            <ManageAccountsIcon
              fontSize='large'
              sx={{ color: 'primary.light' }}
            />
          ),
          onClick: () => {
            navigate('/profile'), setOpen(false);
          },
        },
        {
          text: `${t('sidebarAdmin.changePassword')}`,
          icon: (
            <LockResetIcon fontSize='large' sx={{ color: 'primary.light' }} />
          ),
          onClick: () => {
            navigate('/changePassword'), setOpen(false);
          },
        },
        {
          text: `${t('sidebarAdmin.users')}`,
          icon: <GroupIcon fontSize='large' sx={{ color: 'primary.light' }} />,
          onClick: () => {
            navigate('/users'), setOpen(false);
          },
        },
      ],
      [
        {
          text: `${t('sidebarAdmin.addDoctor')}`,
          icon: (
            <GroupAddIcon fontSize='large' sx={{ color: 'primary.light' }} />
          ),
          onClick: () => {
            navigate('/admin/addDoctor'), setOpen(false);
          },
        },
        {
          text: `${t('sidebarAdmin.doctors')}`,
          icon: (
            <Diversity1Icon fontSize='large' sx={{ color: 'primary.light' }} />
          ),
          onClick: () => {
            navigate('/admin/doctors'), setOpen(false);
          },
        },
      ],
    ];
  } else if (isDoctor) {
    itemsList = [
      [
        {
          text: `${t('sidebarDoctor.profile')}`,
          icon: (
            <ManageAccountsIcon
              fontSize='large'
              sx={{ color: 'primary.light' }}
            />
          ),
          onClick: () => {
            navigate('/profile'), setOpen(false);
          },
        },
        {
          text: `${t('sidebarDoctor.changePassword')}`,
          icon: (
            <LockResetIcon fontSize='large' sx={{ color: 'primary.light' }} />
          ),
          onClick: () => {
            navigate('/changePassword'), setOpen(false);
          },
        },
      ],
      [
        {
          text: `${t('sidebarDoctor.appointments')}`,
          icon: (
            <LockResetIcon fontSize='large' sx={{ color: 'primary.light' }} />
          ),
          onClick: () => {
            navigate('/doctor/appointments'), setOpen(false);
          },
        },
      ],
      [
        {
          text: `${t('sidebarDoctor.chatRoom')}`,
          icon: (
            <BsFillChatRightQuoteFill
              fontSize={26}
              sx={{ color: 'primary.light' }}
              color='#dcd7ff'
            />
          ),
          onClick: () => {
            navigate('/pac/chat'), setOpen(false);
          },
        },
      ],
    ];
  } else if (isPatient) {
    itemsList = [
      [
        {
          text: `${t('sidebarPatient.profile')}`,
          icon: (
            <ManageAccountsIcon
              fontSize='large'
              sx={{ color: 'primary.light' }}
            />
          ),
          onClick: () => {
            navigate('/profile'), setOpen(false);
          },
        },
        {
          text: `${t('sidebarPatient.changePassword')}`,
          icon: (
            <LockResetIcon fontSize='large' sx={{ color: 'primary.light' }} />
          ),
          onClick: () => {
            navigate('/changePassword'), setOpen(false);
          },
        },
      ],
      [
        {
          text: `${t('sidebarPatient.doctors')}`,
          icon: (
            <Groups2Icon fontSize='large' sx={{ color: 'primary.light' }} />
          ),
          onClick: () => {
            navigate('/patient/allDoctors'), setOpen(false);
          },
        },
        {
          text: `${t('sidebarPatient.history')}`,
          icon: <UpdateIcon fontSize='large' sx={{ color: 'primary.light' }} />,
          onClick: () => {
            navigate('/patient/historyApp'), setOpen(false);
          },
        },
      ],
      [
        {
          text: `${t('sidebarPatient.chatRoom')}`,
          icon: (
            <BsFillChatRightQuoteFill
              fontSize={24}
              sx={{ color: 'primary.light' }}
              color='#dcd7ff'
            />
          ),
          onClick: () => {
            navigate('/doc/chat'), setOpen(false);
          },
        },
      ],
    ];
  } else {
    itemsList = [];
  }

  // ! --- Drawer --------------------------

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Drawer anchor='left' open={open} onClose={handleClose}>
        <Box
          sx={{
            height: '16%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <Avatar
            alt='userPhoto'
            src={user?.photo}
            sx={{ width: 70, height: 70 }}
          />
          <Box sx={{ width: '30%', textAlign: 'center' }}>
            <Typography
              variant='h6'
              sx={{ color: 'form.main', fontWeight: '700', p: '0.2em' }}
            >
              {user?.name}
            </Typography>
            <Typography
              variant='h6'
              sx={{
                color: 'third.dark',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isAdmin ? <AdminPanelSettingsIcon fontSize='large' /> : ''}
              {isDoctor ? <AssignmentIndIcon fontSize='large' /> : ''}
              {isPatient ? <PersonIcon fontSize='large' /> : ''}
              {user?.role}
            </Typography>
          </Box>
        </Box>
        <div style={{ width: 350 }}>
          <List>
            {itemsList[0]?.map((item, index) => {
              const { text, icon, onClick } = item;
              return (
                <ListItem key={text} onClick={onClick}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              );
            })}
          </List>
          <Divider sx={{ bgcolor: 'primary.main' }} />
          <List>
            {itemsList[1]?.map((item, index) => {
              const { text, icon, onClick } = item;
              return (
                <ListItem key={text} onClick={onClick}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              );
            })}
            {itemsList[2]?.map((item, index) => {
              const { text, icon, onClick } = item;
              return (
                <ListItem key={text} onClick={onClick}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              );
            })}
          </List>
        </div>
      </Drawer>
    </Box>
  );
};
export default Sidebar;
