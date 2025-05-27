import { configureStore } from '@reduxjs/toolkit'
import authReducer from './AuthSlice';
import projectReducer from './projectsSlice'
import snippetsReducer from './SnippetsSlice'
import geminiReducer from './GeminiSlice';
export const store = configureStore({
  reducer: {
    auth:authReducer,
    projects:projectReducer,
    snippets:snippetsReducer,
    gemini: geminiReducer,
  },
})