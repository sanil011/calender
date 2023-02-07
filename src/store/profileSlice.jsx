import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    user: false, email: "",
    meeting: [
        {
            "id": "id4",
            "title": "qwerty",
            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            "date": "2023-02-02T18:30:00.000Z",
            "end": "2023-02-06T20:30:00.518Z",
            "start": "2023-02-06T20:00:00.901Z"
        },
        {
            "id": "id2",
            "title": "qwerty",
            "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
            "date": "2023-02-08T18:30:00.000Z",
            "end": "2023-02-06T21:30:00.839Z",
            "start": "2023-02-06T21:00:00.348Z"
        }],
    meet:[]
}

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.user = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setMeeting: (state, action) => {
            state.meeting.push(action.payload)
        },
        delete: (state, action) => {
            const meets = state.meeting.filter((db) => db.id !== action.payload)
            state.meeting = meets;
        },
        findSingle: (state, action) => {
            const data = state.meeting.filter((db) => db.id === action.payload)
            state.meet= data
        },
        update: (state, action) => {
            const meets = state.meeting.filter((db) => db.id !== action.payload.id)
            console.log(action.payload.id)
            meets.push(action.payload.data)
            state.meeting= meets
        }
    }
})

export default profileSlice.reducer

export const profileActions = profileSlice.actions;