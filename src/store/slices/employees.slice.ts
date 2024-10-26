import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { ITask } from "@/module/tasks/Tasks-list"


export interface IEmployee {
    email: string
    family_name: string
    given_name: string
    id: string
    picture: string
    tasks: ITask[]

}

const initialState: IEmployee[] = [{
    email: 'john.doe@example.com',
    family_name: 'Doe',
    given_name: 'John',
    id: '1',
    picture: 'https://randomuser.me/api/portraits/men/1.jpg',
    tasks: [{
        id: "1",
        image: "https://via.placeholder.com/150",
        title: "Design Login Page",
        description: "Create a user-friendly login page layout.",
        priority: "high",
        state: "todo",
        createdBy: {
            email: "ahmed.h.mohamed98@gmail.com",
            family_name: "Hassan",
            given_name: "Ahmed",
            id: "kp_e0f97c534cf94dbe92fa44c8c1e36809",
            picture: "https://gravatar.com/avatar/0952a508d585760f0aff4bda4f41f4baecfeec1ff56bd2ff62ed64040e01d170?d=blank&size=200"
        }

    },
    {
        id: "2",
        image: "https://via.placeholder.com/150",
        title: "Setup Database",
        description: "Set up the initial database schema.",
        priority: "high",
        state: "doing",
        createdBy: {
            email: "ahmed.h.mohamed98@gmail.com",
            family_name: "Hassan",
            given_name: "Ahmed",
            id: "kp_e0f97c534cf94dbe92fa44c8c1e36809",
            picture: "https://gravatar.com/avatar/0952a508d585760f0aff4bda4f41f4baecfeec1ff56bd2ff62ed64040e01d170?d=blank&size=200"
        }
    },
    {
        id: "3",
        image: "https://via.placeholder.com/150",
        title: "Write Documentation",
        description: "Document all API endpoints and usage.",
        priority: "medium",
        state: "todo",
        createdBy: {
            email: "ahmed.h.mohamed98@gmail.com",
            family_name: "Hassan",
            given_name: "Ahmed",
            id: "kp_e0f97c534cf94dbe92fa44c8c1e36809",
            picture: "https://gravatar.com/avatar/0952a508d585760f0aff4bda4f41f4baecfeec1ff56bd2ff62ed64040e01d170?d=blank&size=200"
        }
    }]
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
        }
    }
})



export const selectEmployees = (state: RootState) => state.employees

export const { createEmployee: createEmployeeAction, deleteEmployee: deleteEmployeeAction, updateEmployee: updateEmployeeAction } = employeesSlice.actions

export default employeesSlice.reducer;
