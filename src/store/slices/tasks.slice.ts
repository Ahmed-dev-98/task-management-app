import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { v4 as uuidv4 } from 'uuid';

interface ITask {
    id: string
    title: string,
    image: string,
    description: string,
    priority: 'high' | 'medium' | 'low',
    state: 'todo' | 'doing' | 'done',
    createdBy: {
        email: string
        family_name: string
        given_name: string
        id: string
        picture: string
    },

}

const initialState: ITask[] = [
    {
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
    },
    {
        id: "4",
        image: "https://via.placeholder.com/150",
        title: "Implement Authentication",
        description: "Add JWT authentication for the app.",
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
        id: "6",
        image: "https://via.placeholder.com/150",
        title: "Optimize Images",
        description: "Compress and optimize images for faster load.",
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
            state.push({ ...action.payload, id: uuidv4() });

        },

        updateTask: (state: ITask[], action: PayloadAction<ITask>) => {
            const index = state.findIndex((task) => task.id === action.payload.id)
            if (index !== -1) state[index] = action.payload;

        },
        deleteTask: (state: ITask[], action: PayloadAction<string>) => {
            const index = state.findIndex((task) => task.id === action.payload)
            if (index !== -1) state.splice(index, 1);
        },
        userTasks: (state: ITask[], action: PayloadAction<string>) => {
            return state.filter((task) => task.createdBy.id === action.payload)
        },
    },
})


export const selectTasks = (state: RootState) => state.tasks;

export const {
    addTask: addTaskAction,
    updateTask: updateTaskAction,
    deleteTask: deleteTaskAction,
    userTasks: userTasksAction,

} = tasksSlice.actions;

export default tasksSlice.reducer;
