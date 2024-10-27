import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasks.slice';
import authReducer from './slices/auth.slice';
import employeesReducer from './slices/employees.slice';
import sidebarReducer from './slices/sidebar.slice';
const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        auth: authReducer,
        employees: employeesReducer,
        Sidebar: sidebarReducer

    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;
