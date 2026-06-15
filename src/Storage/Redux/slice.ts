

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserDetails {
  userName: string;
  userNumber: string;
  userEmail: string;
  userWeight: string;
  userHeight: string;
  userGender: string;
  userAge: string;
  userWeightUnit: string;
  userHeightUnit: string;
}

interface UserState {
  uid: string | null;
  name: string | null;
  email: string | null;
  photoURL: string | null;
  userDetails: UserDetails | null;
  profileImage: string | null;
  resetEmail:string |null;
}

const initialState: UserState = {
  uid: null,
  name: null,
  email: null,
  photoURL: null,
  userDetails: null,
  profileImage: null,
  resetEmail:null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        uid: string | null;
        name: string | null;
        email: string | null;
        photoURL: string | null;
      }>
    ) => {
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photoURL = action.payload.photoURL;
      
    },

    setUserDetails: (state, action: PayloadAction<UserDetails | null>) => {
      state.userDetails = action.payload;
    },

    setProfileImage: (state, action: PayloadAction<string | null>) => {
      state.profileImage = action.payload;
    },
    setResetEmail :(state,action:PayloadAction<string|null>)=>{
      state.resetEmail = action.payload
    },

    clearUser: state => {
      state.uid = null;
      state.name = null;
      state.email = null;
      state.photoURL = null;
      state.userDetails = null;
      state.profileImage = null;
      state.resetEmail = null;
    },
  },
});

export const { setUser, setUserDetails, setProfileImage, clearUser,setResetEmail } = userSlice.actions;
export default userSlice.reducer;