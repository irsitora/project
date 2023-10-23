import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, sendMessage } from '../../redux/features/chat/chatSlice';
import ScrollableChat from './ScrollableChat';
import { useTranslation } from 'react-i18next';
function ChatBox() {
  const { selectedChat } = useSelector((state) => state.chat);
  const [newMessage, setNewMessage] = useState('');
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  // ! -------------------------
  const handleSendMessage = async (e) => {
    const userData = {
      content: newMessage,
      chatId: selectedChat?._id,
    };
    if (e.key === 'Enter' && newMessage) {
      setNewMessage('');
      await dispatch(sendMessage(userData));
    }
  };

  // ! -------------------------
  useEffect(() => {
    if (selectedChat) {
      try {
        const userData = {
          chatId: selectedChat?._id,
        };
        dispatch(getMessages(userData));
      } catch (error) {
        console.log(error);
      }
    }
  }, [dispatch, selectedChat]);

  return (
    <>
      {selectedChat ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <ScrollableChat />
          <TextField
            label={t('chat.newMessage')}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleSendMessage}
            InputProps={{
              endAdornment: (
                <InputAdornment position='start'>
                  <IconButton
                    onClick={handleSendMessage}
                    disabled={!newMessage}
                  >
                    <SendIcon sx={{ color: 'green' }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant='outlined'
          />
        </Box>
      ) : (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='100%'
        >
          <Typography variant='h4' color='fourth.dark'>
            {t('chat.selectChat')}
          </Typography>
        </Box>
      )}
    </>
  );
}

export default ChatBox;
