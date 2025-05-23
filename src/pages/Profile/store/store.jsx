import { configureStore } from "@reduxjs/toolkit"
import profileReducer from "../Profile"

export const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
})
