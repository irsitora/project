import { Player } from '@lottiefiles/react-lottie-player';
import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ChatAnimation from '../../animations/ChatAnimation.json';
import ChatBox from '../../components/chat/ChatBox';
import MyChats from '../../components/chat/MyChats';
import FormWrapper from '../../components/formWrapper/FormWrapper';
import { getChats } from '../../redux/features/chat/chatSlice';

const gridStyle = {
  minHeight: '65vh',
  borderRadius: '10px',
  boxShadow: '4',
};

function Chat() {
  const dispatch = useDispatch();

  // ! ------------------------
  useEffect(() => {
    dispatch(getChats());
  }, []);

  return (
    <FormWrapper>
      <Grid container display='flex' justifyContent='space-between'>
        <Grid item xs={12}>
          <Player
            autoplay
            loop
            src={ChatAnimation}
            style={{ height: '100px' }}
          />
        </Grid>
        <Grid item xs={12} md={2.8} sx={gridStyle}>
          <MyChats />
        </Grid>
        <Grid item xs={12} md={9} sx={gridStyle} b>
          <ChatBox />
        </Grid>
      </Grid>
    </FormWrapper>
  );
}

export default Chat;
