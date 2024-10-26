import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { ITask } from "@/app/types/types";


const initialState: ITask[] =
    [
        {
            id: "1",
            image: "https://via.placeholder.com/150",
            title: "Design Login Page",
            description: "Create a user-friendly login page layout.",
            assignedTo: [
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
            ],
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
            assignedTo: [],
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
            assignedTo: [],
            priority: "medium",
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
            id: "4",
            image: "https://via.placeholder.com/150",
            title: "Implement Authentication",
            description: "Add JWT authentication for the app.",
            assignedTo: [],
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
            id: "5",
            image: "https://via.placeholder.com/150",
            title: "Design Landing Page",
            description: "Design a responsive landing page.",
            assignedTo: [],
            priority: "medium",
            state: "todo",
            createdBy: {
                email: "ahmed.h.mohamed98@gmail.com",
                family_name: "Hassan",
                given_name: "Ahmed",
                id: "111111",
                picture: "https://gravatar.com/avatar/0952a508d585760f0aff4bda4f41f4baecfeec1ff56bd2ff62ed64040e01d170?d=blank&size=200"
            }
        },
        {
            id: "6",
            image: "https://via.placeholder.com/150",
            title: "Optimize Images",
            description: "Compress and optimize images for faster load.",
            assignedTo: [],
            priority: "low",
            state: "done",
            createdBy: {
                email: "ahmed.h.mohamed98@gmail.com",
                family_name: "Hassan",
                given_name: "Ahmed",
                id: "kp_e0f97c534cf94dbe92fa44c8c1e36809",
                picture: "https://gravatar.com/avatar/0952a508d585760f0aff4bda4f41f4baecfeec1ff56bd2ff62ed64040e01d170?d=blank&size=200"
            }
        },
        {
            id: "7",
            image: "https://via.placeholder.com/150",
            title: "Implement Search Feature",
            description: "Add search functionality to the app.",
            assignedTo: [],
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
            id: "8",
            image: "https://via.placeholder.com/150",
            title: "Add Analytics",
            description: "Integrate Google Analytics.",
            assignedTo: [],
            priority: "medium",
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
            id: "9",
            image: "https://via.placeholder.com/150",
            title: "Fix Mobile Layout Issues",
            description: "Resolve styling issues on mobile.",
            assignedTo: [],
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
            id: "10",
            image: "https://via.placeholder.com/150",
            title: "Add Notification System",
            description: "Implement a system for push notifications.",
            assignedTo: [],
            priority: "medium",
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
            id: "11",
            image: "https://via.placeholder.com/150",
            title: "Code Review",
            description: "Review and refactor old code.",
            assignedTo: [],
            priority: "low",
            state: "done",
            createdBy: {
                email: "ahmed.h.mohamed98@gmail.com",
                family_name: "Hassan",
                given_name: "Ahmed",
                id: "kp_e0f97c534cf94dbe92fa44c8c1e36809",
                picture: "https://gravatar.com/avatar/0952a508d585760f0aff4bda4f41f4baecfeec1ff56bd2ff62ed64040e01d170?d=blank&size=200"
            }
        },
        {
            id: "12",
            image: "https://via.placeholder.com/150",
            title: "Implement Dark Mode",
            description: "Add dark mode toggle to the app.",
            assignedTo: [],
            priority: "medium",
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
            id: "13",
            image: "https://via.placeholder.com/150",
            title: "Optimize API Calls",
            description: "Reduce and optimize API call frequency.",
            assignedTo: [],
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
            id: "14",
            image: "https://via.placeholder.com/150",
            title: "Create Test Cases",
            description: "Write test cases for all modules.",
            assignedTo: [],
            priority: "medium",
            state: "done",
            createdBy: {
                email: "ahmed.h.mohamed98@gmail.com",
                family_name: "Hassan",
                given_name: "Ahmed",
                id: "kp_e0f97c534cf94dbe92fa44c8c1e36809",
                picture: "https://gravatar.com/avatar/0952a508d585760f0aff4bda4f41f4baecfeec1ff56bd2ff62ed64040e01d170?d=blank&size=200"
            }
        },
        {
            id: "15",
            image: "https://via.placeholder.com/150",
            title: "Integrate OAuth",
            description: "Enable Google OAuth for easy sign-in.",
            assignedTo: [],
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
            id: "16",
            image: "https://via.placeholder.com/150",
            title: "Design 404 Page",
            description: "Add a custom 404 error page.",
            assignedTo: [],
            priority: "low",
            state: "done",
            createdBy: {
                email: "ahmed.h.mohamed98@gmail.com",
                family_name: "Hassan",
                given_name: "Ahmed",
                id: "kp_e0f97c534cf94dbe92fa44c8c1e36809",
                picture: "https://gravatar.com/avatar/0952a508d585760f0aff4bda4f41f4baecfeec1ff56bd2ff62ed64040e01d170?d=blank&size=200"
            }
        },
        {
            id: "17",
            image: "https://via.placeholder.com/150",
            title: "Setup Caching",
            description: "Add caching mechanism for improved speed.",
            assignedTo: [],
            priority: "medium",
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
            id: "18",
            image: "https://via.placeholder.com/150",
            title: "Create FAQ Section",
            description: "Develop an FAQ page for common issues.",
            assignedTo: [],
            priority: "low",
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
            id: "19",
            image: "https://via.placeholder.com/150",
            title: "UI Testing",
            description: "Perform UI tests on all major devices.",
            assignedTo: [],
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
            id: "20",
            image: "https://via.placeholder.com/150",
            title: "Add Accessibility Features",
            description: "Enhance app accessibility for screen readers.",
            assignedTo: [],
            priority: "medium",
            state: "done",
            createdBy: {
                email: "ahmed.h.mohamed98@gmail.com",
                family_name: "Hassan",
                given_name: "Ahmed",
                id: "kp_e0f97c534cf94dbe92fa44c8c1e36809",
                picture: "https://gravatar.com/avatar/0952a508d585760f0aff4bda4f41f4baecfeec1ff56bd2ff62ed64040e01d170?d=blank&size=200"
            }
        },
    ];



const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state: ITask[], action: PayloadAction<ITask>) => {
            state.push(action.payload);
        },
        updateTask: (state: ITask[], action: PayloadAction<ITask>) => {
            const index = state.findIndex((task) => task.id === action.payload.id)
            if (index !== -1) state[index] = action.payload;
        },
        deleteTask: (state: ITask[], action: PayloadAction<string>) => {
            const index = state.findIndex((task) => task.id === action.payload)
            if (index !== -1) state.splice(index, 1);
        },

        updateTaskStatus: (state: ITask[], action: PayloadAction<{ id: string, state: 'todo' | 'doing' | 'done' }>) => {
            const index = state.findIndex((task) => task.id === action.payload.id)
            if (index !== -1) state[index].state = action.payload.state;


        }
    },
})


export const selectTasks = (state: RootState) => state.tasks;
export const selectUserTasks = (userId: string) => (state: RootState) => state.tasks.filter((task) => task?.createdBy?.id === userId);

export const {
    addTask: addTaskAction,
    updateTask: updateTaskAction,
    deleteTask: deleteTaskAction,

    updateTaskStatus: updateTaskStatusAction

} = tasksSlice.actions;

export default tasksSlice.reducer;
