import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  }
})

export const { setNotification } = notificationSlice.actions

export const notify = (message, seconds) => {
  return (dispatch) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
