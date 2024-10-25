export enum ROUTES {
    MAIN = "/",
    AUTH = `/auth`,
    DASHBOARD = "/dashboard",
    //----------------- tasks---------------------//
    TASKS = `${DASHBOARD}/tasks`,
    CREATE_TASK = `${TASKS}/create`,
    EDIT_TASK = `${TASKS}/edit/:id`,
    //----------------- tasks---------------------//


    PROFILE = `${DASHBOARD}/profile`,
}