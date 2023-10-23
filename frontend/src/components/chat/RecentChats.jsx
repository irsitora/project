import { Avatar, Box, List, ListItem, Stack, Typography } from '@mui/material';
import { t } from 'i18next';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getImage, getSender } from '../../config/chatLogic';
import { setSelectedChat } from '../../redux/features/chat/chatSlice';

const styleText = {};

function RecentChats() {
  const { chats, isLoading } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSelectChat = async (e, chat) => {
    e.preventDefault();

    if (isLoading) {
      return;
    }
    await dispatch(setSelectedChat(chat));
  };

  // !-------------------------------------------------------
  if (!isLoading && !chats) {
    return (
      <Typography variant='h5' color='primary.main' textAlign='center' my='1em'>
        Chat is Empty
      </Typography>
    );
  }
  // !-------------------------------------------------------

  return (
    <Box>
      {chats || !isLoading ? (
        <>
          {
            <List>
              {chats?.map((chat, index) => (
                <ListItem
                  onClick={(e) => handleSelectChat(e, chat)}
                  key={chat._id}
                  sx={{
                    minHeight: '6rem',
                    bgcolor: 'third.light',
                    borderBottom: '1px solid',
                    borderColor: 'third.dark',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    gap: '1em',
                    cursor: 'pointer',
                  }}
                >
                  <Stack>
                    <Avatar src={getImage(user, chat.users)} alt='Img' />
                  </Stack>
                  <Stack>
                    <Typography
                      variant='h5'
                      color='primary.main'
                      fontWeight='700'
                    >
                      {getSender(user, chat.users)}
                    </Typography>
                    <Stack>
                      <Typography variant='body1' color='primary.dark'>
                        {chat?.latestMessage
                          ? (chat?.latestMessage?.content).substring(0, 30) +
                            '...'
                          : 'Chat is empty'}
                      </Typography>
                    </Stack>
                  </Stack>
                </ListItem>
              ))}
            </List>
          }
        </>
      ) : (
        <>
          <Typography variant='h5' color='primary.main' textAlign='center'>
            {t('chat.loadingText')}
          </Typography>
        </>
      )}
    </Box>
  );
}

export default RecentChats;
