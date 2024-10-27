import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"



const initialState = {
    close: false
}



const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        closeSidebar: (state) => {
            state.close = true
        },
        openSidebar: (state) => {
            state.close = false
        }
    }
})


export const selectSidebar = (state: RootState) => state.Sidebar


export const { closeSidebar, openSidebar } = sidebarSlice.actions
export default sidebarSlice.reducer