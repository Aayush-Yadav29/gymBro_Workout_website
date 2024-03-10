import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  weightInputs: [],
  c: 0
};

export const customReducer = createReducer(initialState, builder => {
  builder
    .addCase('add', (state) => ({ ...state, c: state.c + 1 })) // Explicit return with new state
    .addCase('addWeights', (state, action) => ({ ...state, weightInputs: [...state.weightInputs, action.payload] })) // Explicit return with new state
});

