export interface ITask {
    id: string
    title: string,
    image: string,
    description: string,
    assignedTo: IEmployee[],
    priority: 'high' | 'medium' | 'low',
    state: 'todo' | 'doing' | 'done',
    createdBy?: {
        email: string
        family_name: string
        given_name: string
        id: string
        picture: string
    },
}
export interface IEmployee {
    email: string
    family_name: string
    given_name: string
    id: string
    picture: string
    tasks?: ITask[]
    assignedTasks?: ITask[]

}
export interface IUser {
    email: string | null
    family_name: string | null
    given_name: string | null
    id: string | null
    picture: string | null
    tasks: ITask[]
}