import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filteredUsers: [],
  filteredDoctors: [],
  startDateFormatted: null,
  endDateFormatted: null,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    FILTER_USERS(state, action) {
      const { users, search } = action.payload;
      const tempUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredUsers = tempUsers;
    },
    FILTER_DOCTORS(state, action) {
      const { doctors, search } = action.payload;
      const tempDoctors = doctors.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(search.toLowerCase()) ||
          doctor.email.toLowerCase().includes(search.toLowerCase()) ||
          doctor.specialist.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredDoctors = tempDoctors;
    },
  },
});

export const selectorUser = (state) => state.filter.filteredUsers;
export const selectorDoctors = (state) => state.filter.filteredDoctors;
export const { FILTER_USERS, FILTER_DOCTORS } = filterSlice.actions;
export default filterSlice.reducer;
