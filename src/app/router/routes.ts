export enum ROUTES {
    MAIN = "/",
    AUTH = `/auth`,
    DASHBOARD = "/dashboard",
    //----------------- tasks---------------------//
    TASKS = `${DASHBOARD}/tasks`,
    CREATE_TASK = `${TASKS}/create`,
    EDIT_TASK = `${TASKS}/edit/:id`,
    //----------------- tasks---------------------//

    //----------------- employees---------------------//
    EMPLOYEES = `${DASHBOARD}/employees`,
    CREATE_EMPLOYEE = `${EMPLOYEES}/create`,
    EDIT_EMPLOYEE = `${EMPLOYEES}/edit/:id`,

    //----------------- employees---------------------//


    PROFILE = `${DASHBOARD}/profile`,
}