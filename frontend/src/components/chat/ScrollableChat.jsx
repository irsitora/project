import { Avatar, Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Scrollbar } from 'react-scrollbars-custom';
import {
  getSender,
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from '../../config/chatLogic';
import {t} from 'i18next';

function ScrollableChat({ fetchMessages }) {
  const { selectedChat, messages, isLoading } = useSelector(
    (state) => state.chat
  );
  const { user } = useSelector((state) => state.auth);
  const scrollContainerRef = useRef(null);

  // ! -------------------------------------------
  useEffect(() => {
    // ! Scroll to the bottom when messages change
    scrollContainerRef.current.scrollTop =
      scrollContainerRef.current.scrollHeight; 
  }, [messages]);
  // ! -------------------------------------------
  return (
    <Grid container height='100%'>
      <Grid
        item
        xs={12}
        sx={{
          boxShadow: '1',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          maxHeight: '3.5rem',
        }}
      >
        <Typography
          variant='h4'
          sx={{
            fontWeight: '700',
            color: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            p: '0.2em',
          }}
        >
          {selectedChat && getSender(user, selectedChat?.users)}
        </Typography>
      </Grid>

      {messages && !isLoading ? (
        <>
          <Box sx={{ width: '100%', height: '100%', p: '1em 1em', pb: '4em' }}>
            <Scrollbar
              style={{ width: '100%', height: '100%' }}
              ref={scrollContainerRef}
            >
              {messages &&
                messages?.map((m, i) => (
                  <div style={{ display: 'flex' }} key={m._id}>
                    {(isSameSender(messages, m, i, user?._id) ||
                      isLastMessage(messages, i, user?._id)) && (
                      <Avatar alt={m.sender.name} src={m.sender.photo} />
                    )}
                    <span
                      style={{
                        backgroundColor: `${
                          m.sender?._id === user?._id ? '#BEE3F8' : '#B9F5D0'
                        }`,
                        marginLeft: isSameSenderMargin(
                          messages,
                          m,
                          i,
                          user?._id
                        ),
                        marginTop: isSameUser(messages, m, i, user?._id)
                          ? 4
                          : 10,
                        marginRight: '10px',
                        borderRadius: '10px',
                        padding: '6px 14px',
                        maxWidth: '75%',
                        fontSize: '1.6rem',
                      }}
                    >
                      {m.content}
                    </span>
                  </div>
                ))}
              {/* When there is no messages */}
              {!isLoading && messages.length == 0 ? (
                <>
                  <Typography
                    variant='h5'
                    color='primary.main'
                    textAlign='center'
                    my='auto'
                  >
                    {t('chat.noMessages')}
                  </Typography>
                </>
              ) : (
                ''
              )}
            </Scrollbar>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ width: '100%', height: '100%', p: '1em 1em', pb: '4em' }}>
            <Scrollbar style={{ width: '100%', height: '100%' }}>
              {messages &&
                messages?.map((m, i) => (
                  <div style={{ display: 'flex' }} key={m._id}>
                    {(isSameSender(messages, m, i, user?._id) ||
                      isLastMessage(messages, i, user?._id)) && (
                      <Avatar alt={m.sender.name} src={m.sender.photo} />
                    )}
                    <span
                      style={{
                        backgroundColor: `${
                          m.sender?._id === user?._id ? '#BEE3F8' : '#B9F5D0'
                        }`,
                        marginLeft: isSameSenderMargin(
                          messages,
                          m,
                          i,
                          user?._id
                        ),
                        marginTop: isSameUser(messages, m, i, user?._id)
                          ? 4
                          : 10,
                        marginRight: '10px',
                        borderRadius: '10px',
                        padding: '6px 14px',
                        maxWidth: '75%',
                        fontSize: '1.6rem',
                      }}
                    >
                      {m.content}
                    </span>
                  </div>
                ))}
            </Scrollbar>
          </Box>
        </>
      )}
    </Grid>
  );
}

export default ScrollableChat;
