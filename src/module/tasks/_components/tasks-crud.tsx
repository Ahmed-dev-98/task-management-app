/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import MainImageUpload from "@/shared/ui/MainImageUploader";
import { useEffect, useState } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { addTaskAction, updateTaskAction } from "@/store/slices/tasks.slice";
import { ROUTES } from "@/app/router/routes";
import { useLocation, useNavigate, useParams } from "react-router";
import MainSelect from "@/shared/ui/MainSelect";
import { v4 as uuidv4 } from "uuid";
import {
  createTaskAction,
  selectEmployees,
} from "@/store/slices/employees.slice";
import usePermissions from "@/hooks/usePermissions";

const TaskManager = () => {
  const [selectedImg, setSelectedImg] = useState("");
  const [taskRelation, setTaskRelation] = useState<
    "Manager" | "Member" | "Author" | "Guest"
  >();
  const { getUser } = useKindeAuth();
  const location = useLocation();
  const { isManager, isTaskAuthor, isMember } = usePermissions(
    location?.state?.createdBy?.id,
    location?.state?.assignedTo?.map((e: { id: string }) => e.id)
  );

  const employees = useAppSelector(selectEmployees);
  const [selectedPriority, setSelectedPriority] = useState<{
    id: string;
    label: string;
  } | null>(null);
  const [selectedState, setSelectedState] = useState<{
    id: string;
    label: string;
  } | null>(null);
  const [assignedEmplpoyees, setAssignedEmplpoyees] = useState<
    | {
        id: string;
        label: string;
      }[]
    | null
  >([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const taskForm = useForm<{
    title: string;
    image: string;
    description: string;
    priority: string;
    state: string;
    createdBy: any;
    id: string;
    assignedTo: any[];
  }>({
    defaultValues: {
      title: undefined,
      image: undefined,
      description: undefined,
      priority: undefined,
      state: undefined,
      assignedTo: isManager ? undefined : [getUser()],
      createdBy: getUser(),
      id: uuidv4(),
    },
  });

  const onSubmit = (data: any) => {
    data.createdBy = getUser();
    const ids = assignedEmplpoyees.map((emp) => emp.id);
    const emps = employees.filter((emp) => ids.includes(emp.id));
    data.assignedTo = emps;
    if (!id) {
      console.log(data);
      dispatch(addTaskAction(data));
      dispatch(createTaskAction({ id: getUser()?.id ?? "", data }));
    } else if (id) {
      dispatch(updateTaskAction(data));
    }
    navigate(ROUTES.TASKS);
  };
  useEffect(() => {
    if (location?.state) {
      taskForm.reset(location?.state);
      setSelectedImg(location?.state?.image);
      setSelectedPriority({
        id: location?.state?.priority,
        label: location?.state?.priority,
      });
      setSelectedState({
        id: location?.state?.state,
        label: location?.state?.state,
      });
      setAssignedEmplpoyees(
        location?.state?.assignedTo.map(
          (emp: { id: string; given_name: string; family_name: string }) => ({
            id: emp.id,
            label: `${emp.given_name} ${emp.family_name}`,
          })
        )
      );
    } else {
      setAssignedEmplpoyees([
        {
          id: `${getUser()?.id}`,
          label: `${getUser()?.given_name} ${getUser()?.family_name}`,
        },
      ]);
    }
  }, [id]);

  useEffect(() => {
    console.log("Roles:", { isManager, isTaskAuthor, isMember });

    if (isTaskAuthor) {
      setTaskRelation("Author");
    } else if (isManager) {
      setTaskRelation("Manager");
    } else if (isMember) {
      setTaskRelation("Member");
    } else {
      setTaskRelation("Guest");
    }
  }, [isManager, isTaskAuthor, isMember]);

  return (
    <div className=" w-1/2 mx-auto border border-gray-300 rounded-md  p-4">
      <Form {...taskForm}>
        <form onSubmit={taskForm.handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-center items-center gap-3 w-full mx-auto relative">
            {id && (
              <div className="absolute top-0 right-0 bg-red-400 rounded-full h-[100px] w-[100px] flex justify-center items-center">
                <p className="capitalize font-medium text-sm">
                  {taskRelation} View
                </p>
              </div>
            )}
            <div className="  rounded-md w-1/2 h-[150px]">
              <MainImageUpload
                disabled={!isTaskAuthor && !!id && !isManager}
                selectedImg={selectedImg}
                setSelectedImg={setSelectedImg}
                setImage={(e) => taskForm.setValue("image", e)}
              />
            </div>
            <FormField
              control={taskForm.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel children="Title" />
                  <FormControl>
                    <Input
                      disabled={!isTaskAuthor && !!id && !isManager}
                      className="h-[48px]"
                      type="text"
                      placeholder="Title"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={taskForm.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel children="Description" />
                  <FormControl>
                    <Textarea
                      disabled={!isTaskAuthor && !!id && !isManager}
                      placeholder="Type your message here."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={taskForm.control}
              name="assignedTo"
              render={() => (
                <FormItem className="w-full">
                  <FormLabel
                    children={`Assign to ${
                      isManager ? "" : "(only can assign yourself)"
                    }`}
                  />
                  <FormControl>
                    <MainSelect
                      disabled={!isManager}
                      isMulti={true}
                      defaultValue={
                        assignedEmplpoyees
                          ? assignedEmplpoyees
                          : !isManager
                          ? [
                              {
                                id: getUser()?.id,
                                label: `${getUser()?.given_name} ${
                                  getUser()?.family_name
                                }`,
                              },
                            ]
                          : []
                      }
                      badgeClassName={` bg-blue-100 text-blue-600 rounded-sm  text-sm font-medium`}
                      options={employees.map((employee) => ({
                        id: employee?.id,
                        label: `${employee?.given_name} ${employee?.family_name}`,
                      }))}
                      value={(e) => {
                        setAssignedEmplpoyees(e);
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <div className="flex gap-2 justify-center items-center w-full ">
              <FormField
                control={taskForm.control}
                name="priority"
                render={() => (
                  <FormItem className="flex-1">
                    <FormLabel children="priority" />
                    <FormControl>
                      <MainSelect
                        disabled={!isTaskAuthor && !!id && !isManager}
                        defaultValue={
                          selectedPriority ? selectedPriority : undefined
                        }
                        badgeClassName={` ${
                          selectedPriority?.id === "high"
                            ? "bg-red-100 text-red-600"
                            : selectedPriority?.id === "medium"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                        } rounded-sm  text-sm font-medium`}
                        options={[
                          { id: "high", label: "High" },
                          { id: "medium", label: "Medium" },
                          { id: "low", label: "Low" },
                        ]}
                        value={(e) => {
                          setSelectedPriority(e);
                          taskForm.setValue("priority", e?.id);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={taskForm.control}
                name="state"
                render={() => (
                  <FormItem className="flex-1">
                    <FormLabel children="Status" />
                    <FormControl>
                      <MainSelect
                        disabled={!isMember && !!id && !isManager}
                        isMulti={false}
                        defaultValue={selectedState ? selectedState : undefined}
                        badgeClassName={`${
                          selectedState?.id === "todo"
                            ? "bg-blue-100 text-blue-600"
                            : selectedState?.id === "doing"
                            ? "bg-purple-100 text-purple-600"
                            : "bg-green-100 text-green-600"
                        } rounded-sm  text-sm font-medium`}
                        options={[
                          { id: "todo", label: "Todo" },
                          { id: "doing", label: "Doing" },
                          { id: "done", label: "Done" },
                        ]}
                        value={(e) => {
                          setSelectedState(e);
                          taskForm.setValue("state", e.id);
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
            </div>
            <Button type="submit">{id ? "Update" : "Submit"}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TaskManager;
