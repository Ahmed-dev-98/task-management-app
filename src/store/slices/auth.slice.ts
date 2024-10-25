import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface IUser {
    email: string
    family_name: string
    given_name: string
    id: string
    picture: string
}
const initialState = {
    email: '',
    family_name: '',
    given_name: '',
    id: '',
    picture: ''
}



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state: IUser, action: PayloadAction<IUser>) => {
            state.email = action.payload.email;
            state.family_name = action.payload.family_name;
            state.given_name = action.payload.given_name;
            state.id = action.payload.id;
            state.picture = action.payload.picture;

        },
        clearUser: () => {
            return initialState

        }
    }
})

export const selectUser = (state: RootState) => state.auth
export const { setUser, clearUser } = authSlice.actions
export default authSlice.reducer