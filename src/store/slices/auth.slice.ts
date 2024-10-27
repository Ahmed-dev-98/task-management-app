import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { IUser } from "@/app/types/types";


const initialState = {
    email: '',
    family_name: '',
    given_name: '',
    id: '',
    picture: '',
    tasks: []
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
            state.tasks = action.payload.tasks

        },
        updateUser: (state: IUser, action: PayloadAction<IUser>) => {
            state.email = action.payload.email;
            state.family_name = action.payload.family_name;
            state.given_name = action.payload.given_name;
            state.id = action.payload.id;
            state.picture = action.payload.picture;
            state.tasks = action.payload.tasks
        },
        clearUser: () => {
            return initialState

        }
    }
})

export const selectUser = (state: RootState) => state.auth
export const { setUser, clearUser, updateUser } = authSlice.actions
export default authSlice.reducer