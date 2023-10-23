import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, List, ListItem, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  accessChat,
  getChats,
  searchDoctor,
} from '../../redux/features/chat/chatSlice';

function SearchDrawer() {
  const dispatch = useDispatch();
  const { doctors, isLoading } = useSelector((state) => state.chat);
  const [search, setSearch] = useState('');

  let searchData = {
    search,
  };

  // ! HandleSearch --------------------
  const handleSearch = async (e) => {
    e.preventDefault();
    await dispatch(searchDoctor(searchData));
  };
  // ! Handle Access/Create Chat -------
  const handleAccess = async (chatId) => {
    const userData = {
      userId: chatId,
    };
    await dispatch(accessChat(userData));
    await dispatch(getChats());
    setSearch('');
  };
  // ! ----------------------------------
  useEffect(() => {
    dispatch(searchDoctor(searchData));
  }, [dispatch, search]);

  // ! ----------------------------------
  return (
    <>
      <form onSubmit={handleSearch}>
        <TextField
          label={`${t('chat.searchUser')}`}
          variant='filled'
          aria-haspopup='true'
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <Button
                type='submit'
                variant='contained'
                id='basic-button'
                aria-haspopup='true'
                onClick={handleSearch}
              >
                <SearchIcon />
              </Button>
            ),
          }}
        />
      </form>
      {/*  When search result is not empty */}
      {search && doctors?.length > 0 && !isLoading ? (
        <>
          <List
            sx={{
              bgcolor: 'primary.main',
              position: 'relative',
            }}
          >
            {doctors?.map((doctor) => (
              <ListItem
                key={doctor._id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Stack>
                  <Typography variant='h5' color='form.main' fontWeight='700'>
                    {doctor.name}
                  </Typography>
                  <Typography variant='body1' color='third.main'>
                    {doctor.specialist}
                  </Typography>
                  <Typography variant='body1' color='third.main'>
                    {doctor.email}
                  </Typography>
                </Stack>
                <IconButton onClick={() => handleAccess(doctor.userId)}>
                  <ArrowForwardIosIcon
                    fontSize='24px'
                    sx={{ color: 'form.main' }}
                  />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        ''
      )}
      {/* When search result is empty */}
      {!search && doctors?.length === 0 && !isLoading ? (
        <>
          <List
            sx={{
              bgcolor: 'primary.main',
            }}
          >
            <ListItem>
              <Stack>
                <Typography variant='h5' color='form.main'>
                  {t('chat.notFound')}
                </Typography>
              </Stack>
            </ListItem>
          </List>
        </>
      ) : (
        ''
      )}
    </>
  );
}

export default SearchDrawer;
