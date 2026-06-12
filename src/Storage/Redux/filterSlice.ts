import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserFilter {
  Categories: string;
  Exercise: string;
  Level: string;
  Meal: string;
  Time: string;
}

const initialState: UserFilter = {
  Categories: '',
  Exercise: '',
  Level: '',
  Meal: '',
  Time: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<string>) => {
      state.Categories = action.payload;
    },

    setExercise: (state, action: PayloadAction<string>) => {
      state.Exercise = action.payload;
    },

    setLevel: (state, action: PayloadAction<string>) => {
      state.Level = action.payload;
    },

    setMeal: (state, action: PayloadAction<string>) => {
      state.Meal = action.payload;
    },

    setTime: (state, action: PayloadAction<string>) => {
      state.Time = action.payload;
    },

    resetFilters: () => initialState,
  },
});


export const {
  setCategories,
  setExercise,
  setLevel,
  setMeal,
  setTime,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
