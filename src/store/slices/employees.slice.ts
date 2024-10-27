import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { IEmployee, ITask } from "@/app/types/types"



const initialState: IEmployee[] = [{
    email: 'ahmed.h.mohamd98@gmail.com',
    family_name: 'Hassan',
    given_name: 'Ahmed',
    id: '1',
    picture: 'https://firebasestorage.googleapis.com/v0/b/task-management-7913d.appspot.com/o/images%2F457669478_2891606177654566_7117051287572455641_n.jpg?alt=media&token=55e15ee7-6e1d-496b-b07c-117d7d556bdf',
    tasks: [
    ]
},
{
    email: 'jane.smith@example.com',
    family_name: 'Smith',
    given_name: 'Jane',
    id: '2',
    picture: 'https://randomuser.me/api/portraits/women/2.jpg',
    tasks: []
},
{
    email: 'bob.johnson@example.com',
    family_name: 'Johnson',
    given_name: 'Bob',
    id: '3',
    picture: 'https://randomuser.me/api/portraits/men/3.jpg',
    tasks: []
},
{
    email: 'alice.brown@example.com',
    family_name: 'Brown',
    given_name: 'Alice',
    id: '4',
    picture: 'https://randomuser.me/api/portraits/women/4.jpg',
    tasks: []
},
{
    email: 'michael.davis@example.com',
    family_name: 'Davis',
    given_name: 'Michael',
    id: '5',
    picture: 'https://randomuser.me/api/portraits/men/5.jpg',
    tasks: []
},
{
    email: 'emily.miller@example.com',
    family_name: 'Miller',
    given_name: 'Emily',
    id: '6',
    picture: 'https://randomuser.me/api/portraits/women/6.jpg',
    tasks: []
},
{
    email: 'chris.wilson@example.com',
    family_name: 'Wilson',
    given_name: 'Chris',
    id: '7',
    picture: 'https://randomuser.me/api/portraits/men/7.jpg',
    tasks: []
},
{
    email: 'sarah.moore@example.com',
    family_name: 'Moore',
    given_name: 'Sarah',
    id: '8',
    picture: 'https://randomuser.me/api/portraits/women/8.jpg',
    tasks: []
},
{
    email: 'david.taylor@example.com',
    family_name: 'Taylor',
    given_name: 'David',
    id: '9',
    picture: 'https://randomuser.me/api/portraits/men/9.jpg',
    tasks: []
},
{
    email: 'laura.anderson@example.com',
    family_name: 'Anderson',
    given_name: 'Laura',
    id: '10',
    picture: 'https://randomuser.me/api/portraits/women/10.jpg',
    tasks: []
}]


const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        createEmployee(state, action) {
            state.push(action.payload)
        },
        deleteEmployee(state, action) {
            const index = state.findIndex((employee) => employee.id === action.payload)
            if (index !== -1) state.splice(index, 1);
        },
        updateEmployee(state, action) {
            const index = state.findIndex((employee) => employee.id === action.payload.id)
            if (index !== -1) state[index] = action.payload
        },
        createTask: (state, action: PayloadAction<{ id: string, data: ITask }>) => {
            const index = state.findIndex((employee) => employee.id === action.payload.id)
            if (index !== -1) state[index].tasks?.push(action.payload.data)
        },
    }
})



export const selectEmployees = (state: RootState) => state.employees

export const { createEmployee: createEmployeeAction, deleteEmployee: deleteEmployeeAction, updateEmployee: updateEmployeeAction, createTask: createTaskAction } = employeesSlice.actions

export default employeesSlice.reducer;
