import { createSlice } from '@reduxjs/toolkit'

const initialState = 'display notification here'

const notificationSlice = createSlice({
  name: 'notification',
  initialState
})

export default notificationSlice.reducer
