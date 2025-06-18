import { createFeature, createReducer } from '@ngrx/store';

export interface ChatState {}

const initialState: ChatState = {};

export const chatsFeature = createFeature({
  name: 'chatsFeature',
  reducer: createReducer(initialState),
});
