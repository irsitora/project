import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import chatServices from './chatServices';

const initialState = {
  isLoading: false,
  message: '',
  selectedChat: null,
  doctors: [],
  chats: [],
  messages: [],
  newMessage: '',
  notification: [],
};

// ! Search Doctors ---------------
export const searchDoctor = createAsyncThunk(
  '/searchDoctor',
  async (userData, thunkAPI) => {
    try {
      return await chatServices.searchDoctor(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        response.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// ! Get Chats ---------------
export const getChats = createAsyncThunk('/getChats', async (_, thunkAPI) => {
  try {
    return await chatServices.getChats();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString() ||
      response.message;
    return thunkAPI.rejectWithValue(message);
  }
});
// ! Access/Create Chat ------------
export const accessChat = createAsyncThunk(
  '/accessChat',
  async (userData, thunkAPI) => {
    try {
      return await chatServices.accessChat(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        response.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// ! Get Messages ---------------
export const getMessages = createAsyncThunk(
  '/getMessages',
  async (userData, thunkAPI) => {
    try {
      return await chatServices.getMessages(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        response.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// ! Send Message ---------------
export const sendMessage = createAsyncThunk(
  '/sendMessage',
  async (userData, thunkAPI) => {
    try {
      return await chatServices.sendMessage(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        response.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ! Search Doctor -----------
      .addCase(searchDoctor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctors = action.payload;
      })
      .addCase(searchDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        // toast.error(action.payload);
        console.log(action.payload);
      })
      // ! Get Chats -----------
      .addCase(getChats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chats = action.payload;
      })
      .addCase(getChats.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        // toast.error(action.payload);
        console.log(action.payload);
      })
      // ! Access/Create Chat ------------
      .addCase(accessChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(accessChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedChat = action.payload;
      })
      .addCase(accessChat.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        // toast.error(action.payload);
        console.log(action.payload);
      })
      // ! Get Chats -----------
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        // toast.error(action.payload);
        console.log(action.payload)
      })
      // ! Send Message ----------
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newMessage = action.payload;
        state.messages = [...state.messages, state.newMessage];
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        // toast.error(action.payload);
        console.log(action.payload);
      });
  },
});

// ~ ----------------------------------------------
export const { setSelectedChat } = chatSlice.actions;
export default chatSlice.reducer;
